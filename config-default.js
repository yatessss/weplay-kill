/**
 * Created by yatesmiao on 2017/8/7.
 */

console.log('进入默认环境')

var config = {
  dialect: 'mysql',
  database: 'test', // 使用哪个数据库
  username: 'root', // 用户名
  password: '123456', // 口令
  host: 'localhost', // 主机名
  port: 3306 // 端口号，MySQL默认3306
};

module.exports = config;