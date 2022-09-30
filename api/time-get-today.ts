import type { Handler } from "@netlify/functions";
import vikaGetToday from "../vika/time/getToday";
import { getResult } from "../vika/config";

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
  if (response.success) {
    let totalTimeStamp = 0;
    const timeArr = ["00", "00", "00"];
    for (const record of response.data.records)
      totalTimeStamp += Number(record.fields.timeStamp);

    let totalTimeStampTemp = totalTimeStamp / 1000;
    let flag = 2;
    while (totalTimeStampTemp > 0) {
      timeArr[flag--] = String(totalTimeStampTemp % 60);
      totalTimeStampTemp = Math.floor(totalTimeStampTemp / 60);
    }
    result.body = JSON.stringify({
      code: 200,
      msg: "请传递 username",
      data: {
        username,
        time: timeArr.join(":"),
        totalTimeStamp,
      },
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
