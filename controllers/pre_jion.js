/**
 * Created by yatesmiao on 2017/8/6.
 */
var fn_pre_jion = async (ctx, next) => {
  ctx.render('pre-jion.html', {
    title: 'Welcome'
  });
};

module.exports = {
  'GET /pre-jion': fn_pre_jion
};