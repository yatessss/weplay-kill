/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

module.exports = db.defineModel('matches', {
  // 房间id
  room_id: {
    type: db.STRING(50),
    unique: true,
    primaryKey: true
  },
  room_size: {
    type: db.BIGINT(11)
  }
});