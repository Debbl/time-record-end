import { getTodayTimePart, getUserTime } from "./config";

const vikaGetToday = async (username: string) => {
  const [todayStartStamp, todayEndStamp] = getTodayTimePart();
  const response = await getUserTime(username, todayStartStamp, todayEndStamp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// vikaGetToday("zhangsan4");

export default vikaGetToday;
