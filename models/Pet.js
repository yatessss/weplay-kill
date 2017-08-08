/**
 * Created by yatesmiao on 2017/8/7.
 */
const db = require('../db');

module.exports = db.defineModel('pets', {
  id: {
    type: db.STRING(50),
    primaryKey: true
  },
  name: db.STRING(100),
  gender: db.BOOLEAN,
  birth: db.STRING(50)
});