import dotenv from "dotenv";
// import type { Context } from "koa";

dotenv.config({
  override: true,
});

const VIKA_TOKEN = process.env.VIKA_TOKEN;
console.log(VIKA_TOKEN);

const USER_DATA_SHEET = "dstf2Lur3r2D7Zpz0v";

const NAME_OR_PASSWORD_IS_REQUIRED = "name_or_password_is_required";
const USER_INFO_ERROR = "user_info_error";

const errorHandler = (error: Error, ctx: any) => {
  let status: number;
  let message: string;
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status = 403;
      message = "用户名或密码不能为空～";
      break;
    case USER_INFO_ERROR:
      status = 403;
      message = "用户信息错误！";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = message;
};

export {
  errorHandler,
  VIKA_TOKEN,
  USER_DATA_SHEET,
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_INFO_ERROR,
};
