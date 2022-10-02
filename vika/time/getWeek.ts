import { getUserTime, getWeekTimePart } from "./config";

const vikaGetWeek = async (username: string) => {
  const [weekStartStamp, weekEndStamp] = getWeekTimePart();
  const response = await getUserTime(username, weekStartStamp, weekEndStamp);
  // for (const item of response.data.records)
  //   console.log(item);

  // if (response.success) {
  //   const timeArr = Array.from({ length: 7 }).map((_, i) => [i + 1, ...getEveryWeekTimePart(i)]);
  //   const map = new Map<number, IFieldValueMap[]>();
  //   for (let i = 0; i < response.data.records.length; i++) {
  //     const timeStamp = response.data.records[i].fields.startTime;
  //     const weekTime = timeArr.find(time => time[1] < timeStamp && time[2] > timeStamp);
  //     if (weekTime) {
  //       if (!map.has(weekTime[0])) map.set(weekTime[0], []);
  //       map.get(weekTime[0]).push(response.data.records[i].fields);
  //     }
  //   }
  //   const data: Record<number, { username: IFieldValue; time: string; totalTimeStamp: number }> = {};
  //   for (const [key, value] of map) {
  //     let totalTimeStamp = 0;
  //     for (const field of value)
  //       totalTimeStamp += Number(field.timeStamp);
  //     data[key] = {
  //       username,
  //       time: getFormatTime(totalTimeStamp),
  //       totalTimeStamp,
  //     };
  //   }
  //   console.log(data);
  // }

  return response;
};

// vikaGetWeek("zhangsan4");

export default vikaGetWeek;
