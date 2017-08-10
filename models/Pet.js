/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

module.exports = db.defineModel('pets', {
  open_id: {
    type: db.STRING(100)
  },
  // 比赛总数
  matches_total_num: {
    type: db.BIGINT(11)
  },
  // 各类角色次数
  id: {
    type: db.STRING(50),
    primaryKey: true
  },
  name: db.STRING(100),
  gender: db.BOOLEAN,
  birth: db.STRING(50)
});