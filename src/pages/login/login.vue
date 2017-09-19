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
            <li class="item01"><input name="username" v-model="model.username" type="text" placeholder="请输入账号/公司账号"></li>
            <transition name="fade">
              <li class="item01" v-if="checked"><input name="subusername" v-model="model.subusername" type="text" placeholder="请输入员工账号"></li>
            </transition>
            <li class="item02"><input name="password" v-model="model.password" type="password" placeholder="请输入密码"></li>
            <li class="item03">
              <input type="text" id="model-randCode" name="randCode" v-model="model.randCode" class="fl yzm" placeholder="请输入验证码">
              <img :src="'http://www.jihui88.com/veriImg'+verifyPic"  @click="refreshCode"/><a class="refreshCode" @click="refreshCode" href="javascript:;">换一张？</a></li>
            <li class="item04"><input type="checkbox" v-model="checked"><label @click="check">使用员工账号登录</label><a href="forget_password.html" class="fr">忘记密码</a></li>
            <li class="item05"><button id="submit" type="button" class="submit" @click="submit">登录</button></li>
            <li class="item06"><a href="register.html" class="fr">免费注册</a></li>
            <li class="item07">第三方账号登录</li>
            <li class="item08">
              <a href="javascript:;" class="iconfontyyy2 icon_qq">&#xe65b;</a>
              <a href="javascript:;" class="iconfontyyy2 icon_weixin">&#xe619;</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div id="footer">
    <div class="foot_wrap">
      <div class="foot1">
        <a href="javascript:;" class="f_mobile"><span class="iconfontyyy2">&#xe61d;</span>移动版<em>扫一扫，安装后台APP<img src="static/images/app_ewm.jpg" border="0" /></em></a>
        <a href="/">首页</a><a href="http://www.ykzbrcw.com/company/company-show.php?id=6" target="_blank">诚征英才</a>
        <a href="http://www.ykit.net/" target="_blank">联系我们</a>
        <a href="http://www.jihui88.com/join.html">欢迎合作</a>
        <a href="http://xueyuan.jihui88.com/news-344137-1.html">商业资讯</a>
        <a href="http://ykwlyx.jihui88.com/" target="_blank">网络营销学院</a>
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
export default {
  data() {
    return {
      model: {
        username: '',
        subusername: '',
        password: '',
        randCode: '',
        redirectURL: '',
        appId: '',
        state: null,
        lanId: 1
      },
      checked: false,
      verifyPic: ''
    }
  },
  methods: {
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    check () {
      this.checked = !this.checked
    },
    submit() {
      $.ajax({
        url: '/rest/api/user/login',
        type: 'post',
        data: {
          model: JSON.stringify(this.model)
        },
        success: function(result) {
        }
      })
    }
  }
}
</script>
<style>
.fade-enter-active {
transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
opacity: 0
}
</style>
