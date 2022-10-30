import type { Datasheet } from "@vikadata/vika/es/datasheet";
import { USER_DATA_SHEET } from "../../config";
import vika from "./vika";

class UserService {
  dataSheet: Datasheet;
  constructor() {
    this.dataSheet = vika.datasheet(USER_DATA_SHEET);
  }

  async login(username: string) {
    // 分页获取记录，默认返回第一页
    const response = await this.dataSheet.records.query({
      filterByFormula: `{username}="${username}"`,
    });
    // console.log(response);
    return response;
  }
}
export default new UserService();
