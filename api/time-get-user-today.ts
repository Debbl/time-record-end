import type { Handler } from "@netlify/functions";
import vikaGetToday from "../vika/time/getToday";
import { getResult, passToken } from "../vika/config";

const handler: Handler = async (event) => {
  const result = getResult();
  // 非 GET 请求
  if (event.httpMethod !== "GET") {
    result.body = JSON.stringify({
      code: 200,
      msg: "请使用 GET 方法请求",
      data: {},
      map: {},
    });
    return result;
  }

  const isPassToken = await passToken(event);
  if (!isPassToken) {
    result.body = JSON.stringify({
      code: 403,
      msg: "error",
      data: null,
      mpa: {},
    });
    return result;
  }

  const { username } = event.queryStringParameters;
  if (!username) {
    result.body = JSON.stringify({
      code: 200,
      msg: "请传递 username",
      data: {},
      map: {},
    });
    return result;
  }

  const response = await vikaGetToday(username);
  const data = response.data.records.map((record) => record.fields);
  if (response.success) {
    result.body = JSON.stringify({
      code: 200,
      msg: null,
      data,
      map: {},
    });
    return result;
  }

  result.body = JSON.stringify({
    code: 200,
    msg: "用户名错误",
    data: {},
    map: {},
  });
  return result;
};

export { handler };
