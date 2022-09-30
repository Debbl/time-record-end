import { dataSheet } from "./config";

const vikaGetToday = async (username: string) => {
  const todayStartTemp = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  const todayEndTemp = new Date(
    new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1,
  ).getTime();
  const response = await dataSheet.records.query({
    filterByFormula: `AND(
    {username}="${username}",
    VALUE({startTime})>VALUE(${todayStartTemp}),
    VALUE({endTime})<VALUE(${todayEndTemp})
    )`,
  });
  // for (const item of response.data.records)
  //   console.log(item);

  return response;
};

// vikaGetToday("zhangsan4");

export default vikaGetToday;
