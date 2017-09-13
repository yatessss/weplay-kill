/**
 * Created by yatesmiao on 2017/8/7.
 */

const model = require('./model.js');
let Match = model.Match
let Role = model.Role
let WxInfo = model.WxInfo
WxInfo.hasOne(Role)
Role.belongsTo(WxInfo)
model.sync().then(()=>{
  console.log('@@@@@@@@@@@@@创建完成');
  process.exit(0);
}).catch((e)=>{
  console.log('failed with: '+e);
  process.exit(0);});
