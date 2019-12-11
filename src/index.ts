import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import * as timing from "koa-xtime";
const app = new Koa();


import { load } from "./utils/decorator";
import { resolve } from "path";

const router = load(resolve(__dirname, "./router"));

app.use(router.routes());


app.listen(3000, () => {
  console.log("服务器启动成功");
});
