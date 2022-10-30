import type { Context } from "koa";
import type { IFieldValueMap } from "@vikadata/vika";
import userService from "../services/user.service";

export interface LoginInfo extends IFieldValueMap {
  username: string;
  password: string;
}

class UserController {
  async login(ctx: Context) {
    const { username, password }: LoginInfo = ctx.request.body;
    if (!username || !password) {
      ctx.body = JSON.stringify({
        code: 200,
        msg: "请传递 username 和 password",
        data: {},
        map: {},
      });
      return;
    }
    const response = await userService.login(username);
    if (response.success && response.data.records.length !== 0) {
      const record = response.data.records[0];
      console.log(record);
      console.log(password);

      if (record.fields.password === password) {
        ctx.body = {
          code: 200,
          msg: null,
          data: {
            username: record.fields.username,
            password: "",
          },
          map: {},
        };
        return;
      }
    }
    ctx.body = {
      code: 200,
      msg: "用户名或密码错误",
      data: {},
      map: {},
    };
  }
}

export default new UserController();
