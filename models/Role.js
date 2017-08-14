/**
 * Created by yatesmiao on 2017/8/11.
 */
/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

module.exports = db.defineModel('roles', {
  // 用户id
  open_id: {
    type: db.STRING(50),
    unique: true,
    primaryKey: true
  },
  // 用户房间id
  user_room_id: {
    type: db.BIGINT(11)
  },
  // 用户的角色信息
  user_role: {
    type: db.STRING(50)
  },
  // 用户的桌号
  user_num: {
    type: db.BIGINT(11)
  }
});