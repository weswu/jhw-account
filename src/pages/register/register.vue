<template>
<div id="JH_wrap">
  <div id="JH_in">
    <div id="head">
      <div class="title">
        <img src="static/images/logo2.jpg" alt="机汇网" />
        <div class="title_mid">我们已累计为 <span>{{count}}</span>个企业 提供服务</div>
        <div class="title_right">已有账号，<a href="login.html">马上登录 <span>></span></a></div>
      </div>
      <div class="content">
        <ul>
          <li class="item01">欢迎注册机汇网</li>
          <li class="item02">
            <select v-model="model.domain" name="domain" value="jihui88.com" class=" " aria-disabled="false" aria-pressed="false">
  						 	<option value="">请选择您的需求</option>
  					        <option value="jihui88.com">全网营销(PC网站、手机网站、微传单、微分销等)</option>
  					        <option value="pc.jihui88.com">PC网站</option>
  					        <option value="sj.jihui88.com">手机网站</option>
  					        <option value="wcd.jihui88.com">微传单</option>
  					        <option value="cps.jihui88.com">微分销</option>
  					        <option value="wxapp.jihui88.com">微信小程序</option>
  					        <option value="wxshop.jihui88.com">微商城</option>
  					    </select>
          </li>
          <li class="item03">
            <input v-model="model.username" @keyup.enter="submit" @change="valiUsername" name="username" type="text" placeholder="请设置机汇网账号">
            <div class="tip">
              <em></em> 输入值长度不小于4！
            </div>
            <div class="tip error" v-if="usernameError.length > 1">
              <em></em> {{usernameError}}
            </div>
          </li>
          <li class="item04">
            <input v-model="model.cellphone" @keyup.enter="submit" type="text" placeholder="请输入手机号码">
            <span class="tip2">+86</span>
            <div class="tip">
              <em></em> 输入正确格式手机号！
            </div>
            <div class="tip error" v-if="phoneError.length > 1">
              <em></em> {{phoneError}}
            </div>
          </li>
          <li class="item05">
            <input v-model="model.imgCode" @keyup.enter="refreshCellphoneCode" name="imgCode" type="text" placeholder="验证码">
            <img :src="'http://www.jihui88.com/veriImg'+verifyPic" @click="refreshCode"/>
            <a class="refreshCode" href="javascript:;" @click="refreshCode">换一张？</a>
            <div class="tip">
              <em></em> 输入验证码！
            </div>
          </li>
          <li class="item06">
            <input v-model="model.randCode" @keyup.enter="submit" name="randCode" type="text" class="randCode" placeholder="短信验证码">
            <input class="refreshCellphoneCode" @click="refreshCellphoneCode" type="button" id="btn" value="发送验证码">
            <div class="tip">
              <em></em> 输入手机验证码！
            </div>
          </li>
          <li class="item07">
            <input v-model="model.email" @keyup.enter="submit" @change="valiEmail" name="email" type="text" placeholder="E-mail">
            <div class="tip">
              <em></em> 输入正确邮箱！
            </div>
            <div class="tip error" v-if="emailError.length > 1">
              <em></em> {{emailError}}
            </div>
          </li>
          <li class="item08">
            <input v-model="model.password" @keyup.enter="submit" name="password" type="password" placeholder="设置您的登录密码">
            <div class="tip">
              <em></em> 输入您的登录密码！
            </div>
            <div class="tip error" v-if="passwordError.length > 1">
              <em></em> {{passwordError}}
            </div>
          </li>
          <li class="item09">
            <input v-model="model.rePassword" @keyup.enter="submit" name="rePassword" type="password"  placeholder="请再次输入密码">
            <div class="tip">
              <em></em> 请再次输入密码！
            </div>
            <div class="tip error" v-if="rePasswordError.length > 1">
              <em></em> {{rePasswordError}}
            </div>
          </li>
          <li class="item10">
            <button id="submit" type="button" class="button button-primary" @click="submit">注册</button>
          </li>
          <li class="item11">
            已有账号，<a href="login.html">立即登录</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="foot">
      <p>E-mail: 2406436@qq.com　|　互联网违法和不良信息举报　|　经营许可证编号：浙B2-20100285</p>
      <p>Copyright &copy; 2000-2017 机汇网</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      count: 20000,
      verifyPic: '',
      // error
      usernameError: '',
      emailError:'',
      phoneError: '',
      passwordError: '',
      rePasswordError: '',
      model: {
        username: '',
        password: '',
        email: '',
        randCode: '',
        domain: 'jihui88.com',
        cellphone: '',
        imgCode: '',
        rePassword: ''
      }
    }
  },
  created () {
    this.countAjax()
    this.redirectUrl = this.getUrlParam('redirectUrl') || ''
  },
  computed: {
    username () {
      return this.model.username
    },
    cellphone () {
      return this.model.cellphone
    },
    email () {
      return this.model.email
    },
    password () {
      return this.model.password
    },
    rePassword () {
      return this.model.rePassword
    }
  },
  watch: {
    username (newValue, oldValue) {
      if (newValue.length < 4) {
        this.usernameError = '账号长度不小于4！'
      } else {
        this.usernameError = ''
      }
    },
    cellphone (newValue, oldValue) {
      let phone = /^1[3|4|5|7|8][0-9]\d{4,8}$/
      if (phone.test(newValue)) {
        this.phoneError = ''
      } else {
        this.phoneError = '不是有效的手机号码！'
      }
    },
    email (newValue, oldValue) {
      let email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (email.test(newValue)) {
        this.emailError = ''
      } else {
        this.emailError = '不是有效的邮箱地址！'
      }
    },
    password (newValue, oldValue) {
      if (newValue.length < 6) {
        this.passwordError = '密码长度不小于6！'
      } else if (this.model.rePassword !== '') {
        if (newValue !== this.model.rePassword) {
          this.passwordError = '两次密码不一致！'
        } else {
          this.passwordError = ''
          this.rePasswordError = ''
        }
      } else {
        this.passwordError = ''
      }
    },
    rePassword (newValue, oldValue) {
      if (newValue.length < 6) {
        this.rePasswordError = '密码长度不小于6！'
      } else if (this.model.password !== '') {
        if (newValue !== this.model.password) {
          this.rePasswordError = '两次密码不一致！'
        } else {
          this.passwordError = ''
          this.rePasswordError = ''
        }
      } else {
        this.rePasswordError = ''
      }
    }
  },
  methods: {
    valiUsername () {
      var ctx = this
      if (this.model.username.length > 4) {
        $.ajax({
          type: 'get',
          url: '/rest/api/user/validate?vali-username=' + this.model.username,
          success: function(res) {
            if (res.success) {
              ctx.usernameError = ''
            } else {
              ctx.usernameError = res.msg || ''
            }
          }
        })
      }
    },
    valiEmail () {
      var ctx = this
      $.ajax({
        type: 'get',
        url: '/rest/api/user/validate?vali-email=' + this.model.email,
        success: function(res) {
          if (res.success) {
            ctx.emailError = ''
          } else {
            ctx.emailError = res.msg || ''
          }
        }
      })
    },
    refreshCellphoneCode (e) {
      var ctx = this
      if (this.model.cellphone === '' || this.model.imgCode === '') {
        return alert('请填写手机号码和图片验证码')
      } else {
        this.countdown = 60
        this.setTime(e.currentTarget)
      }
      $.ajax({
        type: 'get',
        url: '/rest/api/user/vericode',
        data: {
          randCode: this.model.imgCode,
          cellphone: this.model.cellphone
        },
        success: function (res) {
          if (res.success) {
          } else {
            ctx.countdown = 0
            alert(res.msg)
          }
        }
      })
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
    submit (e) {
      var ctx = this
      if (this.model.username === '') { return alert('请输入注册账号') }
      if (this.model.username.length < 4) { return alert('账号长度不小于4位') }
      if (this.model.randCode === '') { return alert('手机验证码为空') }
      if (this.model.password.length < 6) { return alert('密码长度不小于6位') }
      $(e.currentTarget).html('注册中...')
      $.ajax({
        type: 'post',
        url: '/rest/api/user/register',
        data: {
          model: JSON.stringify(this.model)
        },
        success: function(res) {
          if (res.success) {
            window.location.href = ctx.redirectUrl || "http://www.jihui88.com/member/index.html"
          } else{
            alert(res.msg)
          }
          $(e.currentTarget).html('注册')
        }
      })
    },
    toMail () {
      let houzhui = this.email.split('@')[1] //后缀名
      if (houzhui.indexOf("gmail") !== -1) { //谷歌
        window.open("http://mail.google.com")
      } else if (houzhui.indexOf("hotmail") !== -1 || houzhui.indexOf("msn") !== -1) { //微软
        window.open("http://mail.live.com")
      } else {
        window.open("http://mail." + houzhui)
      }
    },
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    countAjax () {
      var ctx = this
      this.t1 = window.setInterval(function() {
        if (ctx.count < 50000) {
          ctx.count = ctx.count + 399
        } else {
          ctx.count = 50000
          window.clearInterval(ctx.t1)
        }
      }, 100)
      $.ajax({
        type: 'get',
        url: '/rest/api/user/member_count',
        data: {},
        success: function(res) {
          if(res.success) {
            ctx.t2 = window.setInterval(function () {
              if (ctx.count < res.attributes.data) {
                ctx.count = ctx.count + 399
              } else {
                ctx.count = res.attributes.data
                window.clearInterval(ctx.t2)
              }
            }, 50)
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
    }
  }
}
</script>
<style>
#register-success{border:1px solid #eee;background:#fbfbfb;padding:20px;width:36%;margin:60px auto 60px auto;color:#999;font-size:12px}
#register-success a{color:#777}
#register-success a:hover{color:#444}
#head .content li .tip.error{color:#a94442;width:50%!important;opacity:1!important}
</style>
