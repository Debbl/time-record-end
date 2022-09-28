import { Handler } from "@netlify/functions";
import vikaLogin from "../vika/user/login";

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST")
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "请使用 POST 方法请求" }),
    };

  const responese = await vikaLogin();
  const { username, password } = JSON.parse(event.body) as {
    username: string;
    password: string;
  };
  const records = responese.data.records;
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (
      username === record.fields.username &&
      password === record.fields.password
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          code: 200,
          msg: null,
          data: {
            username: username,
            password: "",
          },
          map: {},
        }),
      };
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 200,
      msg: "用户名或密码错误",
      data: {},
      map: {},
    }),
  };
};

export { handler };
