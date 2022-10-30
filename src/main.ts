import Koa from "koa";
import serverless from "serverless-http";
import bodyParser from "koa-bodyparser";
import userRouter from "./router/user.router";

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());

export default app;
const handler = serverless(app);
export { handler };
