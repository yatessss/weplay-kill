/**
 * Created by yatesmiao on 2017/8/14.
 */
const config = require('../config');
const model = require('../model');
const axios = require('axios')

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
  },

  'GET /api/getCode': async (ctx, next) => {
    console.log('接收到了网页发来的消息')
    const appid = 'wx470ba9b3c2e89e1f'
    const secret = 'd7232fd5d58f28245b803a72b8f185e2'
    const code = ctx.request.query.code
    let res = {}
    await axios({
      method:'get',
      url:`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`,
    }).then(function(response) {
      console.log('发送成功了一个消息')
      return response
    }).then((response) => {
      console.log(`https://api.weixin.qq.com/sns/userinfo?access_token=${response.data.access_token}&openid=${response.data.openid}&lang=zh_CN`,)
      return axios({
        method:'get',
        url:`https://api.weixin.qq.com/sns/userinfo?access_token=${response.data.access_token}&openid=${response.data.openid}&lang=zh_CN`,
      })
    }).then((response)=> {
      console.log('最后的数据', response)
      res = response.data
    });
    ctx.rest(res);
  }
};