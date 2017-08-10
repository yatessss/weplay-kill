/**
 * Created by yatesmiao on 2017/8/7.
 */
const Sequelize = require('sequelize');

const uuid = require('node-uuid');

const config = require('./config');

console.log('init sequelize...');

function generateId() {
  return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,// 指定连接的数据库类型
  pool: {
    max: 5,// 连接池中最大连接数量
    min: 0,// 连接池中最小连接数量
    idle: 10000// 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  var attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
      if (k === 'type') {
        for (let key in Sequelize) {
          if (key === 'ABSTRACT' || key === 'NUMBER') {
            continue;
          }
          let dbType = Sequelize[key];
          if (typeof dbType === 'function') {
            if (v instanceof dbType) {
              if (v._length) {
                return `${dbType.key}(${v._length})`;
              }
              return dbType.key;
            }
            if (v === dbType) {
              return dbType.key;
            }
          }
        }
      }
      return v;
    }, '  '));
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          console.log('will create entity...' + obj);
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          console.log('will update entity...');
          obj.updatedAt = now;
          obj.version++;
        }
      }
    }
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN', 'ARRAY', 'DECIMAL', 'RANGE'];

var exp = {
  defineModel: defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      console.log('db.js - sync() called');
      return sequelize.sync({ force: true });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
