import type { IFieldValueMap } from "@vikadata/vika";
import { dataSheet } from "./config";

export interface Info extends IFieldValueMap {
  username: string;
  time: string;
  timeStamp: string;
  startTime: string;
  endTime: string;
}

const vikaLogin = async (info: Info) => {
  return dataSheet.records.create([
    {
      fields: info,
    },
  ]);
};

export default vikaLogin;
