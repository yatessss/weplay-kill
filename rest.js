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
  APIError: function (code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
  },
  restify: (pathPrefix) => {
    // REST API前缀，默认为/api/:
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      // 是否是REST API前缀?
      if (ctx.request.path.startsWith(pathPrefix)) {
        // 绑定rest()方法:
        ctx.rest = (data, token) => {

          ctx.set('Access-Control-Allow-Origin', '*');
          ctx.set('Access-Control-Expose-Headers', 'Access-Token, Uid, Authorization');
          ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          ctx.set('Access-Control-Allow-Headers', 'Authorization');
          ctx.set('Authorization', token);
          ctx.type = 'application/json';
          ctx.body = data;
        }
        try {
          await next();
        } catch (e) {
          console.log('错误是', e)
          // 返回错误:
          if (e.message === 'Authentication Error') {
            ctx.response.status = 401;
            ctx.response.type = 'application/json';
            ctx.response.body = {
              code: e.code || 'authError:authError',
              message: e.message || ''
            };
          } else {
            ctx.response.status = 400;
            ctx.response.type = 'application/json';
            ctx.response.body = {
              code: e.code || 'internal:unknown_error',
              message: e.message || ''
            };
          }
        }
      } else {
        await next();
      }
    };
  }
};