import Router from "@koa/router";
import userController from "../controller/user.controller";

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/", (ctx) => {
  ctx.body = {
    user: "foo",
  };
});

userRouter.post("/login", userController.login);

export default userRouter;
