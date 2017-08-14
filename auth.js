/**
 * Created by miaoyicheng on 2017/8/15.
 */

// 微信公众号后台验证
var Koa = require('koa');
var sha1 = require('sha1');

var config = {
  wechat:{
    appID:'wx470ba9b3c2e89e1f', //填写你自己的appID
    appSecret:'d7232fd5d58f28245b803a72b8f185e2',  //填写你自己的appSecret
    token:'werty'  //填写你自己的token
  }
};

var app = new Koa();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var token = config.wechat.token;
  var signature = ctx.query.signature;
  var nonce = ctx.query.nonce;
  var timestamp = ctx.query.timestamp;
  var echostr = ctx.query.echostr;
  var str = [token,timestamp,nonce].sort().join(''); //按字典排序，拼接字符串
  var sha = sha1(str); //加密
  ctx.body = (sha === signature)? echostr + '' : 'failed';  //比较并返回结果
});

app.listen(3000);