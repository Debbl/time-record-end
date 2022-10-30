import Router from "@koa/router";

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/", (ctx) => {
  ctx.body = {
    user: "foo",
  };
});

export default userRouter;
