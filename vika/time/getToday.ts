import { getTodayTimePart, getUserTime } from "./config";

const vikaGetToday = async (username: string) => {
  const [todayStartTemp, todayEndTemp] = getTodayTimePart();
  const response = await getUserTime(username, todayStartTemp, todayEndTemp);
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// vikaGetToday("zhangsan4");

export default vikaGetToday;
