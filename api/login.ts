import { Handler } from "@netlify/functions";
import vikaLogin from "../vika/user/login";

const handler: Handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const responese = await vikaLogin();
    console.log(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ body: event.body, responese }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "请使用 POST 方法请求" }),
    };
  }
};

export { handler };
