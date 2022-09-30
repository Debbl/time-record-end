import { getUserTime, getWeekTimePart } from "./config";

const vikaGetWeek = async (username: string) => {
  const [weekStartStamp, weekEndStamp] = getWeekTimePart();
  const response = await getUserTime(username, weekStartStamp, weekEndStamp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

export default vikaGetWeek;
