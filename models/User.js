/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

module.exports = db.defineModel('users', {
  email: {
    type: db.STRING(100),
    unique: true
  },
  passwd: db.STRING(100),
  name: db.STRING(100),
  gender: db.BOOLEAN
});