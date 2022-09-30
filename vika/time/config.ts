import { vika } from "../config";

const dataSheet = vika.datasheet("dstnxBkVTZyTNu5m40");

const getTodayTimePart = () => {
  const todayStartStamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  const todayEndStamp = new Date(
    new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1,
  ).getTime();
  return [todayStartStamp, todayEndStamp];
};

const getWeekTimePart = () => {
  const now = new Date(); // 当前日期
  const nowDayOfWeek = now.getDay(); // 今天本周的第几天
  const nowDay = now.getDate(); // 当前日
  const nowMonth = now.getMonth(); // 当前月
  const nowYear = now.getFullYear(); // 当前年
  const weekStartStamp = new Date(
    nowYear,
    nowMonth,
    nowDay - nowDayOfWeek + 1,
  ).getTime();
  const weekEndStamp = new Date(
    nowYear,
    nowMonth,
    nowDay + (7 - nowDayOfWeek),
  ).getTime();
  return [weekStartStamp, weekEndStamp];
};

const getMonthTimePart = () => {
  const now = new Date(); // 当前日期
  const nowMonth = now.getMonth(); // 当前月
  const nowYear = now.getFullYear(); // 当前年
  // 获得某月的天数
  function getMonthDays(month) {
    const monthStartDate = new Date(nowYear, month, 1).getTime();
    const monthEndDate = new Date(nowYear, month + 1, 1).getTime();
    const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }
  const monthStartStamp = new Date(nowYear, nowMonth, 1).getTime();
  const monthEndStamp = new Date(
    nowYear,
    nowMonth,
    getMonthDays(nowMonth),
  ).getTime();
  return [monthStartStamp, monthEndStamp];
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

export {
  dataSheet,
  getTodayTimePart,
  getWeekTimePart,
  getMonthTimePart,
  getUserTime,
  getTime,
};
