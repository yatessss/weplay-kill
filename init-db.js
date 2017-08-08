/**
 * Created by yatesmiao on 2017/8/7.
 */

const model = require('./model.js');

model.sync().then(()=>{
  console.log('@@@@@@@@@@@@@创建完成');
  process.exit(0);
}).catch((e)=>{
  console.log('failed with: '+e);
  process.exit(0);});
