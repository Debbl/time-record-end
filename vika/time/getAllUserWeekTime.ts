import { getTime, getWeekTimePart } from "./config";

const vikaGetAllUserWeekTime = async () => {
  const [weekStartTemp, weekEndTemp] = getWeekTimePart();
  const response = await getTime(weekStartTemp, weekEndTemp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// console.log(vikaGetAllUserWeekTime());

export default vikaGetAllUserWeekTime;
