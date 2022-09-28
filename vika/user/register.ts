import vika from "../index";
import vikaLogin from "./login";

const vikaRegister = async (loginInfo: any) => {
  const dataSheet = vika.datasheet("dstf2Lur3r2D7Zpz0v");
  const response = await vikaLogin();
  const records = response.data.records;
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (loginInfo.username === record.fields.username) return false;
  }
  return dataSheet.records.create([
    {
      fields: loginInfo,
    },
  ]);
};

export default vikaRegister;
