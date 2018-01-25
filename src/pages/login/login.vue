<template>
<div id="JH_wrap">
  <div id="header">
    <div id="login">
      <img src="static/images/logo.png" alt="机汇网" class="logo" />
      <h1>登入机汇网，建立企业自己的互联网销售平台</h1>
      <div class="login">
        <div class="title"><span v-if="addBind==='1'">第三方账号绑定</span><span v-else>会员登录</span></div>
        <div class="content">
          <!-- 账号登录 -->
          <ul v-if="addBind!=='1' && !mobileShow">
            <li class="item01"><input name="username" v-model="model.username" @keyup.enter="submit" type="text" placeholder="请输入账号/公司账号"></li>
            <transition name="fade">
              <li class="item01" v-if="checked"><input name="subusername" v-model="model.subusername" @keyup.enter="submit" type="text" placeholder="请输入员工账号"></li>
            </transition>
            <li class="item02"><input name="password" v-model="model.password" @keyup.enter="submit" type="password" placeholder="请输入密码"></li>
          </ul>
          <!-- 手机登录 -->
          <ul v-if="addBind!=='1' && mobileShow">
            <li class="item01"><input name="username" v-model="phone" @keyup.enter="submit" type="text" placeholder="请输入手机号"></li>
          </ul>

          <ul v-if="addBind!=='1'">
            <li class="item03">
              <input type="text" id="model-randCode" name="randCode" v-model="model.randCode" @keyup.enter="submit" class="fl yzm" placeholder="请输入验证码">
              <img :src="'http://www.jihui88.com/veriImg'+verifyPic"  @click="refreshCode"/><a class="refreshCode" @click="refreshCode" href="javascript:;">换一张？</a>
            </li>
            <li class="item03" v-if="mobileShow">
              <input type="text" name="mobileCode" v-model="mobileCode" @keyup.enter="submit" class="fl yzm" placeholder="请输入短信验证码">
              <input class="mobileCode" @click="getCode" type="button" value="发送验证码">
            </li>
            <li class="item04"><input type="checkbox" v-model="checked"><label @click="check">使用员工账号登录</label>
              <a href="javascript:;" class="fr" v-if="!mobileShow" @click="mobileToggle(true)">手机登录</a>
              <a href="javascript:;" class="fr" v-if="mobileShow" @click="mobileToggle(false)">账号登录</a>
              <span class="to">|</span>
              <a href="forget_password.html" class="fr">忘记密码</a>
            </li>
            <li class="item05"><button id="submit" type="button" class="submit" @click="submit">登录</button></li>
            <li class="item06"><a href="register.html" class="fr">免费注册</a></li>
            <li class="item07">第三方账号登录</li>
          </ul>
          <ul>
            <li class="item08">
              <a @click="qqLogin" href="javascript:;" class="iconfontyyy2 icon_qq">&#xe65b;</a>
              <a @click="wxLogin" href="javascript:;" class="iconfontyyy2 icon_weixin">&#xe619;</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="oAuth__content" v-if="weixin">
        <a @click="close" href="javascript:;"v-if="addBind!=='1'" class="iconfontyyy2 icon_close">&#xe66d;</a>
        <div v-if="addBind==='1'" class="addBind-wx">微信账号绑定</div>
        <div v-if="addBind==='1'" class="addBind-wx-2">请使用微信扫描二维码绑定账号</div>
        <div id="wxlogin_container"></div>
      </div>
      <UserBind :openid="openid" :type="type" :oauthtype="oauthtype"  :redirectURL="model.redirectURL"  :backURL="backURL" v-if="openid !== ''"></UserBind>
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
      oauthtype: '',
      // 手机
      mobileShow: false,
      state: '',
      mobileCode: '',
      phone: '',
      backURL: ''
    }
  },
  components: {
    UserBind
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
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.bindType === 'weixin') {
        this.wxLogin()
      } else if (this.bindType === 'qq') {
        this.qqLogin()
      }
    })
  },
  methods: {
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    check () {
      this.checked = !this.checked
    },
    submit (e) {
      if (this.mobileShow) {return this.mobileSubmit()}
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
    // qq登录
    qqLogin: function() {
      var ctx = this;
      $.ajax({
        url: '/rest/api/user/oauth',
        data: {
          requestType: 'state',
          redirectURL: ctx.model.redirectURL,
          scope: ctx.scope,
          appId: ctx.appId,
          addBind: ctx.addBind,
          backURL: ctx.backURL
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
          requestType: 'state',
          redirectURL: ctx.model.redirectURL,
          scope: ctx.scope,
          appId: ctx.appId,
          addBind: ctx.addBind,
          backURL: ctx.backURL
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
    },
    // 获取验证验
    getCode (e) {
      var ctx = this
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
            ctx.refreshCode()
          }
        }
      });
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
    // 手机登录
    mobileSubmit () {
      var ctx = this
      if (this.phone === '' || this.mobileCode === '') {
        return alert('请填写手机号码和验证码')
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
          backURL: this.backURL  // 登录成功后的跳转地址
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
.addBind-wx{position: absolute; left: 0px; top: 0px; height: 40px; width: 100%; padding-top: 30px; font-size: 20px; z-index: 99999; background-color:#fff;}
.addBind-wx-2{position: absolute; bottom: 0; left: 0; z-index: 9999; background-color: #fff; width: 100%; height: 50px;}
.item04 .to{float: right;color: #999;padding: 0 5px}
#login .content li.item03 .mobileCode{ float: right; width: 33%;background:none;cursor: pointer;}
</style>
