/**
 * Created by yatesmiao on 2017/8/6.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 导入controller middleware:
const controller = require('./controller');


app.use(bodyParser());
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');