/**
 * Created by yatesmiao on 2017/8/14.
 */

var fn_room = async (ctx, next) => {
  ctx.render('room.html', {
    room_id: ctx.params.room_id
  });
};

module.exports = {
  'GET /room/:room_id': fn_room
};