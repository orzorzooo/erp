import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { getLogin, refreshTokenApi } from "@/api/user";
import { UserResult, RefreshTokenResult } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import {
  type DataInfo,
  setToken,
  removeToken,
  sessionKey,
  setTokenDirectus,
  setUserInfo
} from "@/utils/auth";
import { get, post } from "@/api/request";
import { getMap } from "echarts";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "",
    // 页面级别权限
    roles: storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? []
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // for directus login
    async loginByEmail(loginData) {
      console.log(loginData);
      const { data } = await post(
        { type: "auth", collection: "login" },
        loginData
      );
      if (!data) return false;
      const token = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expires: data.expires
      };
      await setTokenDirectus(token);

      // 取得token後再拿userinfo
      const userInfo = await this.getMe();
      await setUserInfo({
        username: userInfo.first_name,
        roles: [userInfo.role.name]
      });
      console.log("login success!");
      return data;
    },

    async getMe() {
      const { data } = await get({
        type: "users",
        collection: "me",
        params: { fields: "*,role.name" }
      });
      console.log("get me:", data);
      if (!data) return;
      return data;
    },

    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
