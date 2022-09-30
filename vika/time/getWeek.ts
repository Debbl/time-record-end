import { getUserTime, getWeekTimePart } from "./config";

const vikaGetWeek = async (username: string) => {
  const [weekStartTemp, weekEndTemp] = getWeekTimePart();
  const response = await getUserTime(username, weekStartTemp, weekEndTemp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

export default vikaGetWeek;
