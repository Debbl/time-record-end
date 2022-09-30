import { vika } from "../config";

const dataSheet = vika.datasheet("dstnxBkVTZyTNu5m40");

const getTodayTimePart = () => {
  const todayStartTemp = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  const todayEndTemp = new Date(
    new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1,
  ).getTime();
  return [todayStartTemp, todayEndTemp];
};

const getWeekTimePart = () => {
  const now = new Date(); // 当前日期
  const nowDayOfWeek = now.getDay(); // 今天本周的第几天
  const nowDay = now.getDate(); // 当前日
  const nowMonth = now.getMonth(); // 当前月
  const nowYear = now.getFullYear(); // 当前年
  const weekStartTemp = new Date(
    nowYear,
    nowMonth,
    nowDay - nowDayOfWeek + 1,
  ).getTime();
  const weekEndTemp = new Date(
    nowYear,
    nowMonth,
    nowDay + (7 - nowDayOfWeek),
  ).getTime();
  return [weekStartTemp, weekEndTemp];
};

const getUserTime = async (
  username: string,
  startTime: number,
  endTime: number,
) => {
  const response = await dataSheet.records.query({
    filterByFormula: `AND(
    {username}="${username}",
    VALUE({startTime})>VALUE(${startTime}),
    VALUE({endTime})<VALUE(${endTime})
    )`,
  });
  return response;
};

const getTime = async (startTime: number, endTime: number) => {
  const response = await dataSheet.records.query({
    filterByFormula: `AND(
    VALUE({startTime})>VALUE(${startTime}),
    VALUE({endTime})<VALUE(${endTime})
    )`,
  });
  return response;
};

export { dataSheet, getTodayTimePart, getWeekTimePart, getUserTime, getTime };
