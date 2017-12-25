<template>
  <div id="login" >
    <div class="header"><img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png" alt=""> </div>
    <h2 class="tagline">登入机汇网，建立企业自己的互联网销售平台</h2>
    <div class="wrapper">
      <div class="quick_login">
        <div class="quick">
          <a class="qq_button submit_button" href="#"><span class="qq_button_text">QQ登录</span></a>
          <a class="weixin_button submit_button" href="#"><span class="weixin_button_text">微信登录</span></a>
        </div>
        <div class="login">
          <input class="text header_login_text_box" type="text" name="email"  placeholder="账号">
          <input class="text header_login_text_box" type="password" name="password"  placeholder="密码" >
          <div class="submit">
            <span>手机号登录</span>
            <input class="submit_button primary_button" type="submit" value="登录" @click="submit">
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      Copyright © 2000-2017 机汇网
    </div>
  </div>

</template>

<script>
export default {
  data　() {
    return {
      username: ''
    }
  },
  methods: {
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
            window.location.href =ctx.model.redirectUrl? ctx.model.redirectUrl : ctx.model.redirectURL? (ctx.model.redirectURL+(ctx.model.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state ) : "http://www.jihui88.com/member/index.html"
          } else{
            alert(res.msg)
            ctx.refreshCode()
          }
          $(e.currentTarget).html('登录')
        }
      })
    }
  }
}
</script>

<style lang="css">
body{
  margin: 0
}
.footer {
    padding: 12px;
    font-size: 12px;
    color: #999;
    text-align: center;
    border-top: 1px solid #e2e2e2;
    background: #f7f7f7;
}
#login{
  max-width: 650px;
  margin: 0 auto;
  border: 1px solid #ddd
}
.header{
  text-align: center;
  margin: 0 auto;margin-top: 25px;
}
.tagline {
  font-size: 14px;
  font-weight: 400;
  color: #999;
  text-align: center;
}
.wrapper{
  padding: 32px;
}
.quick_login{
  position: relative;
  overflow: hidden;
}
.quick_login .quick:after {
    content: "";
    width: 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #e2e2e2;
    left: 50%;
}
.quick_login .quick,.quick_login .login{
  float: left;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
}
.quick_login .login{
  position: relative;
  padding-left: 32px;
}

/* 左边 */
.submit_button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    transition: opacity ease-in-out 100ms,color ease-in-out 100ms,background-color ease-in-out 100ms,border-color ease-in-out 100ms;
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgba(200,200,200,0.2);
    display: inline-block;
    font-weight: 500;
    outline: 0;
    padding: 3px 7px 4px 7px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    margin-bottom: 16px;
    font-size: 16px;
    padding: 8px 16px;
    width: 270px;
    color: #fff
}
.qq_button {
   background-color: #28B7F7;
}
.qq_button:after{
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  background-image: url(/static/images/QQ.png);
  float: left;
  content: "";
  display: inline-block;
}
.weixin_button {
   background-color: #05D02F;
}
.weixin_button:after{
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  background-image: url(/static/images/weixin.png);
  float: left;
  content: "";
  display: inline-block;
}
.header_login_text_box {
    width: 100%;
    font-size: 15px;
    line-height: 1.4;
    padding: 3px 5px;
    height: 15px;
    padding-left: 8px;
    padding-right: 8px;
    min-height: 32px;
    margin-bottom: 8px;
    background-color: #EEE;
}

/* 左边 */
input{
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
   min-height: 27px;
   background: #fff;
   outline: 0;
   border: 1px solid #e2e2e2;
   border-radius: 3px;
   box-shadow: inset 0 1px 1px rgba(200,200,200,0.3);
   -webkit-transition: border-color .2s;
   transition: border-color .2s;
   -webkit-transition: border-color .2s 180ms ease-in-out 0s;
   -o-transition: border-color .2s 180ms ease-in-out 0s;
   transition: border-color .2s 180ms ease-in-out 0s;
}
.submit span{
  font-size: 12px;color: #666;line-height: 1.1
}
.primary_button {
    float: right;
    font-size: 15px;
    line-height: 1.1;
    background: #ff6700;
    border: 1px solid #ff7111;
    width: 100px;
    margin-bottom: 0;
}
.submit_button_disabled {
    opacity: .5;
    pointer-events: none;
}
</style>
