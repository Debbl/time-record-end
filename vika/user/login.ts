import { Vika } from "@vikadata/vika";

const vika = new Vika({ token: "uskwJCD2UzYxJ81qvxRfceO" });

const vikaLogin = async () => {
  const datasheet = vika.datasheet("dstf2Lur3r2D7Zpz0v");
  // 分页获取记录，默认返回第一页
  const responese = await datasheet.records.query({ viewId: "viw7TBlhXHt9t" });
  console.log(responese);
  return responese;
};

vikaLogin();

export default vikaLogin;
