import * as Koa from "koa";

const users = [
  { name: "tom", age: 20 },
  { name: "tom", age: 20 }
];

import { get, post, check } from "../utils/decorator";

export default class User {

  
  @get("/users")
  public list(ctx: Koa.Context) {
    ctx.body = { ok: 1, data: users };
  }

  
  @post("/users")
  @check({name:'name'})
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
