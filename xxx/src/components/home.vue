<template>
  <div class="home-wrap">
    <div class="avatar-wrap">
      <Avatar :src="userInfo.headimgurl" class="avatar"/>
      <p>{{userInfo.nickname}}</p>
    </div>
    <div class="btn-wrap">
      <div>
        <Button type="info" class="btn"  @click="createModalVisible = true">创建房间</Button>
      </div>
      <div>
        <Button type="success" class="btn" @click="joinModalVisible = true">加入游戏</Button>
      </div>
    </div>
    <Modal
      v-model="createModalVisible"
      title="创建房间"
      @on-ok="createOk"
      @on-cancel="createCancel">
      <Input v-model="createValue" placeholder="请输入房间人数"></Input>
    </Modal>
    <Modal
      v-model="joinModalVisible"
      title="加入游戏"
      @on-ok="joinOk"
      @on-cancel="joinCancel">
      <Input v-model="joinRoomId" placeholder="请输入房间号码" class="modal-item"></Input>
      <Input v-model="joinPlayerNum" placeholder="请输入玩家桌号" class="modal-item"></Input>
      <Select v-model="joinPlayerRole" class="modal-item">
        <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Modal>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import axios from '../axios'
  import util from '../util'
  import CONSTANT from '../../../constant'
//  import util from '../util'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        userInfo: {
          nickname: '',
          headimgurl: ''
        },
        joinModalVisible: false,
        joinPlayerRole: '',
        joinRoomId: '',
        joinPlayerNum: '',
        createModalVisible: false,
        createValue: '',
        roleList: [
          {
            value: 'role_villagers',
            label: '平民'
          },
          {
            value: 'role_seer',
            label: '预言家'
          },
          {
            value: 'role_idiot',
            label: '白痴'
          },
          {
            value: 'role_savior',
            label: '守卫'
          },
          {
            value: 'role_witch',
            label: '女巫'
          },
          {
            value: 'role_knight',
            label: '骑士'
          },
          {
            value: 'role_hunter',
            label: '猎人'
          },
          {
            value: 'role_werewolves',
            label: '狼人'
          },
          {
            value: 'role_white_werewolf',
            label: '白狼王'
          },
          {
            value: 'role_beauty_werewolf',
            label: '狼美人'
          }
        ]
      }
    },
    mounted () {
      this.getCode()
    },
    methods: {
      createOk () {
        //        this.$Message.info('点击了确定')
        axios({
          method: 'post',
          url: '/api/create',
          data: {
            room_size: this.createValue
          }
//          headers: {'Authorization': 'Bearer ' + localStorage.Authorization}
        }).then((res) => {
          this.$router.push({name: 'room', params: { roomId: res.data.room_id }})
        })
      },
      createCancel () {
      },
      joinOk () {
        axios({
          method: 'post',
          url: '/api/join',
          data: {
            room_id: this.joinRoomId,
            user_num: this.joinPlayerNum,
            user_role: this.joinPlayerRole
          }
//          headers: {'Authorization': 'Bearer ' + localStorage.Authorization}
        }).then((res) => {
          this.$router.push({name: 'room', params: { roomId: res.data.room_id }})
        })
      },
      joinCancel () {
      },
      handleClick: function () {
        this.$toast('Hello world!')
      },
      getCode () {
        NProgress.start()
        let _this = this
        console.log('获取到的code', util.getRequestParams().code)
        if (util.getRequestParams().code) {
          axios({
            method: 'get',
            url: '/api/getCode',
            params: {
              code: util.getRequestParams().code
            }
          }).then((res) => {
            NProgress.done()
            console.log('返回的数据', res)
            _this.$set(this.userInfo, 'nickname', res.data.nickname)
            _this.$set(this.userInfo, 'headimgurl', res.data.head_img_url)
            console.log(this.userInfo)
            console.log('发送成功/api/getCode')
            var token = res.headers.authorization
            window.localStorage.Authorization = token
            /* TODO 用正则优雅 */
            var tmpStr = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'))
            window.localStorage.userInfo = atob(tmpStr)
          })

          console.log('已经跳转回来')
        } else {
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CONSTANT.APPID + '&redirect_uri=' + encodeURIComponent(CONSTANT.URL + '/static/index.html') + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="scss" rel="stylesheet/scss">
  .home-wrap {
    flex: 1;
    padding: 15px 5px;
  }
  .avatar-wrap {
    padding-top: 15px;
    text-align: center;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    p {
      font-size: 20px;
    }
  }
  .btn-wrap {
    padding-top: 20px;
    text-align: center;
    div {
      margin: 30px auto;
    }
    .btn {
      width: 100px;
      height: 50px;
      font-size: 15px;
    }
  }
  .modal-item {
    margin: 10px auto;
  }

</style>
