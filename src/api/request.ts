import { http } from "@/utils/http";
export const { VITE_API_BASEURL } = import.meta.env;

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
