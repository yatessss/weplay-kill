/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

// userBaseInfo 用户基本信息
module.exports = db.defineModel('users', {
  // 用户openid
  open_id: {
    type: db.STRING(100),
    unique: true,
    primaryKey: true
  },
  // 比赛总数
  matches_total_num: {
    type: db.BIGINT(11)
  },
  // 各类角色次数
  various_roles: {
    type: db.ARRAY(db.RANGE(db.INTEGER)),
    allowNull: true
  },
  email: {
    type: db.RANGE(db.INTEGER),
    defaultValue: {'1':1}
  },
  passwd: db.STRING(100),
  name: db.STRING(100),
  gender: db.BOOLEAN
});