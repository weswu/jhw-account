<template>
<div id="temp">
  <div id="lzj_page_demo_category" class="jh_page_demo_category" :class="[showBg ? 'slide' : '']">
    <div class="large_container">
      <div class="mobile_category_bg" @click="showBg = false"></div>
      <div class="mobile_category_btn visible-xs-block" @click="showBg = !showBg">挑选模板</div>
      <div class="category_content">
          <div class="category_block">
          <div class="category_list category_list_0">
              <div class="list_title"><span>公司性质</span><i class="fonticon"></i></div>
              <div class="list_content">
                  <ul>
                      <li :class="{active : item.value === cate1}" v-for="(item, index) in category1" @click="cateClick(item.value, 1)"><a href="javascript:;">{{item.text}}</a></li>
                  </ul>
              </div>
          </div>
          <div class="category_list category_list_1">
              <div class="list_title"><span>选择行业</span><i class="fonticon"></i></div>
              <div class="list_content">
                  <ul>
                      <li :class="{active : item.value === cate2}" v-for="(item, index) in category2" @click="cateClick(item.value, 2)"><a href="javascript:;">{{item.text}}</a></li>
                  </ul>
              </div>
          </div>
          <div class="category_list category_list_2">
              <div class="list_title"><span>选择颜色</span><i class="fonticon"></i></div>
              <div class="list_content">
                  <ul>
                      <li :class="{active : item.value === cate3}" v-for="(item, index) in category3" @click="cateClick(item.value, 3)"><a href="javascript:;">{{item.text}}</a></li>
                  </ul>
              </div>
          </div>
          </div>
          <div class="go_select visible-xs-block"><a href="javascript:;">立即筛选</a></div>
      </div>
    </div>
  </div>
  <!-- 模板列表 -->
  <div id="lzj_page_demo" class="jh_page_demo">
    <div class="container-fluid">
      <div class="demo_content">
          <ul class="demo_list">
              <li v-for="(item, index) in list">
                  <div class="demo_pic">
                      <span><img :src="item.pic"></span>
                      <ul class="demo_btn_list">
                          <li><a :href="'http://pc.jihui88.com/rest/site/' + item.id + '/index'" target="_blank">点击预览</a></li>
                          <li><a href="javascript:;" @click="select">选用</a></li>
                      </ul>
                  </div>
                  <div class="demo_info">
                      <p class="demo_name">{{item.name}}</p>
                      <p class="demo_tag">{{item.tag}}</p>
                      <p class="demo_num">模板编号：{{item.id}}</p>
                  </div>
              </li>
          </ul>
      </div>
      <div class="page_content">
        <div class="page_info">
          <div class="page_btn page_prev">
            <span class="go_first" @click="pg(1)"><a href="javascript:;"><i class="fonticon"></i></a></span>
            <span class="go_prev" @click="pg(page-1)"><a href="javascript:;"><i class="fonticon"></i></a></span>
          </div>
          <div class="page_list">
            <ul>
              <li :class="[page === index+1 ? 'active' : '']" v-if="(page < index + 6) && (page > index - 4)"
              v-for="(item, index) in Math.ceil(total/4)" @click="pg(index+1)">
                <a href="javasctript:;">{{index+1}}</a>
              </li>
            </ul>
          </div>
          <div class="page_btn page_next">
            <span class="go_next" @click="pg(page+1)"><a href="javascript:;"><i class="fonticon"></i></a></span>
            <span class="go_last" @click="pg(Math.ceil(total/4))"><a href="javascript:;"><i class="fonticon"></i></a></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="iframe_login" ref="login" :style="'display:' + display">
    <div class="wrapper">
      <iframe id="iframeLogin" name="header" :src="redirectURL" frameBorder="0" scrolling="no"></iframe>
      <div @click="close" class="close">关闭</div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data　() {
    return {
      showBg: false,
      category1: [
        {text: '全部', value: ''},
        {text: '集团', value: '1'},
        {text: '事业单位', value: '2'},
        {text: '品牌', value: '3'},
        {text: '百强企业', value: '4'},
        {text: '上市公司', value: '5'},
        {text: '平台门户', value: '6'},
        {text: '外贸行业', value: '7'},
        {text: '协会', value: '8'},
        {text: '企业', value: '9'}
      ],
      cate1: '',
      category2: [
        {text: '全部', value: ''},
        {text: '日用百货', value: '1'},
        {text: '户外用品', value: '2'},
        {text: '五金工具', value: '3'},
        {text: '厨房用品', value: '4'},
        {text: '家用电器', value: '5'},
        {text: '建筑五金', value: '6'},
        {text: '门业/锁业', value: '7'},
        {text: '杯业', value: '8'},
        {text: '机械设备', value: '9'},
        {text: '教育培训/服务娱乐', value: '10'},
        {text: '车/车配件', value: '11'},
        {text: '儿童/玩具', value: '12'},
        {text: '食品', value: '13'},
        {text: '服饰', value: '14'},
        {text: '健身器材', value: '15'},
        {text: '图文广告', value: '16'},
        {text: '医疗', value: '17'}
      ],
      cate2: '',
      category3: [
        {text: '全部', value: ''},
        {text: '咖啡色', value: '1'},
        {text: '橙色', value: '2'},
        {text: '灰色', value: '3'},
        {text: '白色', value: '4'},
        {text: '紫色', value: '5'},
        {text: '红色', value: '6'},
        {text: '绿色', value: '7'},
        {text: '蓝色', value: '8'},
        {text: '金色', value: '9'},
        {text: '黄色', value: '9'},
        {text: '黑色', value: '9'}
      ],
      cate3: '',
      list: [
        {
          id: 232,
          name: '商业类网站模板',
          tag: '商业网站/户外用品/教育培训/家用电器',
          pic: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//01//05/b6710dc0-950f-4d5e-99fb-d018c7cb6afe.jpg'
        },
        {
          id: 232,
          name: '商业类网站模板',
          tag: '商业网站/户外用品/教育培训/家用电器',
          pic: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//01//05/b6710dc0-950f-4d5e-99fb-d018c7cb6afe.jpg'
        },
        {
          id: 232,
          name: '商业类网站模板',
          tag: '商业网站/户外用品/教育培训/家用电器',
          pic: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//01//05/b6710dc0-950f-4d5e-99fb-d018c7cb6afe.jpg'
        },
        {
          id: 232,
          name: '商业类网站模板',
          tag: '商业网站/户外用品/教育培训/家用电器',
          pic: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//01//05/b6710dc0-950f-4d5e-99fb-d018c7cb6afe.jpg'
        },
        {
          id: 232,
          name: '商业类网站模板',
          tag: '商业网站/户外用品/教育培训/家用电器',
          pic: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//01//05/b6710dc0-950f-4d5e-99fb-d018c7cb6afe.jpg'
        },
        {
          id: 232,
          name: '商业类网站模板',
          tag: '商业网站/户外用品/教育培训/家用电器',
          pic: 'http://dfwjjingtai.b0.upaiyun.com/upload//j//j6//jz//picture//2018//01//05/b6710dc0-950f-4d5e-99fb-d018c7cb6afe.jpg'
        }
      ],
      page: 1,
      total: 50,
      display: 'none'
    }
  },
  created () {
    // 系统跳转
    this.redirectURL = this.getUrlParam('redirectURL') || 'http://www.jihui88.com/member/quick.html'
    this.get()
  },
  mounted () {
    var ctx = this
    window.addEventListener('message', function (e) {
      var data = e.data || {}
      if (data.type === 1 && !ctx.user.nickname) {
        console.log('close iframe: 1')
        return ctx.close()
      }
    }, false)
  },
  methods: {
    get (e) {
      console.log(this.page)
    },
    cateClick (val, index) {
      if (index === 1) {
        this.cate1 = val
      }
      if (index === 2) {
        this.cate2 = val
      }
      if (index === 3) {
        this.cate3 = val
      }
      alert(index)
    },
    pg (v) {
      if (v<1 || v>Math.ceil(this.total/4)) {return}
      if (v===this.page) {return}
      this.page = v
      this.get()
    },
    select (val) {
      setTimeout(() => {
        this.display = 'block'
      }, 200)
    },
    close () {
      var ctx = this
      this.display = 'none'
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
@font-face {  font-family: 'iconfont';  /* project id 249974 */  src: url('//at.alicdn.com/t/font_249974_tla2e333x7lm1jor.eot');  src: url('//at.alicdn.com/t/font_249974_tla2e333x7lm1jor.eot?#iefix') format('embedded-opentype'),  url('//at.alicdn.com/t/font_249974_tla2e333x7lm1jor.woff') format('woff'),  url('//at.alicdn.com/t/font_249974_tla2e333x7lm1jor.ttf') format('truetype'),  url('//at.alicdn.com/t/font_249974_tla2e333x7lm1jor.svg#iconfont') format('svg');}
@font-face {  font-family: 'iconfont'; src: url('//at.alicdn.com/t/font_249974_nfb6mwvbqi1kyb9.eot');  src: url('//at.alicdn.com/t/font_249974_nfb6mwvbqi1kyb9.eot?#iefix') format('embedded-opentype'),  url('//at.alicdn.com/t/font_249974_nfb6mwvbqi1kyb9.woff') format('woff'),  url('//at.alicdn.com/t/font_249974_nfb6mwvbqi1kyb9.ttf') format('truetype'),  url('//at.alicdn.com/t/font_249974_nfb6mwvbqi1kyb9.svg#iconfont') format('svg');}
.fonticon:before {font-family:"iconfont";font-style:normal;}*, ::after, ::before {-webkit-box-sizing:border-box;box-sizing:border-box;}body {font:12px "Arial","Times New Roman","Microsoft YaHei","SimHei";}img {border:0 none;  }ul,ol,li {list-style:none;padding:0;margin:0;}h1,h2,h3,h4,h5,h6,p {margin:0;font-weight:normal; }a, a:hover, a:active, a:visited, a:focus {text-decoration:none;}
/* 模板分类 */
#lzj_page_demo_category {padding:15px 0;}#lzj_page_demo_category .category_content {}#lzj_page_demo_category .category_content .category_list {font-size:0;}#lzj_page_demo_category .category_content .category_list .list_title {display:inline-block;*display:inline;*zoom:1;vertical-align:top;padding:16px 0;margin-right:50px;}#lzj_page_demo_category .category_content .category_list .list_title span {color:#999;font-size:14px;line-height:1;}#lzj_page_demo_category .category_content .category_list .list_title span:after {content:"：";}#lzj_page_demo_category .category_content .category_list .list_content {display:inline-block;*display:inline;*zoom:1;vertical-align:top;width:calc(100% - 120px);}#lzj_page_demo_category .category_content .category_list .list_content ul {}#lzj_page_demo_category .category_content .category_list .list_content ul li {display:inline-block;*display:inline;*zoom:1;vertical-align:middle;min-width:62px;line-height:1;padding:16px 0;margin-right:28px;}#lzj_page_demo_category .category_content .category_list .list_content ul li a {color:#666;font-size:14px;line-height:1;transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;-webkit-transition:all .3s;}#lzj_page_demo_category .category_content .category_list .list_content ul li.active a,#lzj_page_demo_category .category_content .category_list .list_content ul li a:hover {color:#ff6700;}#g_body.slide {overflow:hidden;}#lzj_page_demo_category .mobile_category_btn {width:100%;height:42px;line-height:42px;text-align:center;background:#ff6700;color:#fff;font-size:16px;border-radius:3px;}#lzj_page_demo_category .mobile_category_content {position:fixed;top:0;right:-85%;width:85%;height:100%;background:#fff;z-index:999;transition:all .3s ease;-o-transition:all .3s ease;-moz-transition:all .3s ease;-webkit-transition:all .3s ease; }#lzj_page_demo_category.slide .mobile_category_content {right:0;}#lzj_page_demo_category .mobile_category_bg {content:"";position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);pointer-events:none;z-index:1;opacity:0;transition:all .3s ease;-o-transition:all .3s ease;-moz-transition:all .3s ease;-webkit-transition:all .3s ease;}#lzj_page_demo_category.slide .mobile_category_bg {opacity:1;pointer-events:auto;}#lzj_page_demo_category .mobile_category_content .category_block {height:calc(100% - 42px);overflow:scroll;}#lzj_page_demo_category .mobile_category_content .category_block .category_list {border-bottom:1px solid #eee;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_title {padding:16px 0;padding-left:15px;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_title span {color:#666;font-size:14px;line-height:1;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_title .fonticon {float:right;height:14px;line-height:14px;color:#999;font-size:24px;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_title .fonticon:before {content:"\e655";}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_content {/* height:108px;overflow:hidden; */}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_content ul {font-size:0;padding:0 7.5px;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_content ul li {display:inline-block;*display:inline;*zoom:1;vertical-align:middle;width:33.33333333%;min-width:62px;line-height:1;padding:8px 7.5px;margin-bottom:8px;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_content ul li a {display:block;color:#666;font-size:12px;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;-webkit-transition:all .3s;}#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_content ul li.active a,#lzj_page_demo_category .mobile_category_content .category_block .category_list .list_content ul li a:hover {color:#ff6700;}#lzj_page_demo_category .mobile_category_content .go_select {position:absolute;z-index:10;bottom:0;width:100%;}#lzj_page_demo_category .mobile_category_content .go_select a {display:block;width:100%;height:42px;line-height:42px;text-align:center;background:#ff6700;color:#fff;font-size:16px;}/* 模板列表 */#lzj_page_demo {padding-top:40px;}#lzj_page_demo .demo_content {text-align:center;max-width:1480px;margin:0 auto;}#lzj_page_demo .demo_content ul.demo_list {font-size:0;margin:0 -15px;display:flex;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap;flex-wrap:wrap;-webkit-justify-content:flex-start;justify-content:flex-start;-moz-box-pack:flex-start;-webkit--moz-box-pack:flex-start;box-pack:flex-start;align-items:flex-start;-webkit-align-items:flex-start;box-align:flex-start;-moz-box-align:flex-start;-webkit-box-align:flex-start;} #lzj_page_demo .demo_content ul.demo_list>li {display:inline-block;*display:inline;*zoom:1;vertical-align:top;padding:0 15px;margin-top:0 !important;margin-bottom:34px !important;cursor:pointer;}#lzj_page_demo .demo_content ul.demo_list>li:nth-child(3n-1){margin:0 74px;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic {max-width:424px;max-height:282px;position:relative;border-radius:3px 3px 0 0;overflow:hidden;box-shadow:0 0 17px 0 rgba(0,0,0,0.04);}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic img {display:block;width:100%;transition:all .5s ease;-o-transition:all .5s ease;-moz-transition:all .5s ease;-webkit-transition:all .5s ease;}#lzj_page_demo .demo_content ul.demo_list>li:hover .demo_pic img {-webkit-filter:blur(2px);}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list {position:absolute;top:0;left:0;right:0;bottom:0;background:transparent;border-radius:3px 3px 0 0;display:flex;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap;flex-wrap:wrap;justify-content:center;-webkit-justify-content:center;-moz-box-pack:center;-webkit--moz-box-pack:center;box-pack:center;align-items:center;-webkit-align-items:center;box-align:center;-moz-box-align:center;-webkit-box-align:center;transition:all .5s ease;-o-transition:all .5s ease;-moz-transition:all .5s ease;-webkit-transition:all .5s ease;}#lzj_page_demo .demo_content ul.demo_list>li:hover .demo_pic ul.demo_btn_list {background:rgba(0,0,0,0.7);}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li {margin:0 10px;opacity:0;transform:translateY(100%);-o-transform:translateY(100%);-moz-transform:translateY(100%);-webkit-transform:translateY(100%);transition:all .5s ease;-o-transition:all .5s ease;-moz-transition:all .5s ease;-webkit-transition:all .5s ease;}#lzj_page_demo .demo_content ul.demo_list>li:hover .demo_pic ul.demo_btn_list li {opacity:1;transform:translateY(0);-o-transform:translateY(0);-moz-transform:translateY(0);-webkit-transform:translateY(0);}#lzj_page_demo .demo_content ul.demo_list>li:hover .demo_pic ul.demo_btn_list li:nth-child(1) {transition-delay:0.1s;}#lzj_page_demo .demo_content ul.demo_list>li:hover .demo_pic ul.demo_btn_list li:nth-child(2) {transition-delay:0.2s;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li a {display:block;width:124px;height:52px;line-height:52px;text-align:center;background:#ff6700;color:#fff;font-size:16px;border-radius:52px;overflow:hidden;position:relative;z-index:1;transition:all .3s ease;-o-transition:all .3s ease;-moz-transition:all .3s ease;-webkit-transition:all .3s ease;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li a:hover {color:rgba(255,103,0,0.75);box-shadow:0 0 12px 0 rgba(255,103,0,0.75);}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li a:before {content:"";display:block;width:100%;height:100%;background:rgba(255,255,255,0.8);border-radius:52px;position:absolute;top:0;left:0;z-index:-1;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right;transition:transform .3s ease;-o-transition:transform .3s ease;-moz-transition:transform .3s ease;-webkit-transition:transform .3s ease;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li a:hover::before {-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li a:after {content:"";display:block;border-radius:52px;position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1;box-shadow:0 0 0 2px #ff6700 inset;}#lzj_page_demo .demo_content ul.demo_list>li .demo_info {padding:24px 0;text-align:center;}#lzj_page_demo .demo_content ul.demo_list>li .demo_info .demo_name {color:#333;font-size:16px;line-height:2;}#lzj_page_demo .demo_content ul.demo_list>li .demo_info .demo_tag {color:#999;font-size:12px;line-height:2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}#lzj_page_demo .demo_content ul.demo_list>li .demo_info .demo_num {color:#aaa;font-size:12px;line-height:2.5;}/* 页码 */#lzj_page_demo .page_content {text-align:center;font-size:0;padding-top:74px;padding-bottom:40px;}#lzj_page_demo .page_content .page_info {display:inline-block;border-radius:3px;border:1px solid #f0f3f4;overflow:hidden;}#lzj_page_demo .page_content .page_list {display:inline-block;*display:inline;*zoom:1;vertical-align:middle;}#lzj_page_demo .page_content .page_list ul {}#lzj_page_demo .page_content .page_list ul li {display:inline-block;*display:inline;*zoom:1;vertical-align:middle;}#lzj_page_demo .page_content .page_list ul li a {display:block;width:30px;height:30px;line-height:30px;text-align:center;background:#fff;border-right:1px solid #f0f3f4;color:#7f7f7f;font-size:14px;font-family:"Arial";transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;-webkit-transition:all .3s;}#lzj_page_demo .page_content .page_list ul li.active a,#lzj_page_demo .page_content .page_list ul li a:hover {background:#ff6700;color:#fff;}#lzj_page_demo .page_content .page_btn {display:inline-block;*display:inline;*zoom:1;vertical-align:middle;}#lzj_page_demo .page_content .page_btn span {display:inline-block;*display:inline;*zoom:1;vertical-align:middle;}#lzj_page_demo .page_content .page_btn span a {display:block;width:30px;height:30px;line-height:30px;text-align:center;background:#fff;border-right:1px solid #f0f3f4;color:#7f7f7f;font-size:14px;font-family:"Simsun";transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;-webkit-transition:all .3s;}#lzj_page_demo .page_content .page_btn span a:hover {background:#ff6700;color:#fff;}#lzj_page_demo .page_content .page_prev {}#lzj_page_demo .page_content .page_prev .go_first .fonticon:before {content:"\e707";}#lzj_page_demo .page_content .page_prev .go_prev .fonticon:before {content:"\e66b";}#lzj_page_demo .page_content .page_next span:last-child a {border-right:0 none;}#lzj_page_demo .page_content .page_next .go_last .fonticon:before {content:"\e704";}#lzj_page_demo .page_content .page_next .go_next .fonticon:before {content:"\e60c";}@media (max-width: 1366px){#lzj_page_demo .demo_content ul.demo_list>li {width:33.33333333%;}#lzj_page_demo .demo_content ul.demo_list>li:nth-child(3n-1){margin:0;}}@media (max-width: 992px){#lzj_page_demo .demo_content ul.demo_list>li {width:50%;}}@media (max-width: 768px){#lzj_page_demo {padding:0;}#lzj_page_demo .demo_content ul.demo_list,#lzj_page_demo .demo_content ul.demo_list>li {padding:0 7.5px;}#lzj_page_demo .demo_content ul.demo_list>li {margin-bottom:10px;}#lzj_page_demo .demo_content ul.demo_list>li .demo_info {padding:5px 0;}#lzj_page_demo .page_content {padding-bottom:0;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list {padding:10px 0;}#lzj_page_demo .demo_content ul.demo_list>li .demo_pic ul.demo_btn_list li a {height:36px;line-height:36px;font-size:12px;}}

.large_container {
padding-left:15px;
padding-right:15px;
margin-left:auto;
margin-right:auto;
}
@media (min-width: 768px) {
.large_container {
    width: 750px !important;
}
}
@media (min-width: 992px){
.large_container {
    width: 970px !important;
}
}
@media (min-width: 1200px){
.large_container {
    width: 1170px !important;
}
}
@media (min-width: 1366px){
.large_container {
    width: 1280px !important;
}
}

.visible-lg-block, .visible-lg-inline, .visible-lg-inline-block, .visible-md-block, .visible-md-inline, .visible-md-inline-block, .visible-sm-block, .visible-sm-inline, .visible-sm-inline-block, .visible-xs-block, .visible-xs-inline, .visible-xs-inline-block {
    display: none!important;
}
@media (max-width: 767px){
  .visible-xs-block {
      display: block!important;
  }
}
/* iframe */
.iframe_login{
  width: 652px;
  height: 406px;
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -300px 0 0 -326px;
  display: none;
}

.iframe_login iframe {
  width: 100%;
  height: 406px;
}
.iframe_login .wrapper{
  position: relative;
}
.iframe_login .close{
  position: absolute;
  right: -40px;
  top: 0;
  color: #fff;
  background: rgba(0,0,0,0.5);
  border-radius: 0;
  z-index: 99;
  width: 40px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
</style>
