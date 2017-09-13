<template>
  <div class="hello">
    <h1>欢迎来到{{roomId}}号房间</h1>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  import axios from '../axios'
  import NProgress from 'nprogress'
  import util from '../util'
  export default {
    name: 'hello',
    data () {
      return {
        roomId: this.$route.params.roomId,
        columns1: [
          {
            title: '头像',
            key: 'avatar',
            render: (h, params) => {
              return h('div', [
                h('Avatar', {
                  props: {
                    src: params.row.wxinfo.head_img_url
                  }
                })
              ])
            }
          },
          {
            title: '玩家',
            key: 'user',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.wxinfo.nickname)
              ])
            }
          },
          {
            title: '桌号',
            key: 'userNum',
            render: (h, params) => {
              return h('div', [
                h('span', params.row.user_num)
              ])
            }
          },
          {
            title: '角色',
            key: 'role',
            render: (h, params) => {
              return h('div', [
                h('span', util.filterRole(params.row.user_role))
              ])
            }
          }
        ],
        data1: []
      }
    },
    mounted () {
      this.getInfo()
      NProgress.start()
    },
    methods: {
      handleClick: function () {
        this.$toast('Hello world!')
      },
      getInfo () {
        axios({
          method: 'get',
          url: `/api/search/${this.$route.params.roomId}`
        }).then(res => {
          this.$set(this, 'data1', res.data.allPlayers)
          console.log(this.data1)
        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="scss" rel="stylesheet/scss">
h1, h2 {
  font-weight: normal;
  font-size: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
  a {
    font-size: 15px;
  }
}

a {
  color: #42b983;
}
</style>
