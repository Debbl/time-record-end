import Koa from "koa";
import serverless from "serverless-http";

const app = new Koa();

app.use(async (ctx) => {
  // ctx.body = "Hello World";
  ctx.body = {
    aaa: "aaa",
  };
});

export default app;
const handler = serverless(app);
export { handler };
