/**
 * Created by yatesmiao on 2017/8/6.
 */
var fn_hello = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  'GET /hello/:name': fn_hello
};