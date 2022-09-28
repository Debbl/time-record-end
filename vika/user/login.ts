import vika from "../index";

const vikaLogin = async (username: string) => {
  const dataSheet = vika.datasheet("dstf2Lur3r2D7Zpz0v");
  // 分页获取记录，默认返回第一页
  const response = await dataSheet.records.query({
    filterByFormula: `{username}="${username}"`,
  });
  // console.log(response);
  return response;
};

// vikaLogin("qqq");

export default vikaLogin;
