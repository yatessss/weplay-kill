/**
 * Created by yatesmiao on 2017/8/14.
 */
const config = require('../config');
const model = require('../model');
const axios = require('axios')
const jwt = require('jsonwebtoken');
const APIError = require('../rest').APIError;

let Match = model.Match
let Role = model.Role
let WxInfo = model.WxInfo
WxInfo.hasOne(Role)
Role.belongsTo(WxInfo)

module.exports = {
  'OPTIONS /api/create': async (ctx, next) => {
//    throw new APIError('product:not_found', 'product not found by id.');
    ctx.rest({
      status: 'ok'
    });
  },
  'OPTIONS /api/getCode': async (ctx, next) => {
//    throw new APIError('product:not_found', 'product not found by id.');
    ctx.rest({
      status: 'ok'
    });
  },
  'OPTIONS /api/join': async (ctx, next) => {
//    throw new APIError('product:not_found', 'product not found by id.');
    ctx.rest({
      status: 'ok'
    });
  },
  'OPTIONS /api/search/:room_id': async (ctx, next) => {
//    throw new APIError('product:not_found', 'product not found by id.');
    ctx.rest({
      status: 'ok'
    });
  },

  'GET /api/products': async (ctx, next) => {
//    throw new APIError('product:not_found', 'product not found by id.');
    ctx.rest({
      data: 'ok'
    });
  },


  // 查找房间信息接口
  'GET /api/search/:room_id': async (ctx, next) => {

    console.log('进入/api/search/:room_id接口')
    const room_id = ctx.params.room_id;
    console.log('收到的参数', room_id, ctx.request)
    const decoded = jwt.decode(ctx.request.header.authorization.slice(7));
    if (!decoded.openid) {
      throw new APIError('Authentication Error', 'authError: decoded token openid is undefined');
    }
    const role = await Role.findOne({
      where: {open_id: decoded.openid}
    })
    // 如果不是法官 只展示 桌号 名字 信息
    if (role.user_role !== 'judge') {
      const allPlayers = await Role.findAll({
        where: {room_id: role.room_id},
        include:[WxInfo]
      }).then(res => {
        ctx.rest({
          type: 'guest',
          allPlayers: res
        });
      })
    } else {
      // 如果是法官 展示各玩家名字 角色等
      const allPlayers = await Role.findAll({
        where: {room_id: role.room_id},
        include:[WxInfo]
      }).then((res) => {
        ctx.rest({
          type: 'host',
          allPlayers: res
        });
      })
    }
  },


  'POST /api/join': async (ctx, next) => {
    let res = {
      room_id: ctx.request.body.room_id,
      user_num: ctx.request.body.user_num,
      user_role: ctx.request.body.user_role
    };
    console.log('接收到join', res)
    const decoded = jwt.decode(ctx.request.header.authorization.slice(7));
    // 没有openid 直接返回错误
    if (!decoded.openid) {
      throw new APIError('Authentication Error', 'authError: decoded token openid is undefined');
    }
    const roomInfo = await Match.findOne({
      where: {room_id: res.room_id}
    }).catch(() => {})
    // 没有查找到房间 返回错误
    if (!roomInfo) {
      throw new APIError('Join Error', 'joinError: the room was not found');
    }
    const role = await Role.findOne({
      where: {open_id: decoded.openid}
    }).catch(() => {})
    // 后台接收到的都是string类型 所以用 ==
    if (role && role.room_id == res.room_id) {
      console.log('加入与自己的room_id相同',role, res)
      ctx.rest({
        status: 'ok',
        status_code: 200,
        room_id: res.room_id
      });
    } else {
      console.log('加入与自己的room_id不同',role, res)
      // TODO: 改成一至的key
      const joinedNum = await Role.findAll({
        where: {room_id: res.room_id}
      })
      if (joinedNum.length < roomInfo.room_size) {
        console.log('目前房间没满可以加入')

        await Role.upsert({
          open_id: decoded.openid,
          room_id: res.room_id,
          user_role: res.user_role, // 代表法官
          user_num: res.user_num,  // 0 代表法官
          wxinfoOpenId: decoded.openid
        });
      } else {
        // 房间满了 返回错误
        throw new APIError('Join Error', 'joinError: the room is fulled');
      }
      console.log('查找到的房间大小', roomInfo.room_size, '目前房间人数', joinedNum.length)
      ctx.rest({
        status: 'ok',
        status_code: 200,
        room_id: res.room_id
      });
    }
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
    console.log('创建了房间的数据: ' + JSON.stringify(match));
    // 解析jwt
    console.log('header头',ctx.request.header)
    let decoded = jwt.decode(ctx.request.header.authorization.slice(7));
    console.log('authorization：',ctx.request.header.authorization,'token', decoded)
    if (!decoded.openid) {
       throw new APIError('Authentication Error', 'authError: decoded token openid is undefined');
    }
    console.log('decode', decoded)
    let role = await Role.upsert({
      open_id: decoded.openid,
      room_id: room_id,
      user_role: 'judge', // 代表法官
      user_num: 0,  // 0 代表法官
      wxinfoOpenId: decoded.openid
    });
    console.log('创建了角色的数据: ' + JSON.stringify(role));

    ctx.rest({
      status: 'ok',
      status_code: 200,
      room_id: room_id
    });
  },

  'GET /api/getCode': async (ctx, next) => {

    const appid = 'wx470ba9b3c2e89e1f'
    const secret = 'd7232fd5d58f28245b803a72b8f185e2'
    const CODE = ctx.request.query.code
    let res = {}
    console.log('接收到了网页发来的消息', ctx.request)

    let token = ''
    // 若果有code可以查到，直接去code当中openid  如果没有就去取openid 并更新
    await WxInfo.findOne({where: {
      code: CODE
    }}).then(async (result) => {
      if (!result) {
        console.log('没找到这个code,结果是：',result)
        await axios({
          method:'get',
          url:`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${CODE}&grant_type=authorization_code`,
        }).then(function(response) {
          console.log('发送成功了一个消息')
          return response
        }).then((response) => {
          return axios({
            method:'get',
            url:`https://api.weixin.qq.com/sns/userinfo?access_token=${response.data.access_token}&openid=${response.data.openid}&lang=zh_CN`,
          })
        }).then((response)=> {
          (async () => {
            console.log('最后的数据', response.data, CODE)
            /**
             * { openid: 'o6xIfwDVXgk6N-CZGx-N3QYQvkr8',
                nickname: 'xxx',
                sex: 1,
                language: 'zh_CN',
                city: 'xxx',
                province: 'xxx',
                country: 'xxx',
                headimgurl: 'xxxxx',
                privilege: [] }
             */
            res = response.data
            console.log('目前的const  res', res)

            let wxinfo = await WxInfo.upsert({
              open_id: response.data.openid,
              nickname: response.data.nickname,
              sex: response.data.sex,
              roleOpenId: response.data.openid,
              language: response.data.language,
              city: response.data.city,
              province: response.data.province,
              country: response.data.country,
              head_img_url: response.data.headimgurl,
              code: CODE
            },
              {
                include: [ Role ]
              });
              console.log('创建的WxInfo', wxinfo)

            // Role.upsert({
            //   open_id: response.data.openid,
            //   room_id: 0,
            //   user_role: '', // 代表法官
            //   user_num: 0,  // 0 代表法官
            // }).then((role) => {
            //   console.log('创建的role')
            //   let wxInfo = WxInfo.build({
            //     open_id: response.data.openid,
            //     roleOpenId: response.data.openid,
            //     nickname: response.data.nickname,
            //     sex: response.data.sex,
            //     language: response.data.language,
            //     city: response.data.city,
            //     province: response.data.province,
            //     country: response.data.country,
            //     head_img_url: response.data.headimgurl,
            //     code: CODE
            //   });
            //   Role.setWxInfo(wxInfo).then((res) => {
            //     console.log('res', res)
            //   });
            //   console.log('创建的WxInfo', wxInfo)
            //
            // }).catch(next);

            console.log('创建完了数据')
          })();
          token = jwt.sign({openid: res.openid},'wsd',{expiresIn: 24 * 60 * 60}); /* 1 days */
          ctx.rest(res, token);
          console.log('创建了: ' + JSON.stringify(wxinfo));
        });
      } else {
        console.log('找到了这个code,结果是：',result)
        res = result.dataValues
        token = jwt.sign({openid: res.open_id},'wsd',{expiresIn: 24 * 60 * 60}); /* 1 days */
        ctx.rest(res, token);
      }
    }).catch((err) => {
      return err
    })

  }
};