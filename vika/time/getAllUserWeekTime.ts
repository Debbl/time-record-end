import { getTime, getWeekTimePart } from "./config";

const vikaGetAllUserWeekTime = async () => {
  const [weekStartStamp, weekEndStamp] = getWeekTimePart();
  const response = await getTime(weekStartStamp, weekEndStamp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// console.log(vikaGetAllUserWeekTime());

export default vikaGetAllUserWeekTime;
