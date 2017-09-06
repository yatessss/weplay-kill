<template>
  <div id="app-container">
    <transition name="list" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer>
      <div >
        <router-link to="/">

          <img class="coupon-image"  alt="">
          <p >游戏</p>
        </router-link>
      </div>
      <div>
        <router-link to="/check">

          <img class="coupon-image"  alt="">
          <p >签到</p>
        </router-link>
      </div>
      <div >
        <router-link to="/ranking">

          <img class="coupon-image"  alt="">
          <p >积分</p>
        </router-link>
      </div>
    </footer>
  </div>
</template>


<script>
  /*eslint-disable */
  export default {
    data () {
      return {
        msg: ''
      }
    },
    mounted () {
      this.console()
    },
    methods: {
      console () {
        Function.prototype.getMultiLine = function () {
          var lines = new String(this);
          lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"))
          return lines
        }
        var string = function () {
          /*
           ██╗    ██╗███████╗██████╗  █████╗ ███╗   ██╗██╗  ██╗
           ██║    ██║██╔════╝██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝
           ██║ █╗ ██║█████╗  ██████╔╝███████║██╔██╗ ██║█████╔╝
           ██║███╗██║██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██╔═██╗
           ╚███╔███╔╝███████╗██████╔╝██║  ██║██║ ╚████║██║  ██╗
            ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
           ██╗    ██╗███████╗██████╗ ██╗      █████╗ ██╗   ██╗
           ██║    ██║██╔════╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝
           ██║ █╗ ██║█████╗  ██████╔╝██║     ███████║ ╚████╔╝
           ██║███╗██║██╔══╝  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝
           ╚███╔███╔╝███████╗██║     ███████╗██║  ██║   ██║
            ╚══╝╚══╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝

---------======  webank狼人杀协会，扫以下二维码加入  ========---------

           */
        }
        window.console.info(string.getMultiLine())
        console.log("%c    ","background: url(http://7xqch8.com1.z0.glb.clouddn.com/WechatIMG104-min.jpeg) no-repeat left center;background-size: 50% 100% ;font-size: 100px;","\n");
      }
    }
  }
</script>

<style lang="scss" type="scss" rel="stylesheet/scss">
  @import "./style/base.scss";
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all .3s ease-in-out;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(15px);
  }
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }

  ol, ul, li {
    list-style: none;
  }

  // fix Font Boosting
  p, div {
    max-height: 999999px;
  }

  a {
    text-decoration: none;
    &:link, &:visited, &:hover, &:active {
      text-decoration: none;
    }
  }

  em {
    font-style: normal;
  }

  #app-container {
    padding:0 0 100px 0;
    height: 100%;
    border-top: 2px solid #DEDEDE; /* px */
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    a {
      text-decoration: none;
    }
  }
  #app-container footer {
    border-top: 1px solid #DEDEDE; /* px */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    > div {
      flex: 1;
      img {
        display: block;
        margin: 16px auto 8px;
        /*&.sale-image {*/
        /*width: 42px;*/
        /*height: 42px;*/
        /*}*/
        /*&.coupon-image {*/
        /*width: 32px;*/
        /*height: 44px;*/
        /*}*/
        /*&.card-image {*/
        /*width: 42px;*/
        /*height: 44px;*/
        /*}*/
        /*&.discount-image {*/
        /*width: 50px;*/
        /*height: 42px;*/
        /*}*/
        /*&.order-image {*/
        /*width: 36px;*/
        /*height: 40px;*/
        /*}*/
      }
      p {
        font-size: 10px;
        color: #A7A9AE;
        text-align: center;
        margin-bottom: 2px;
        &.active {
          color: #FE9B20;
        }
      }
    }
  }
  /* ---------------  进度条的样式 -------------------*/
  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #29d;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: #29d;
    border-left-color: #29d;
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
