<template>
  <div id="JH_wrap">
  	<div id="JH_in">
  		<div id="head">
  			<div class="title">
  				<img src="static/images/logo2.jpg" alt="机汇网" />
  				<div class="title_mid">我们已累计为 <span>59652</span>个企业 提供服务</div>
  				<div class="title_right">已有账号，<a href="login.html">马上登录 <span>></span></a></div>
  			</div>
  			<div class="content">
  				<ul>
  					<li class="item01">欢迎注册机汇网</li>
  					<li class="item02">
  						<select id="model-domain" name="domain" value="jihui88.com" class="bui-form-field-select bui-form-field" aria-disabled="false" aria-pressed="false">
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
  						<input id="model-username" name="vali-username" value="" type="text" class="input-large bui-form-field" placeholder="请设置机汇网账号">
  						<div class="tip">
  							<em></em>
  							输入值长度不小于4！
  						</div>
  					</li>
  					<li class="item04">
  						<input id="model-cellphone" name="vali-cellphone" value="" type="text" class="input-large bui-form-field bui-form-field-error" placeholder="请输入手机号码">
  						<span class="tip2">+86</span>
  						<div class="tip">
  							<em></em>
  							输入正确格式手机号！
  						</div>
  					</li>
  					<li class="item05">
  						<input id="model-imgCode" name="imgCode" type="text" class="input-small bui-form-field" placeholder="验证码">
  						<img src="images/verification.jpg" />
  						<a class="refreshCode" href="javascript:;">换一张？</a>
  						<div class="tip">
  							<em></em>
  							输入验证码！
  						</div>
  					</li>
  					<li class="item06">
  						<input id="model-randCode" name="randCode" type="text" class="input-small bui-form-field" placeholder="短信验证码">
  						<input class="refreshCellphoneCode bui-form-field" type="button" id="btn" value="发送验证码">
  						<div class="tip">
  							<em></em>
  							输入手机验证码！
  						</div>
  					</li>
  					<li class="item07">
  						<input id="model-email" name="vali-email" value="" type="text" class="input-large bui-form-field bui-form-field-error" placeholder="E-mail">
  						<div class="tip">
  							<em></em>
  							输入正确邮箱！
  						</div>
  					</li>
  					<li class="item08">
  						<input id="model-password" name="password" value="" type="password" class="input-large bui-form-field bui-form-field-error" placeholder="设置您的登录密码">
  						<div class="tip">
  							<em></em>
  							输入您的登录密码！
  						</div>
  					</li>
  					<li class="item09">
  						<input id="model-rePassword" name="password" value="" type="password" class="input-large bui-form-field bui-form-field-error" placeholder="请再次输入密码">
  						<div class="tip">
  							<em></em>
  							请再次输入密码！
  						</div>
  					</li>
  					<li class="item10">
  						<button id="submit" type="button" class="button button-primary">注册</button>
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
  
}
</script>
