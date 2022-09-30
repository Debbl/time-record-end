import type { IFieldValueMap } from "@vikadata/vika";
import { dataSheet } from "./config";
import vikaLogin from "./login";

export interface LoginInfo extends IFieldValueMap {
  username: string
  password: string
}

const vikaRegister = async (loginInfo: LoginInfo) => {
  const response = await vikaLogin(loginInfo.username);
  if (response.data.records.length !== 0) return false;

  return dataSheet.records.create([
    {
      fields: loginInfo,
    },
  ]);
};

export default vikaRegister;
