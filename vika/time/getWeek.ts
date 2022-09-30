import { getUserTime } from "./config";

const vikaGetWeek = async (username: string) => {
  const now = new Date(); // 当前日期
  const nowDayOfWeek = now.getDay(); // 今天本周的第几天
  const nowDay = now.getDate(); // 当前日
  const nowMonth = now.getMonth(); // 当前月
  const nowYear = now.getFullYear(); // 当前年
  const weekStartTemp = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1).getTime();
  const weekEndTemp = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek)).getTime();

  const response = await getUserTime(username, weekStartTemp, weekEndTemp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

export default vikaGetWeek;
