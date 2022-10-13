import type { Handler } from "@netlify/functions";
import { getFormatUserTime, getResult, passToken } from "../vika/config";
import vikaGetAllUserMonthTime from "../vika/time/getAllUserMonthTime";

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

  const response = await vikaGetAllUserMonthTime();
  if (response.success) {
    const data = getFormatUserTime(response.data.records);
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
    msg: "未知错误",
    data: {},
    map: {},
  });
  return result;
};

export { handler };
