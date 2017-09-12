<template>
  <div class="hello">
    <h1>欢迎来到{{roomId}}号房间</h1>
  </div>
</template>

<script>
  import axios from '../axios'
  import NProgress from 'nprogress'
  export default {
    name: 'hello',
    data () {
      return {
        roomId: this.$route.params.roomId
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
          console.log(res)
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
