import type { Context, Next } from "koa";
import Koa from "koa";
import serverless from "serverless-http";
import bodyParser from "koa-bodyparser";
import { errorHandler } from "./config/config";
import userRouter from "./router/user.router";

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.on("error", errorHandler);

export default app;
const handler = serverless(app);
export { handler };
