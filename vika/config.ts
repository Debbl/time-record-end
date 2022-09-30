import type { IFieldValue, IRecord } from "@vikadata/vika";
import { Vika } from "@vikadata/vika";
import type { Response } from "@netlify/functions/dist/function/response";

const vika = new Vika({ token: "uskwJCD2UzYxJ81qvxRfceO" });
const getResult = (): Response => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

const getFormatUserTime = (records: IRecord[]) => {
  const map = new Map<IFieldValue, number>();
  for (const record of records) {
    const username = record.fields.username;
    const stamp = record.fields.totalTimeStamp;
    map.set(username, (map.get(username) || 0) + Number(stamp));
  }
  const data = [];
  for (const [key, value] of map) {
    const timeArr = ["00", "00", "00"];
    let totalTimeStampTemp = value / 1000;
    let flag = 2;
    while (totalTimeStampTemp > 0) {
      timeArr[flag--] = String(totalTimeStampTemp % 60);
      totalTimeStampTemp = Math.floor(totalTimeStampTemp / 60);
    }
    data.push({
      username: key,
      time: timeArr.join(":"),
      totalTimeStampTemp: value,
    });
  }
  return data;
};

export { vika, getResult, getFormatUserTime };
