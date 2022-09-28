import vika from "../index";
import vikaLogin from "./login";

const vikaRegister = async (loginInfo: any) => {
  const dataSheet = vika.datasheet("dstf2Lur3r2D7Zpz0v");
  const response = await vikaLogin(loginInfo.username);
  if(response.data.records.length !== 0) {
    return false;
  }
  return dataSheet.records.create([
    {
      fields: loginInfo,
    },
  ]);
};

export default vikaRegister;
