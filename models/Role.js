/**
 * Created by yatesmiao on 2017/8/11.
 */
/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

module.exports = db.defineModel('roles', {
  // 房间id
  user_id: {
    type: db.STRING(50),
    unique: true,
    primaryKey: true
  },
  user_role: {
    type: db.STRING(50)
  }
});