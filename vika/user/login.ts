import { dataSheet } from "./config";

const vikaLogin = async (username: string) => {
  // 分页获取记录，默认返回第一页
  const response = await dataSheet.records.query({
    filterByFormula: `{username}="${username}"`,
  });
  // console.log(response);
  return response;
};

// vikaLogin("qqq");

export default vikaLogin;
