/**
 * Created by miaoyicheng on 2017/8/20.
 */

const db = require('../db');

module.exports = db.defineModel('wxinfos', {
  open_id: {
    type: db.STRING(50),
    unique: true,
    primaryKey: true
  },
  nickname: {
    type: db.STRING(50),
  },
  code: {
    type: db.STRING(50),
  },
  sex: {
    type: db.STRING(50)
  },
  language: {
    type: db.STRING(50)
  },
  city: {
    type: db.STRING(50)
  },
  province: {
    type: db.STRING(50)
  },
  country: {
    type: db.STRING(50)
  },
  head_img_url: {
    type: db.STRING(200)
  }
});