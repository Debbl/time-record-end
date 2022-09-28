import type { Response } from "@netlify/functions/dist/function/response";
import { Handler } from "@netlify/functions";
import vikaRegister, { LoginInfo } from "../vika/user/register";

const handler: Handler = async (event, context) => {
  const result: Response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
  // 非 POST 请求
  if (event.httpMethod !== "POST") {
    result.body = JSON.stringify({ msg: "请使用 POST 方法请求" });
    return result;
  }

  const { username, password }: LoginInfo = JSON.parse(event.body) || {};
  // 没有传 username 和 password
  if (!username || !password) {
    result.body = JSON.stringify({
      code: 200,
      msg: "请传递 username 和 password",
      data: {},
      map: {},
    });
    return result;
  }

  const response = await vikaRegister({ username, password });
  // 用户已存在
  if (!response) {
    result.body = JSON.stringify({
      code: 200,
      msg: "用户名已存在",
      data: {},
      map: {},
    });
    return result;
  }

  const record = response.data.records[0];
  result.body = JSON.stringify({
    code: 200,
    msg: null,
    data: record.fields,
    map: {},
  });
  return result;
};

export { handler };
