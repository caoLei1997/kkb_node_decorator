import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";

import * as Parameter from "parameter";

const router = new KoaRouter();

type RouteOptions = {
  /**
   * 给当前路由添加一个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>;
};

const method = method => (path, options?: RouteOptions) => {
  return (target, property, decriptor) => {
    router[method](path, target[property]);
  };
};

export const get = method("get");
export const post = method("post");

export const check = rule => {
  return function(target, name, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function() {
      const ctx = arguments[0];
      if (!ctx.request.body.name) {
       throw new Error('错误请串参');
      }
      return oldValue.apply(null, arguments);
    };
    return descriptor;
  };
};

export const load = (folder: string, options: any = {}): KoaRouter => {
  const extname = options.extname || ".{js,ts}";
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach(item => require(item));
  return router;
};
