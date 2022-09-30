import { getMonthTimePart, getTime } from "./config";

const vikaGetAllUserMonthTime = async () => {
  const [monthStartStamp, monthEndStamp] = getMonthTimePart();
  const response = await getTime(monthStartStamp, monthEndStamp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// console.log(vikaGetAllUserWeekTime());

export default vikaGetAllUserMonthTime;
