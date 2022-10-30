import Koa from "koa";
import serverless from "serverless-http";

const app = new Koa();

app.use(async (ctx) => {
  // ctx.body = "Hello World";
  ctx.body = {
    aaa: "aaa",
  };
});

const handler = serverless(app);
export { handler };
