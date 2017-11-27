<template>
<div id="JH_wrap">
  <div id="header">
    <div id="login">
      <img src="static/images/logo.png" alt="机汇网" class="logo" />
      <h1>登入机汇网，建立企业自己的互联网销售平台</h1>
      <div class="login">
        <div class="title">会员登录</div>
        <div class="content">
          <ul>
            <li class="item01"><input name="username" v-model="model.username" @keyup.enter="submit" type="text" placeholder="请输入账号/公司账号"></li>
            <transition name="fade">
              <li class="item01" v-if="checked"><input name="subusername" v-model="model.subusername" @keyup.enter="submit" type="text" placeholder="请输入员工账号"></li>
            </transition>
            <li class="item02"><input name="password" v-model="model.password" @keyup.enter="submit" type="password" placeholder="请输入密码"></li>
            <li class="item03">
              <input type="text" id="model-randCode" name="randCode" v-model="model.randCode" @keyup.enter="submit" class="fl yzm" placeholder="请输入验证码">
              <img :src="'http://www.jihui88.com/veriImg'+verifyPic"  @click="refreshCode"/><a class="refreshCode" @click="refreshCode" href="javascript:;">换一张？</a></li>
            <li class="item04"><input type="checkbox" v-model="checked"><label @click="check">使用员工账号登录</label><a href="forget_password.html" class="fr">忘记密码</a></li>
            <li class="item05"><button id="submit" type="button" class="submit" @click="submit">登录</button></li>
            <li class="item06"><a href="register.html" class="fr">免费注册</a></li>
            <li class="item07">第三方账号登录</li>
            <li class="item08">
              <a @click="qqLogin"href="javascript:;" class="iconfontyyy2 icon_qq">&#xe65b;</a>
              <a @click="wxLogin" href="javascript:;" class="iconfontyyy2 icon_weixin">&#xe619;</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="oAuth__content" v-if="weixin">
        <a @click="close" href="javascript:;"  class="iconfontyyy2 icon_close">&#xe66d;</a>
        <div id="wxlogin_container"></div>
      </div>
      <UserBind :openid="openid" :type="type" :oauthtype="oauthtype" v-if="openid !== ''"></UserBind>
    </div>
  </div>
  <div id="footer">
    <div class="foot_wrap">
      <div class="foot1">
        <a href="javascript:;" class="f_mobile"><span class="iconfontyyy2">&#xe61d;</span>移动版<em>扫一扫，安装后台APP<img src="static/images/app_ewm.jpg" border="0" /></em></a>
        <a href="/">首页</a><a href="http://www.ykzbrcw.com/company/company-show.php?id=6" target="_blank">诚征英才</a>
        <a href="http://about.jihui88.com/" target="_blank">联系我们</a>
        <a href="http://www.jihui88.com/join.html">欢迎加盟</a>
        <a href="http://xueyuan.jihui88.com/news.html" target="_blank">网络营销学院</a>
      </div>
      <div class="foot2">
        <div class="foot2_1">
          友情连接：<a href="http://www.lezicj.com" title="不粘锅，不粘锅十大品牌，不粘锅厂家，不粘锅加盟，不粘锅批发" target="_blank">不粘锅</a><a href="http://zjbqa.com/" title="不锈钢水管" target="_blank">不锈钢水管</a><a href="http://www.yzgm.net/" title="强化门" target="_blank">强化门</a><a href="http://ykjldoors.com/"
            title="金利门业" target="_blank">金利门业</a>
        </div>
        <div class="foot2_2">
          <ul class="foot2_2_left">E-mail: 2406436@qq.com　|　互联网违法和不良信息举报　|　经营许可证编号：浙B2-20100285</ul>
          <ul class="foot2_2_right">Copyright &copy; 2000-2017 机汇网</ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import UserBind from './userBind.vue'
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
      // 授权弹出框
      weixin: false,
      // 用户绑定页面数据
      openid: '',
      type: '',
      oauthtype: ''
    }
  },
  components: {
    UserBind
  },
  created () {
    this.openid = this.getUrlParam('openid') || ''
    this.type = this.getUrlParam('type') || ''
    this.oauthtype = this.getUrlParam('oauthtype') || ''
    this.model.redirectURL = this.getUrlParam('redirectURL') || ''
  },
  methods: {
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    check () {
      this.checked = !this.checked
    },
    submit (e) {
      var ctx = this
      if (this.model.randCode === '') { return alert('请输入验证码') }
      if (this.model.username === '') { return alert('请输入账号') }
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
            window.location.href = ctx.model.redirectURL? (ctx.model.redirectURL+(ctx.model.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : "http://www.jihui88.com/member/index.html"
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
    // qq登录
    qqLogin: function() {
      var ctx = this;
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state'
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
      this.weixin = true
      if (ctx.wxShow) { return false}
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state'
        },
        success: function(res) {
          if (res.success) {
            ctx.wxShow = true
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
      // 扫描后 http://www.jihui88.com/member/login.html?openid=oBtE4wSbFxg7nW95t4VfiXG4cjVo&type=0&oauthtype=weixin
    },
    close () {
      this.weixin = false
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
<style>
.fade-enter-active{transition:opacity .5s}
.fade-enter,.fade-leave-to{opacity:0}
.oAuth__content{position:absolute;top:169px;width:419px;background:#fff;text-align:center;min-height:375px}
.icon_close{font-size:32px;color:#ddd;transition:all .3s ease 0s;-moz-transition:all .3s ease 0s;-webkit-transition:all .3s ease 0s;-o-transition:all .3s ease 0s;position:absolute;right:10px}
.icon_close:hover{color:#aaa}
</style>
