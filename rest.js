/**
 * Created by yatesmiao on 2017/8/14.
 */

// middleware
/**
 * 这样，任何支持REST的异步函数只需要简单地调用：
 * ctx.rest({
    data: 123
});
 */

module.exports = {
  restify: (pathPrefix) => {
    // REST API前缀，默认为/api/:
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      // 是否是REST API前缀?
      if (ctx.request.path.startsWith(pathPrefix)) {
        // 绑定rest()方法:
        ctx.rest = (data, token) => {
          ctx.type = 'application/json';
          ctx.body = data;
          ctx.set('Authorization', token);
        }
        await next();
      } else {
        await next();
      }
    };
  }
};