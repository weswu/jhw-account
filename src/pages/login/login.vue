<template>
  <div :class="isMobile?'userAgent':''">
    <div class="header">
      <div class="wapper">
        <img src="http://www.jihui88.com/member/static/images/logo2.jpg" alt="">
      </div>
    </div>
    <div class="content">
      <div class="wapper">
        <div class="form">
          <img src="http://www.jihui88.com/member/static/images/f-logo.png" alt="" class="logo">
          <div class="f-init" v-if="page ==='init' || page ==='weixin' || page ==='qq'">
            <a @click="page='login'" href="javascript:;" class="f-btn">手机号／账号 登录</a>
            <a @click="page='register'" href="javascript:;" class="f-btn">注册</a>
            <div class="other">
              <div class="other-text">
                <span>其他登录方式</span>
              </div>
              <div class="other-icon">
                <a @click="wxLogin" href="javascript:;" class="f-icon" v-if="!isAppMobile"></a>
                <a @click="qqLogin" href="javascript:;" class="f-icon icon-wx" v-if="!isAppMobile"></a>
                <a @click="page='mobile'" href="javascript:;" class="f-icon icon-mobile"></a>
                <br/>
                <span v-if="!isAppMobile">微信</span><span v-if="!isAppMobile">QQ</span><span>快捷登录</span>
              </div>
            </div>
          </div>

          <div class="f-login" v-if="page ==='login'">
            <div class="f-input">
              <input class="username" name="username" v-model="model.username" @keyup.enter="submit" type="text" placeholder="手机号／账号"/>
              <input class="username" name="subusername" v-model="model.subusername" @keyup.enter="submit" type="text" placeholder="请输入员工账号" v-if="checked"/>
              <div class="">
                <input class="password username" name="password" v-model="model.password" @keyup.enter="submit" type="password" placeholder="请输入密码"/>
                <a class="forget-password" target="_blank" href="http://www.jihui88.com/member/forget_password.html">重设密码</a>
              </div>
              <div class="">
                <input type="text" name="randCode" v-model="model.randCode" @keyup.enter="submit" placeholder="填写验证码">
                <img class="veriImg" :src="'http://www.jihui88.com/alphveriImg'+verifyPic"  @click="refreshCode"/>
              </div>
            </div>
            <div class="f-checkbox">
              <input type="checkbox" v-model="checked" hidden>
              <label @click="check">
                <span class="f-checkout-select" v-if="!checked"></span>
                <span class="f-checkout-select select" v-if="checked"></span>使用员工账号登录
              </label>
            </div>
            <button type="button" class="submit" @click="submit">登录</button>
          </div>
          <!-- 手机登录 -->
          <div class="f-register" v-if="page ==='register'||page ==='mobile'">
            <div class="f-input">
              <input :class="page==='register'?'username':''" name="phone" v-model="p.phone" @keyup.enter="registerMobile" type="text" placeholder="手机号"/>
              <input class="password" name="password" v-model="p.password" @keyup.enter="registerMobile" type="password" placeholder="设置登录密码，不少于6位" v-if="page ==='register'"/>
            </div>
            <button type="button" class="submit" @click="registerMobile"><span v-if="page ==='register'">注册</span><span v-if="page ==='mobile'">登录</span></button>
          </div>

          <div class="f-message" v-if="page ==='message'||page ==='mobileLogin'">
            <div class="tip">
              为了安全，我们会向你的手机<br/>发送短信校验码
            </div>
            <div v-if="!isCode">
              <input class="randCode" type="text" name="randCode" v-model="model.randCode" @keyup.enter="mobileSubmit" placeholder="图片验证码">
              <img class="veriImg" :src="'http://www.jihui88.com/alphveriImg'+verifyPic"  @click="refreshCode" />
            </div>
            <div v-if="isCode">
              <input type="text" name="mobileCode" v-model="mobileCode" @keyup.enter="mobileSubmit" placeholder="短信验证码" >
              <input class="mobileCode" @click="getCode" type="button" :value="countText">
            </div>


            <button type="button" class="submit" @click="getCode" v-if="!isCode">发送手机短信验证码</button>
            <button type="button" class="submit" @click="mobileSubmit" v-if="isCode"><span v-if="page ==='message'">注册</span><span v-if="page ==='mobileLogin'">登录</span></button>
          </div>

          <a @click="page='init'" href="javascript:;" class="back-other" v-if="page !=='init' && page !== 'weixin'">返回<span v-if="page ==='login'||page ==='mobile'||page ==='mobileLogin'">其他</span>登录</a>
        </div>
      </div>
    </div>
    <div class="alert" v-if="page === 'weixin' || page === 'qq'">
      <div class="head">
        <span v-if="page === 'weixin'">微信</span><span v-if="page === 'qq'">QQ</span>登录<img src="http://www.jihui88.com/member/static/images/f-x.png" alt="" class="close" @click="page='init'">
      </div>
      <div class="container">
        <div id="wxlogin_container" v-if="page === 'weixin'"></div>
        <iframe v-if="page === 'qq'" :src="qqUrl"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data　() {
    return {
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
      checked: false,
      verifyPic: '',
      // 用户绑定页面数据
      openid: '',
      type: '',
      oauthtype: '',
      // 手机
      state: '',
      isCode: false,
      mobileCode: '',
      backURL: '',
      countdown: 60,
      countText: '重新发送短信',
      // 注册
      page: 'init',
      p: {
        phone: '',
        password: ''
      },
      // qq
      qqUrl: '',
      isMobile: false,
      isAppMobile: false
    }
  },
  created () {
    this.openid = this.getUrlParam('openid') || ''
    this.type = this.getUrlParam('type') || ''
    this.oauthtype = this.getUrlParam('oauthtype') || ''
    // 后端控制的重定向（用于授权登录），前端无需关注
    this.model.redirectURL = this.getUrlParam('redirectURL') || ''
    // 前端控制的返回页面
    this.backURL = this.getUrlParam('backURL') ? (this.getUrlParam('backURL') + (location.hash ? location.hash : '')) : null
    this.scope = this.getUrlParam('scope') ? this.getUrlParam('scope') : null
    this.appId = this.getUrlParam('appId')
    // 为某账号绑定第三方
    this.addBind = this.getUrlParam('addBind')
    // 绑定类型
    this.bindType = this.getUrlParam('bindType')

    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.isMobile = true
      this.isAppMobile = true
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.bindType === 'weixin') {
        this.wxLogin()
      } else if (this.bindType === 'qq') {
        this.qqLogin()
      }
    })
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.redirect === true) {
        window.location.href = ctx.backURL ? ctx.backURL : ctx.model.redirectURL ? (ctx.model.redirectURL + (ctx.model.redirectURL.indexOf('?') > -1 ? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : 'http://www.jihui88.com/member/index.html'
      }
    }, false)
    var ctx = this
    window.onresize = () => {
      return (() => {
        if (document.body.clientWidth < 400) {
          ctx.isMobile = true
        } else {
          ctx.isMobile = false
        }
      })()
    }
  },
  methods: {
    // 1.手机注册
    registerMobile () {
      let test = /^1[3|4|5|7|8][0-9]\d{4,8}$/
      if (!test.test(this.p.phone)) { return alert('不是有效的手机号码！') }
      if (this.page === 'register'){
        if (this.p.password.length < 6) { return alert('登录密码，不少于6位！') }
        this.page = 'message'
      } else {
        this.page = 'mobileLogin'
      }
      this.model.randCode = ''
      this.mobile()
    },
    // 切换到手机，获取state
    mobile () {
      var ctx = this
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state', // 请求state(必填)
          redirectURL: ctx.model.redirectURL,
          scope: ctx.scope,
          appId: ctx.appId,
          backURL: ctx.backURL   // 登录成功后的跳转地址
        },
        success: function(res) {
          if (res.success) {
            ctx.state = res.attributes.data + '_' + '0' + '_cellphone';
          }
        }
      })
    },
    // 获取验证验
    getCode () {
      var ctx = this
      if (this.model.randCode === '') { return alert('请输入图片验证码') }
      if (!this.isCode) {
        this.isCode = true
      }
      $.ajax({
        type: 'post',
        url: '/rest/api/user/sendCellphone',
        data: {
          cellphone: this.p.phone,   // 手机号码(必填)
          state: this.state,    // 第一步里获取到的state参数(必填)
          randCode: this.model.randCode  // 图像验证码(必填)
        },
        success: function(res){
          if (res.success) {
            ctx.setTime()
          } else {
            if (res.msg !== '请60秒后再刷新') {
              ctx.isCode = false
            } else {
              ctx.countdown = 60
              ctx.refreshCode()
              ctx.model.randCode = ''
            }
            alert(res.msg)
          }
        }
      });
    },
    // 手机登录
    mobileSubmit () {
      var ctx = this
      if (this.mobileCode === '') {
        return alert('请填写短信验证码')
      }
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          state: this.state,    // 第一步里获取到的state参数(必填)
          code: this.mobileCode,    // 手机验证码(必填)
          redirectURL: this.model.redirectURL,
          scope: ctx.scope,
          quick:'01',
          appId: ctx.appId,
          backURL: this.backURL,  // 登录成功后的跳转地址
          username: this.p.phone,
          password: this.p.password
        },
        success: function(res) {
          if (res.success) {
            if (res.attributes && res.attributes.data){
              window.location.href=res.attributes.data
              return
            }
            window.location.href = ctx.backURL ? ctx.backURL : ctx.model.redirectURL ? (ctx.model.redirectURL + (ctx.model.redirectURL.indexOf('?') > -1 ? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : 'http://www.jihui88.com/member/index.html'
          } else{
            alert(res.msg)
            ctx.refreshCode()
          }
        }
      })
    },
    // 2.登录
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    check () {
      this.checked = !this.checked
    },
    submit (e) {
      var ctx = this
      if (this.model.username === '') { return alert('请输入账号') }
      if (this.model.randCode === '') { return alert('请输入验证码') }
      if (this.model.password === '') { return alert('请输入密码') }
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
            // 判断是否存在backURL? [说明是普通跳转] : [是否存在redirectUrl? 是[[说明是授权登录，需要跳转到redirectURL地址，并带上code与state参数]] : 否 [[跳转到用户后台首页]] ]
            window.location.href =ctx.backURL? ctx.backURL : ctx.model.redirectURL? (ctx.model.redirectURL+(ctx.model.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : "http://www.jihui88.com/member/index.html"
          } else{
            alert(res.msg)
            ctx.refreshCode()
          }
          $(e.currentTarget).html('登录')
        }
      })
    },
    pcLogin(skey, callback) {
      var url = "http://pc.jihui88.com/pc/skey.html?skey=" + skey;
      var $iframe = $('<iframe src=""></iframe>')
      $('body').append($iframe)
      $iframe.attr('src', url)
      setTimeout(function() { $iframe.remove(); if (callback) callback.call(this) }, 1000)
    },
    // 微信登录
    wxLogin () {
      var ctx = this
      this.page = 'weixin'
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state',
          redirectURL: ctx.model.redirectURL,
          scope: ctx.scope,
          appId: ctx.appId,
          addBind: ctx.addBind,
          backURL: ctx.backURL,
          quick: ctx.addBind ? '00' :'01'
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
    // qq登录
    qqLogin: function() {
      var ctx = this;
      this.page = 'qq'
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state',
          redirectURL: ctx.model.redirectURL,
          scope: ctx.scope,
          appId: ctx.appId,
          addBind: ctx.addBind,
          backURL: ctx.backURL,
          quick: ctx.addBind ? '00' :'01'
        },
        success: function(res) {
          if (res.success) {
            ctx.qqUrl = 'https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101370473&response_type=code&state=' + res.attributes.data + '_' + ctx.model.type + '_qq' + "&scope=&display=&redirect_uri=" +
              encodeURIComponent("http://www.jihui88.com/rest/api/user/oauth?backURL=http://www.jihui88.com/member/qqRedirect.html")
          }
        }
      })
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
    },
    setTime: function() {
      var ctx = this
      if (this.countdown == 0) {
        this.countText = '获取短信验证码'
        this.countdown = 60
        return false
      } else {
        this.countText = '00:' + this.countdown
        this.countdown --
      }
      setTimeout(function() {
        ctx.setTime()
      },1000)
    }
  }
}
</script>
<style lang="less">
  body {
    background: #fff;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  .userAgent{
    .header{
      display: none;
    }
    .content{
      background: #fff;
      .wapper{
        width: 100%;
        background: none;
      }
      .form{
        width: 100%;
        border: none;
        margin-top: 0;
      }
    }

  }
  .header{
    height: 85px;
    .wapper{
      width: 1000px;
      margin: 0 auto;
      img{
        margin-top: 15px
      }
    }
  }
  .content{
    background: #202020;
    .wapper{
      height: 600px;
      width: 1000px;
      margin: 0 auto;
      background: url(http://www.jihui88.com/member/static/images/bg.png) no-repeat 20px 85px;
    }
    // 表单
    .form{
      width: 351px;
      height: 501px;
      box-sizing: border-box;
      border: 1px solid #b9b9b9;
      border-radius: 5px;
      background: #fff;
      float: right;
      margin-top: 28px;
      text-align: center;
      font-family: '微软雅黑';
      position: relative;
      .logo{
        margin: 82px auto 28px auto;
      }
      .f-btn {
        display: block;
        margin: 8px auto;
        width: 257px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ff7333;
        border-radius: 40px;
        color: #ff7333;
        font-size: 14px;
      }
      .other{
        padding-top: 80px;
      }
      .other-text{
        text-align: center;
        line-height: 30px;
        height: 30px;
        clear: both;position: relative;
        &:after {
          content: "";
          background: url(http://www.jihui88.com/member/static/images/f-border.png) no-repeat;
          width: 85px;
          height: 3px;
          margin: 14px 0 0 -175px;
          display: inline-block;
          position: absolute;
        }
        &:before {
          content: "";
          background: url(http://www.jihui88.com/member/static/images/f-border.png) no-repeat 0 -3px;
          width: 85px;
          height: 3px;
          margin: 14px 0 0 90px;
          display: inline-block;
          position: absolute;
        }
        span {
          width: 90px;
          display: inline-block;
          background: #fff;
          color: #5b5b5b;
          font-size: 12px;
          box-sizing: border-box;
        }
      }
      .other-icon{
        padding-top: 5px;
        span{
          display: inline-block;
          width: 50px;
          color: #9b9b9b;
          font-size: 12px;
          margin: 0 5px;
        }
      }
      .f-icon{
        width: 39px;
        height: 39px;
        display: inline-block;
        margin: 0 8px;
        background: url(http://www.jihui88.com/member/static/images/f-icon.png) no-repeat;
      }
      .icon-wx{
        background-position: -39px 0;
      }
      .icon-mobile{
        background-position: -78px 0;
      }
    }

    .back-other{
      color: #666666;
      font-size: 12px;
      position: absolute;
      bottom: 17px;
      width: 100px;
      margin-left: -49px;
    }
    .back-other:hover{
      text-decoration: underline;
    }
  }
  .close{
    position: absolute;
    padding: 2px;
    right:11px;
    top:13px;
    cursor: pointer;
  }
  // 登录
  .f-login{
    width: 260px;
    margin: 0 auto;
    .f-checkbox{
      padding: 10px 0;
      text-align: left;
      font-size: 12px;
      color: #ccc;
    }
    .veriImg{
      position: absolute;
      right: 14px;
      margin-top: -31px;width: 65px;
    }
    .f-checkout-select{
      width: 10px;height: 10px;display: inline-block; margin-right: 5px;
      background: url(http://www.jihui88.com/member/static/images/checkbox-selected.png) no-repeat;
    }
    .f-checkout-select.select{
      background-position: -10px 0;
    }
  }
  // 表单
  .f-input{
    width: 260px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin: 0 auto;
    position: relative;
    input{
      border-radius: 5px;
      border:none;
      width:228px;
      height: 17px;
      padding: 10px 15px;
      outline: 0 none;
    }
    .username{
      border-bottom: 1px solid #d9d9d9;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    .forget-password{
      position: absolute;
      color: #ccc;
      font-size: 12px;
      right: 15px;
      margin-top: -26px;
    }
  }
  .submit{
    background: #ff6700;
    border-radius: 5px;
    border: 0 none;
    cursor: pointer;
    display: block;
    width: 260px;
    margin: 0 auto;
    text-align: center;
    height: 38px;
    color: #fff;
    font-size: 14px;
    transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
  }
  .submit:hover {
  	background:#ff4800;
  }

  .f-register{
    .submit{
      margin-top: 15px;
    }
  }
  .f-message{
    text-align: left;
    width: 260px;
    margin: 0 auto;
    .tip{
      font-size: 12px;
      color: #666;
      text-align: center;
      padding-bottom: 10px;
    }
    input{
      border: 1px solid #d9d9d9;
      padding: 10px 15px;
      width: 100px;
      outline: 0 none;
      margin-top: 10px;
      border-radius: 3px;
    }
    img{
      vertical-align: middle;height: 36px;
    }
    .mobileCode{
      height: 36px;
      float: right;width: 120px;
    }
    .submit{
      margin-top: 15px;
      background: #7b7b7b;
    }
    .submit:hover {
    	background:#ff6700;
    }
  }
  .alert {
    width: 800px;
    height: 600px;
    margin: -300px 0 0 -400px;
    position: fixed;
    left: 50%;
    top: 50%;
    background: #fafafa;
    z-index: 999;
    border-radius: 3px;
    box-shadow: 1px 1px 3px #aaa;
    .head{
      text-align: center;
      font-size: 12px;
      height: 39px;
      line-height: 39px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      background: linear-gradient(#fff, #ddd);
    }
    .container{
      width: 786px;
      height: 554px;
      margin: 1px auto 0 auto;
      border: 2px solid #a5a5a5;
      background: #fff;
      #wxlogin_container{
        text-align: center;
      }
      iframe{
        width: 100%;height: 554px;border: none;
      }
    }
  }
</style>
