import type { Response } from "@netlify/functions/dist/function/response";
import { Handler } from "@netlify/functions";
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
    result.body = JSON.stringify({ msg: "请使用 POST 方法请求" });
    return result;
  }

  const response = await vikaLogin();
  const { username, password } = JSON.parse(event.body) as {
    username: string;
    password: string;
  };
  const records = response.data.records;
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (
      username === record.fields.username &&
      password === record.fields.password
    ) {
      result.body = JSON.stringify({
        code: 200,
        msg: null,
        data: {
          username: username,
          password: "",
        },
        map: {},
      });
      return result;
    }
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
