/**
 * Created by yatesmiao on 2017/8/6.
 */

const Sequelize = require('sequelize');
const config = require('./config');

const model = require('./model');

console.log('环境是', process.env.NODE_ENV)

let
  Pet = model.Pet,
  User = model.User;

var now = Date.now();

(async () => {
  var dog = await Pet.create({
    id: 'd-11111',
    name: '苗苗',
    gender: false,
    birth: '2008-08-08'
  });
  console.log('创建了: ' + JSON.stringify(dog));
})();

(async () => {
  var people = await User.create({
    email: 'email--------->>>1111',
    passwd: 'pass' + now.toString().split('').reverse().join(''),
    name: '苗苗',
    gender: true
  });
  console.log('创建了: ' + JSON.stringify(people));
})();


(async () => {
  var pets = await Pet.update({
    id: 'd-11111',
    name: '苗苗',
    gender: false,
    birth: '2008-08-10'
  },{
    where: {
      id: 'd-11111'
    },
    isNewRecord: true
  });
  console.log(`更新了 ${pets.length} pets:`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
  }
})();

(async () => {
  var users = await User.findAll({
    where: {
      name: 'Odie'
    }
  });
  console.log(`找到了 ${users.length} User:`);
  for (let p of users) {
    console.log(JSON.stringify(p));
  }
})();