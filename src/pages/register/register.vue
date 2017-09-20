<template>
<div id="JH_wrap">
  <div id="JH_in">
    <div id="head">
      <div class="title">
        <img src="static/images/logo2.jpg" alt="机汇网" />
        <div class="title_mid">我们已累计为 <span>{{count}}</span>个企业 提供服务</div>
        <div class="title_right">已有账号，<a href="login.html">马上登录 <span>></span></a></div>
      </div>
      <div id="register-success" v-if="reSuccess">
        申请成功！验证邮箱后即可登录后台&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="toMail">[登录我的邮箱]</a>
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
            <input v-model="model.username" @change="valiUsername" name="username" type="text" class=" " placeholder="请设置机汇网账号">
            <div class="tip">
              <em></em> 输入值长度不小于4！
            </div>
            <span class="error" v-if="usernameError.length > 1">
              <span class="error-icon">！</span>{{usernameError}}
            </span>
          </li>
          <li class="item04">
            <input v-model="model.cellphone" @change="valiCellphone" type="text" class=" " placeholder="请输入手机号码">
            <span class="tip2">+86</span>
            <div class="tip">
              <em></em> 输入正确格式手机号！
            </div>
            <span class="error" v-if="phoneError.length > 1">
              <span class="error-icon">！</span>{{phoneError}}
            </span>
          </li>
          <li class="item05">
            <input v-model="model.imgCode" name="imgCode" type="text" class=" " placeholder="验证码">
            <img :src="'http://www.jihui88.com/veriImg'+verifyPic" @click="refreshCode"/>
            <a class="refreshCode" href="javascript:;" @click="refreshCode">换一张？</a>
            <div class="tip">
              <em></em> 输入验证码！
            </div>
          </li>
          <li class="item06">
            <input v-model="model.randCode" name="randCode" type="text" class="randCode" placeholder="短信验证码">
            <input class="refreshCellphoneCode" @click="refreshCellphoneCode" type="button" id="btn" value="发送验证码">
            <div class="tip">
              <em></em> 输入手机验证码！
            </div>
          </li>
          <li class="item07">
            <input v-model="model.email" @change="valiEmail" name="email" type="text" class=" " placeholder="E-mail">
            <div class="tip">
              <em></em> 输入正确邮箱！
            </div>
            <span class="error" v-if="emailError.length > 1">
              <span class="error-icon">！</span>{{emailError}}
            </span>
          </li>
          <li class="item08">
            <input v-model="model.password" name="password" type="password" class=" " placeholder="设置您的登录密码">
            <div class="tip">
              <em></em> 输入您的登录密码！
            </div>
          </li>
          <li class="item09">
            <input v-model="model.rePassword" name="password" value="" type="password" class=" " placeholder="请再次输入密码">
            <div class="tip">
              <em></em> 请再次输入密码！
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
      reSuccess: false,
      verifyPic: '',
      usernameError: '',
      emailError:'',
      phoneError: '',
      model: {
        username: '',
        domain: 'jihui88.com'
      }
    }
  },
  created () {
    this.countAjax()
  },
  methods: {
    valiUsername () {
      var ctx = this
      $.ajax({
        type: 'get',
        url: '/rest/api/user/validate?vali-username=' + this.model.username,
        success: function(res) {
          if (res.success) {
            ctx.usernameError = ''
          } else {
            ctx.usernameError = res.msg
          }
        }
      })
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
            ctx.emailError = res.msg
          }
        }
      })
    },
    valiCellphone () {
      let phone = /^1[3|4|5|7|8][0-9]\d{4,8}$/
      if (phone.test(this.model.cellphone)) {
        this.phoneError = ''
      } else {
        this.phoneError = '输入正确格式手机号'
      }
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
        url: '/user/vericode',
        data: {
          randCode: this.model.imgCode,
          cellphone: this.model.cellphone
        },
        success: function (response) {
          if (response.success) {

          } else {
            ctx.countdown = 0
            alert(response.msg)
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
    submit () {
      $.ajax({
        type: 'get',
        url: '/user/member_count',
        data: {},
        success: function(result) {
          window.clearInterval(ctx.t1)
          ctx.t2 = window.setInterval('ctx.remainTime(parseInt(' + result.attributes.data + '))', 50)
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
    remainTime (s) {
      if (this.count < s) {
        this.count = count + 399
      }else{
        this.count = s
        window.clearInterval(this.t2)
      }
    },
    countAjax () {
      var ctx = this
      this.t1 = window.setInterval('this.remainTime(50000)', 100)
      $.ajax({
        type: 'get',
        url: '/user/member_count',
        data: {},
        success: function(result) {
          window.clearInterval(ctx.t1)
          ctx.t2 = window.setInterval('ctx.remainTime(parseInt(' + result.attributes.data + '))', 50)
        }
      })
    }
  }
}
</script>
<style>
  #register-success{
    border: 1px solid #eee;
    background: #fbfbfb;
    padding: 20px;
    width: 36%;
    margin: 20px auto 0 auto;
    color: #999;
    font-size: 12px;
  }
  #register-success a{
    color: #777
  }
  #register-success a:hover{
    color: #444
  }
  .error{
    color: #999;
    padding-left: 10px;
  }
  .error-icon{
    color: #f00
  }
</style>
