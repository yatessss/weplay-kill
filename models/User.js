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
  mathes_win_num: {
    type: db.BIGINT(11)
  },
  mathes_lose_num: {
    type: db.BIGINT(11)
  },
  role_good_win_num: {
    type: db.BIGINT(11)
  },
  role_bad_lose_num: {
    type: db.BIGINT(11)
  },
  role_good_num: {
    type: db.BIGINT(11)
  },
  role_bad_num: {
    type: db.BIGINT(11)
  },
  // 狼人次数
  role_werewolves: {
    type: db.BIGINT(11)
  },
  // 平民次数
  role_villagers: {
    type: db.BIGINT(11)
  },
  // 白痴次数
  role_idiot: {
    type: db.BIGINT(11)
  },
  // 守卫次数
  role_savior: {
    type: db.BIGINT(11)
  },
  // 女巫次数
  role_witch: {
    type: db.BIGINT(11)
  },
  // 预言家次数
  role_seer: {
    type: db.BIGINT(11)
  },
  // 猎人次数
  role_hunter: {
    type: db.BIGINT(11)
  }
});