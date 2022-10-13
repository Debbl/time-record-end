import type { Handler } from "@netlify/functions";
import { getFormatUserTime, getResult, passToken } from "../vika/config";
import vikaGetAllUserWeekTime from "../vika/time/getAllUserWeekTime";

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

  const response = await vikaGetAllUserWeekTime();
  if (response.success) {
    const dataArr = getFormatUserTime(response.data.records);
    dataArr.sort((a, b) => b.totalTimeStampTemp - a.totalTimeStampTemp);
    const index = dataArr.findIndex((item) => item.username === username);
    let data = {};
    data = {
      ...dataArr[index],
      rank: index + 1,
    };
    if (index === -1) {
      data = {
        username,
        time: "00:00:00",
        totalTimeStampTemp: 0,
        rank: dataArr.length + 1,
      };
    }
    result.body = JSON.stringify({
      code: 200,
      msg: null,
      data,
      rank: 0,
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
