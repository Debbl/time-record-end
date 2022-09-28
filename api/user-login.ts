import type { Response } from "@netlify/functions/dist/function/response";
import type { Handler } from "@netlify/functions";
import type { LoginInfo } from "../vika/user/register";
import vikaLogin from "../vika/user/login";

const handler: Handler = async (event, context) => {
  const result: Response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };
  // 非 POST 请求
  if (event.httpMethod !== "POST") {
    result.body = JSON.stringify({
      code: 200,
      msg: "请使用 POST 方法请求",
      data: {},
      map: {},
    });
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
  const response = await vikaLogin(username);
  const record = response.data.records[0];
  if (record.fields.password === password) {
    result.body = JSON.stringify({
      code: 200,
      msg: null,
      data: {
        username: record.fields.username,
        password: "",
      },
      map: {},
    });
    return result;
  }
  result.body = JSON.stringify({
    code: 200,
    msg: "用户名或密码错误",
    data: {},
    map: {},
  });
  return result;
};

export { handler };
