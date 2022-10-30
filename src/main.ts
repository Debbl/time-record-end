import Koa from "koa";
import serverless from "serverless-http";
import userRouter from "./router/user.router";

const app = new Koa();

app.use(async (ctx, next) => {
  // ctx.body = "Hello World";
  ctx.body = {
    aaa: "aaa",
  };
  await next();
});

app.use(userRouter.routes());

export default app;
const handler = serverless(app);
export { handler };
