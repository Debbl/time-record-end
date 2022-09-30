import { getMonthTimePart, getTime } from "./config";

const vikaGetAllUserMonthTime = async () => {
  const [weekStartStamp, weekEndStamp] = getMonthTimePart();
  const response = await getTime(weekStartStamp, weekEndStamp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// console.log(vikaGetAllUserWeekTime());

export default vikaGetAllUserMonthTime;
