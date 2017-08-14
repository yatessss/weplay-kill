/**
 * Created by yatesmiao on 2017/8/11.
 */
var fn_demo = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  'GET /demo/:name': fn_demo
};