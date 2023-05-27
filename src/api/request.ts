import { http } from "@/utils/http";
import { getToken, formatToken } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";
export const { VITE_API_URL } = import.meta.env;

export const get: any = async ({
  type = "items",
  collection = "",
  params = { fields: "*,files.*", meta: "" }
}) => {
  try {
    const data = await http.request("get", `/api/${type}/${collection}`, {
      params
    });
    return data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

export const post: any = async (
  { type = "items", collection = "" },
  postData = null
) => {
  try {
    const data = await http.request("post", `/api/${type}/${collection}`, {
      data: postData
    });
    // onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

export const patch: any = async (
  { type = "items", collection = "", id = null },
  postData = null
) => {
  if (!id) {
    console.log("directus patch need an id");
    return false;
  }
  try {
    const data = await http.request(
      "patch",
      `/api/${type}/${collection}/${id}`,
      {
        data: postData
      }
    );
    // onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

export const remove: any = async ({
  type = "items",
  collection = "",
  id = null
}) => {
  if (!id) {
    console.log("this action need an id");
    return false;
  }
  try {
    const data = await http.request(
      "delete",
      `/api/${type}/${collection}/${id}`
    );
    return data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

export const upload: any = async formData => {
  try {
    const data = await http.request("post", `/files`, { data: formData });
    return data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

export const assets: any = id => {
  return `${VITE_API_URL}/assets/${id}`;
};

function onSuccess(data, status) {
  console.log(
    `%cGET ${status}`,
    "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:green;border-radius:1rem"
  );
  console.log(data);
}

function onError(error) {
  console.log(
    `%cGET ${error.response.status}`,
    "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:red;border-radius:1rem"
  );
  console.log(error.response.data.errors[0].message);
}

function handleErrorMsg(status) {
  const map = {
    401: "登入資料錯誤"
  };
  // global.text = map[status];
  // global.show = true;
  return map[status] ? map[status] : "系統錯誤";
}
