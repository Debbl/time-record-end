import type { Context } from "koa";
import type { IFieldValueMap } from "@vikadata/vika";
import userService from "../services/user.service";
import { NAME_OR_PASSWORD_IS_REQUIRED, USER_INFO_ERROR } from "../../config";

export interface LoginInfo extends IFieldValueMap {
  username: string;
  password: string;
}

class UserController {
  async login(ctx: Context) {
    const { username, password }: LoginInfo = ctx.request.body;

    if (!username || !password) {
      const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    const response = await userService.login(username);
    if (response.success && response.data.records.length !== 0) {
      const record = response.data.records[0];
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

    return ctx.app.emit("error", new Error(USER_INFO_ERROR), ctx);
  }
}

export default new UserController();
