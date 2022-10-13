import type { Handler } from "@netlify/functions";
import type { IFieldValue, IFieldValueMap } from "@vikadata/vika";
import { getResult, passToken } from "../vika/config";
import { getEveryHoursTimePart } from "../vika/time/config";
import vikaGetToday from "../vika/time/getToday";

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
  if (response.success) {
    const timeArr = Array.from({ length: 12 }).map((_, i) => [
      i,
      ...getEveryHoursTimePart(i),
    ]);
    const map = new Map<number, IFieldValueMap[]>();
    for (let i = 0; i < response.data.records.length; i++) {
      const timeStamp = response.data.records[i].fields.startTime;
      const weekTime = timeArr.find(
        (time) => time[1] < timeStamp && time[2] > timeStamp
      );
      if (weekTime) {
        if (!map.has(weekTime[0])) map.set(weekTime[0], []);
        map.get(weekTime[0]).push(response.data.records[i].fields);
      }
    }
    const dataMap: Record<
      number,
      { username: IFieldValue; time: string; totalTimeStamp: number }
    > = {};
    for (const [key, value] of map) {
      let totalTimeStamp = 0;
      for (const field of value) totalTimeStamp += Number(field.timeStamp);
      dataMap[key] = {
        username,
        time: String(Math.floor(Math.floor(totalTimeStamp / 1000) / 60)),
        totalTimeStamp,
      };
    }
    const data = Array.from({ length: 12 }).map((_, i) => dataMap[i] || {});
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
