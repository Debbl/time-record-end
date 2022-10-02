import { vika } from "../config";
import m from "../../utils/m";

const dataSheet = vika.datasheet("dstnxBkVTZyTNu5m40");

const getTodayTimePart = () => {
  const todayStartStamp = m().startOf("day").valueOf();
  const todayEndStamp = m().endOf("day").valueOf();
  return [todayStartStamp, todayEndStamp];
};

const getWeekTimePart = () => {
  const weekStartStamp = m().startOf("week").valueOf();
  const weekEndStamp = m().endOf("week").valueOf();
  return [weekStartStamp, weekEndStamp];
};

const getEveryWeekTimePart = (step: number) => {
  const day = m().startOf("week").add(step, "day");
  const weekStartStamp = day.valueOf();
  const weekEndStamp = day.endOf("day").valueOf();
  return [weekStartStamp, weekEndStamp];
};

const getMonthTimePart = () => {
  const monthStartStamp = m().startOf("month").valueOf();
  const monthEndStamp = m().endOf("month").valueOf();
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
  getEveryWeekTimePart,
  getTodayTimePart,
  getWeekTimePart,
  getMonthTimePart,
  getUserTime,
  getTime,
};
