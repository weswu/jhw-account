<template>
  <div class="modal-content">
    <div class="modal-mask"></div>
    <div class="modal-wrap">
      <div class="wes-modal">
        <div class="modal-content">
          <div class="modal-header"><div class="ivu-modal-header-inner">新老用户绑定</div></div>
          <div class="modal-body">
            <div class="text-col" v-if="type === '0'">
              <span class="text-left">类型:</span>
              <div class="text-content">
                <label><input name="isUser" type="radio" value="01" v-model="isUser"/>老用户 </label>
                <label><input name="isUser" type="radio" value="00" v-model="isUser"/>新用户 </label>
              </div>
            </div>
            <div class="text-col">
              <span class="text-left">企业账号:</span>
              <div class="text-content">
                <input name="username" type="text" v-model="username"/>
              </div>
            </div>
            <div class="text-col" v-if="isUser === '01' && type === '1'">
              <span class="text-left">员工账号:</span>
              <div class="text-content">
                <input name="subusername" type="text" v-model="subusername"/>
              </div>
            </div>
            <div class="text-col">
              <span class="text-left">密码:</span>
              <div class="text-content">
                <input name="password" type="password" v-model="password"/>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submitUser"><span>确定</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    openid: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '0'
    },
    oauthtype: {
      type: String,
      default: 'weixin'
    },
    redirectURL: {
      type: String
    },
    backURL: {
      type: String
    }
  },
  data () {
    return {
      isUser: '01',
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    submitUser () {
      var ctx = this
      if (this.username === '') { return alert('用户名不能为空') }
      if (this.username.length < 4) { return alert('用户名长度不小于4位') }
      if (this.password === '') { return alert('密码不能为空') }
      if (this.password.length < 6) { return alert('密码长度不小于6位') }
      if (this.isUser === '00') { this.subusername = null, this.email = '' }
        // 系统跳转
      this.redirectURL = this.getUrlParam('redirectURL')
      var backURL = this.backURL === 'null' ? null : this.backURL
      this.appId = this.getUrlParam('appId')

      $.ajax({
        type: 'post',
        url: '/rest/api/user/oauthBind',
        data: {
          model: JSON.stringify({
            oauthType: ctx.oauthtype,
            openid: ctx.openid, // 必须的
            username: ctx.username, // 企业账号，必填
            subusername: ctx.subusername, // 如果是员工账号，则此荐必填
            password: ctx.password, // 必填
            email: ctx.email,
            appId: ctx.appId,
            redirectURL : ctx.redirectURL,
            type: ctx.type // 账号类型 {'0': '企业账号', '1': '员工账号', '2': '企业会员账号'}
          })
        },
        success: function (res) {
          if (res.success) {
            window.location.href = backURL ? backURL : ctx.redirectURL ?  (ctx.redirectURL+(ctx.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state )  : "http://www.jihui88.com/member/index.html"
          } else {
            if (res.msgType === 'bindUser') {
              // 跳转到用户绑定列表，并带上openid过去
              alert('未绑定用户')
            } else if (res.msgType === 'oauth_none') {
              alert(res.msg)
              setTimeout(function() {
                window.location.href=backURL ? backURL : ctx.redirectURL ?  (ctx.redirectURL+(ctx.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state )  : "http://www.jihui88.com/member/login.html"
              }, 1000)
            } else if (res.msgType === 'bind_user_init'){
              alert('绑定成功， 请先登录邮箱进行账号验证，验证通过后即可快捷登录')
              setTimeout(function() {
                window.location.href=backURL ? backURL : ctx.redirectURL ?  (ctx.redirectURL+(ctx.redirectURL.indexOf('?') > -1? '&' : '?') + 'code=' + res.attributes.code + '&state=' + res.attributes.state )  : "http://www.jihui88.com/member/login.html"
              }, 5000)
            } else {
              alert(res.msg)
            }
          }
        }
      })
    },
    close () {
      window.location.href= this.backURL ? this.backURL : "http://www.jihui88.com/member/login.html"
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
.modal-content{
  position: fixed;
left: 0;
top: 0;
}
.text-col{
  line-height: 3.5;
  clear: both;
  overflow: hidden;
}
.text-left{
  width: 80px;
  display: block;
  float: left;    text-align: right;
}
.text-content{
  padding-left: 10px;
  display: block;  float: left;
}
.text-content input {
  border: 1px solid #ddd;
  padding: 3px 8px;
  border-radius: 3px
}
.wes-modal {
    width: 400px;
    margin: 0 auto;
    position: relative;
    outline: 0;
    top: 100px;
}
.modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
}
.modal-wrap {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.modal-content {
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
}
.modal-close {
    font-size: 24px;
    position: absolute;
    right: 16px;
    top: 8px;
    overflow: hidden;
    cursor: pointer;    color: #999;
}
.modal-header {
    border-bottom: 1px solid #e9eaec;
    padding: 14px 16px;
    line-height: 1;
}
.modal-header-inner{
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #1c2438;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.modal-body {
    padding: 16px;
    font-size: 12px;
    line-height: 1.5;
}
.modal-footer {
    border-top: 1px solid #e9eaec;
    padding: 12px 18px;
    text-align: right;
}
.btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear;
    color: #454545;
    background-color: #f7f7f7;
    border-color: #dddee1;
}
.btn-primary{
    background: #ff6700;
    color: #fff
}
</style>
