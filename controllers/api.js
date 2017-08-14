/**
 * Created by yatesmiao on 2017/8/14.
 */
const config = require('../config');
const model = require('../model');

let Match = model.Match

var products = [{
  name: 'iPhone',
  price: 6999
}, {
  name: 'Kindle',
  price: 999
}];

module.exports = {
  'GET /api/products': async (ctx, next) => {
    // 设置Content-Type:
    ctx.rest({
      data: products
    });
  },

  'POST /api/create': async (ctx, next) => {
    let res = {
      room_size: ctx.request.body.room_size
    };
    const room_id = Math.floor(Math.random()*10000)
    let match = await Match.create({
      room_size: res.room_size,
      room_id: room_id,
    });
    console.log('创建了: ' + JSON.stringify(match));

    ctx.redirect(`/room/${room_id}`)
  }
};