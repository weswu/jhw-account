<template>
  <div id="login" >
    <div class="header"><img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png" alt=""> </div>
    <h3 class="tagline">登入机汇网，建立企业自己的互联网销售平台</h3>
    <div class="wrapper">
      <div class="quick_login">
        <div class="quick">
          <a class="qq_button submit_button" href="javascript:;" @click="qqLogin"><span class="qq_button_text">QQ登录</span></a>
          <a class="weixin_button submit_button" href="javascript:;" @click="wxLogin"><span class="weixin_button_text">微信登录</span></a>
        </div>
        <div class="login">
          <!-- 账号登录 -->
          <div class="account" v-if="!mobileShow">
            <input class="text header_login_text_box" type="text" name="username" v-model="model.username" @keyup.enter="submit" placeholder="账号">
            <input class="text header_login_text_box" type="password" name="password" v-model="model.password" @keyup.enter="submit" placeholder="密码" >
          </div>
          <!-- 手机登录 -->
          <div class="mobile" v-if="mobileShow">
            <input class="text header_login_text_box" type="text" name="mobile" v-model="phone" @keyup.enter="submit" placeholder="手机号">
          </div>
          <input class="text header_login_text_box imgCode" type="text" name="randCode" v-model="model.randCode" @keyup.enter="submit" placeholder="验证码">
          <img :src="'http://www.jihui88.com/veriImg'+verifyPic" @click="refreshCode"/>

          <div class="mobile" v-if="mobileShow">
            <input class="text header_login_text_box imgCode" type="text" name="mobileCode" v-model="mobileCode" @keyup.enter="submit" placeholder="短信验证码">
            <input class="mobileCode" @click="getCode" type="button" value="发送验证码">
          </div>
          <!-- 提交 -->
          <div class="submit">
            <span v-if="!mobileShow" @click="mobileToggle(true)">手机快捷登录</span><span v-if="mobileShow" @click="mobileToggle(false)">账号登录</span>
            <input class="submit_button primary_button" type="submit" value="登录" @click="submit">
          </div>
        </div>
      </div>
    </div>
    <!-- weixin -->
    <div class="oAuth__content" v-if="wxShow">
      <a @click="wxShow=!wxShow" href="javascript:;"  class="iconfontyyy2 icon_close">&#xe66d;</a>
      <div id="wxlogin_container"></div>
    </div>
    <div class="footer">
      没有帐号？<a href="javascript:;" class="singup-btn" @click="singup">开始免费注册 ！</a>
    </div>
  </div>

</template>

<script>
export default {
  data　() {
    return {
      // 账号登录
      model: {
        username: '',
        password: '',
        randCode: '',
        type: '0',
        redirectURL: '',
        appId: '',
        state: null,
        lanId: '1'
      },
      verifyPic: '',
      // wx
      wxShow: false,
      // 手机
      mobileShow: false,
      state: '',
      mobileCode: '',
      phone: ''
    }
  },
  created () {
    this.openid = this.getUrlParam('openid') || ''
    this.type = this.getUrlParam('type') || ''
    this.oauthtype = this.getUrlParam('oauthtype') || ''
    this.model.redirectURL = this.getUrlParam('redirectURL') || ''
    this.model.redirectUrl = this.getUrlParam('redirectUrl') ? (this.getUrlParam('redirectUrl') + (location.hash ? location.hash : '')) : null
  },
  methods: {
    submit (e) {
      if (this.mobileShow) {return this.mobileSubmit()}
      var ctx = this
      if (this.model.randCode === '') { return alert('请输入验证码') }
      if (this.model.username === '') { return alert('请输入账号') }
      if (this.model.username.length < 4) { return alert('账号长度不小于4！') }
      if (this.checked) {this.model.type = '1'} else {this.model.type = '0', this.subusername = ''}
      var eTar = e.currentTarget
      $(e.currentTarget).html('登录中...')
      setTimeout(function() {
        $(eTar).html('登录')
      }, 5000)
      $.ajax({
        url: '/rest/api/user/login',
        type: 'post',
        data: {
          model: JSON.stringify(this.model)
        },
        success: function(res) {
          if (res.success) {
            window.location.href =ctx.model.redirectUrl? ctx.model.redirectUrl : ctx.model.redirectURL? (ctx.model.redirectURL+(ctx.model.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : "http://www.jihui88.com/member/index.html"
          } else{
            alert(res.msg)
            ctx.refreshCode()
          }
          $(e.currentTarget).html('登录')
        }
      })
    },
    // 手机登录
    mobile () {
      var ctx = this
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state', // 请求state(必填)
          redirectUrl: this.model.redirectURL   // 登录成功后的跳转地址
        },
        success: function(res) {
          if (res.success) {
            ctx.state = res.attributes.data + '_' + '0' + '_cellphone';
          }
        }
      })
    },
    // 获取验证验
    getCode (e) {
      let test = /^1[3|4|5|7|8][0-9]\d{4,8}$/
      if (!test.test(this.phone)) { return alert('不是有效的手机号码！') }
      if (this.model.randCode === '') { return alert('请输入图片验证码') }
      this.countdown = 60
      this.setTime(e.currentTarget)
      $.ajax({
        type: 'post',
        url: '/rest/api/user/sendCellphone',
        data: {
          cellphone: this.phone,   // 手机号码(必填)
          state: this.state,    // 第一步里获取到的state参数(必填)
          randCode: this.model.randCode  // 图像验证码(必填)
        },
        success: function(res){
          if (res.success) {
          } else {
            ctx.countdown = 0
            alert(res.msg)
          }
        }
      });
    },
    // 登录
    mobileSubmit () {
      if (this.phone === '' || this.mobileCode === '') {
        return alert('请填写手机号码和验证码')
      }
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          state: this.state,    // 第一步里获取到的state参数(必填)
          code: this.mobileCode,    // 手机验证码(必填)
          redirectUrl: this.model.redirectURL  // 登录成功后的跳转地址
        },
        success: function(res) {
          if (res.success) {
            window.location.href =ctx.model.redirectUrl? ctx.model.redirectUrl : ctx.model.redirectURL? (ctx.model.redirectURL+(ctx.model.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : "http://www.jihui88.com/member/index.html"
          } else{
            alert(res.msg)
          }
        }
      })
    },
    mobileToggle (e) {
      if (e) {
        this.mobile()
      }
      this.mobileShow = e
    },
    setTime: function(tar) {
      var ctx = this
      if (this.countdown == 0) {
        $(tar).attr("disabled", false)
        $(tar).val("发送验证码")
        this.countdown = 60
        return false
      } else {
        $(tar).attr("disabled", true)
        $(tar).val("重新发送(" + this.countdown + ")")
        this.countdown --
      }
      setTimeout(function() {
        ctx.setTime(tar)
      },1000)
    },
    // qq登录
    qqLogin: function() {
      var ctx = this;
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state',
          redirectUrl: ctx.model.redirectUrl
        },
        success: function(res) {
          if (res.success) {
            window.location.href = 'https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101370473&response_type=code&state=' + res.attributes.data + '_' + ctx.model.type + '_qq' + "&scope=&display=&redirect_uri=" +
              encodeURIComponent("http://www.jihui88.com/rest/api/user/oauth")
          }
        }
      })
    },
    // 微信登录
    wxLogin () {
      var ctx = this
      this.wxShow = true
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state',
          redirectUrl: ctx.model.redirectUrl
        },
        success: function(res) {
          if (res.success) {
            new WxLogin({
              id: 'wxlogin_container',
              appid: 'wx308c58370e47720c',
              scope: 'snsapi_login',
              redirect_uri: encodeURIComponent('http://www.jihui88.com/rest/api/user/oauth'),
              state: res.attributes.data + '_' + ctx.model.type + '_weixin',
              style: 'black',
              href: ''
            })
          }
        }
      })
    },
    // 注册
    singup () {
      window.open('http://www.jihui88.com/member/register.html?redirectUrl= + this.model.redirectURL')
    },
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    getUrlParam (name) {
      let url = location.search //获取url中"?"符后的字串
      if (url.indexOf("?") !== -1) {
        let str = url.substr(1)
        let strs = str.split("&")
        for(let i = 0; i < strs.length; i ++) {
          if (strs[i].split("=")[0] === name) {
            return strs[i].split("=")[1]
          }
        }
      }
    }
  }
}
</script>

<style lang="css">
@font-face {
  font-family: 'iconfont2';  /* project id 249974 */
  src: url('http://at.alicdn.com/t/font_249974_gh24o79n21paxlxr.eot');
  src: url('http://at.alicdn.com/t/font_249974_gh24o79n21paxlxr.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_249974_gh24o79n21paxlxr.woff') format('woff'),
  url('http://at.alicdn.com/t/font_249974_gh24o79n21paxlxr.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_249974_gh24o79n21paxlxr.svg#iconfont') format('svg');
}
.iconfontyyy2 {
    font-family:"iconfont2" !important;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
* {margin:0;padding:0;text-decoration:none;list-style:none;font-family:"Microsoft Yahei","PingHei","Lucida Grande","Lucida Sans Unicode";}
body{margin:0}
#login{max-width:650px;margin:0 auto;border:1px solid #ddd;position:relative}
.header{text-align:center;margin:0 auto;margin-top:25px}
.tagline{font-size:14px;font-weight:400;color:#999;text-align:center;padding:10px}
.wrapper{padding:32px;height:179px}
.quick_login{position:relative;overflow:hidden}
.quick_login .quick:after{content:"";width:1px;position:absolute;top:0;bottom:0;background-color:#e2e2e2;left:50%}
.quick_login .login,.quick_login .quick{float:left;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:50%}
.quick_login .login{position:relative;padding-left:32px}
/* footer */
.footer{padding:12px;font-size:12px;color:#999;text-align:center;border-top:1px solid #e2e2e2;background:#f7f7f7}
.singup-btn{color:#37b;text-decoration:none}
/* 快捷登录 */
.submit_button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;transition:opacity ease-in-out .1s,color ease-in-out .1s,background-color ease-in-out .1s,border-color ease-in-out .1s;border-radius:3px;box-shadow:0 1px 1px 0 rgba(200,200,200,.2);display:inline-block;font-weight:500;outline:0;padding:3px 7px 4px 7px;text-align:center;text-decoration:none;cursor:pointer;margin-bottom:20px;font-size:16px;padding:8px 16px;width:270px;color:#fff}
.qq_button{background-color:#28B7F7}
.qq_button:after{width:24px;height:24px;background-size:24px 24px;background-image:url(/static/images/QQ.png);float:left;content:"";display:inline-block}
.weixin_button{background-color:#05D02F}
.weixin_button:after{width:24px;height:24px;background-size:24px 24px;background-image:url(/static/images/weixin.png);float:left;content:"";display:inline-block}
.header_login_text_box{width:100%;font-size:15px;line-height:1.4;padding:3px 5px;height:15px;padding-left:8px;padding-right:8px;min-height:32px;margin-bottom:15px;background-color:#EEE}
/* 微信二维码 */
.oAuth__content{position:absolute;top:0;width:100%;background:#fff;text-align:center;min-height:404px}
.icon_close{font-size:32px;color:#ddd;transition:all .3s ease 0s;-moz-transition:all .3s ease 0s;-webkit-transition:all .3s ease 0s;-o-transition:all .3s ease 0s;position:absolute;right:10px}
.icon_close:hover{color:#aaa}
/* 验证码 */
.login img,.mobileCode{float:right;padding:5px;cursor:pointer}
.imgCode{width:50%}
/* 输入框/按钮 */
input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;min-height:27px;background:#fff;outline:0;border:1px solid #e2e2e2;border-radius:3px;box-shadow:inset 0 1px 1px rgba(200,200,200,.3);-webkit-transition:border-color .2s;transition:border-color .2s;-webkit-transition:border-color .2s 180ms ease-in-out 0s;-o-transition:border-color .2s 180ms ease-in-out 0s;transition:border-color .2s 180ms ease-in-out 0s}
.submit span{font-size:12px;color:#666;line-height:1.1;cursor:pointer;padding-top:10px;display:inline-block}
.primary_button{float:right;font-size:15px;line-height:1.1;background:#ff6700;border:1px solid #ff7111;width:100px;margin-bottom:0}
.submit_button_disabled{opacity:.5;pointer-events:none}

</style>
