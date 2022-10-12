import type { IFieldValueMap } from "@vikadata/vika";
import { dataSheet } from "./config";

export interface Info extends IFieldValueMap {
  username: string;
  time: string;
  timeStamp: string;
  startTime: string;
  endTime: string;
}

const vikaUpload = async (info: Info) => {
  return dataSheet.records.create([
    {
      fields: info,
    },
  ]);
};

// async function foo() {
//   const response = await vikaUpload({
//     username: "zhangsan4",
//     time: "00:32:41",
//     timeStamp: "3243223",
//     startTime: "1664518728959",
//     endTime: "1664518728960",
//   });
//   console.log(response);
// }

// foo();

export default vikaUpload;
