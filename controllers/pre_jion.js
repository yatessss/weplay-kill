/**
 * Created by yatesmiao on 2017/8/6.
 */
var fn_pre_join = async (ctx, next) => {
  ctx.render('pre-join.html', {
    title: 'weplay桌游协会'
  });
};

module.exports = {
  'GET /pre-join': fn_pre_join
};