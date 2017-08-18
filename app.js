/**
 * Created by yatesmiao on 2017/8/6.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const koajwt = require('koa-jwt');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 导入controller middleware:
const controller = require('./controller');
const templating = require('./templating');
const rest = require('./rest');
const nunjucks = require('nunjucks');
const isProduction = process.env.NODE_ENV === 'production';


app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var
    start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (! isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());
app.use(rest.restify());

app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}));

app.use(koajwt({
  secret:'wsd'
}).unless({path: [/^(?!.*\/api\/)/]}));

app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');