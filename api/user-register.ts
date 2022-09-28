import { Handler } from "@netlify/functions";
import vikaRegister from "../vika/user/register";

const handler: Handler = async (event, context) => {
  // 非 POST 请求
  if (event.httpMethod !== "POST")
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "请使用 POST 方法请求" }),
    };

  const { username, password } = JSON.parse(event.body) as {
    username: string;
    password: string;
  };
  // 没有传 username 和 password
  if (!username || !password)
    return {
      statusCode: 200,
      body: JSON.stringify({
        code: 200,
        msg: "请传递 username 和 password",
        data: {},
        map: {},
      }),
    };

  const response = await vikaRegister({ username, password });
  // 用户已存在
  if (!response)
    return {
      statusCode: 200,
      body: JSON.stringify({
        code: 200,
        msg: "用户名已存在",
        data: {},
        map: {},
      }),
    };
  
  const records = response.data.records;
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      msg: null,
      data: records[0].fields,
      map: {},
    }),
  };
};

export { handler };
