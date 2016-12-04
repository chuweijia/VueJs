<template>
  <!-- 头部 S -->
  <header><span v-if="unSubmit">询价促销</span><span v-if="!unSubmit">询价成功</span>
    <div class="return-box"><a v-link="{ name: 'index'}" class="back">返回</a></div>
  </header>
  <!-- 头部 E -->
  <div class="content" id="subContent" v-if="unSubmit">
    <div class="list-wrap">
      <h3 class="title">{{ name }}</h3>
      <!-- 表单区 S -->
      <div class="form-wrap" id="myform">
        <validator name="validation">
          <form novalidate @submit.prevent="onSubmit">
            <ul class="inp-mode">
              <li>
                <div class="outside select-inp" @click="showType" id="type">
                  <input type="hidden" id="usercar">
                </div>
                <div class="error" v-bind:class="{'hidden':isTF.ucar.isT}">{{errors.ucar.e1}}</div>
              </li>
              <li>
                <!-- 选择完成后，请去年.gray这个类名，字的颜色会变成黑色 -->
                <div class="outside select-inp gray" @click="showPro" id="city">请选择上牌城市</div>
                <input type="hidden" id="usercity" initial="off" detect-change="off" v-validate:usercity="['cityNull']">
                  <div class="error" detect-change="off" v-if="$validation.usercity.cityNull">{{$validation.usercity.cityNull}}
                  </div>
              </li>
              <li>
                <div class="outside inner">
                  <input type="text" placeholder="请填写姓名" id="username" v-validate:username="['userNull']"
                         maxlength="4"
                          initial="off" detect-blur="on" detect-change="on"  @keyup="keyupName"
                  ><i class="ico" v-on:click="resetUser"  v-if="ico.uname.isT"></i>
                </div>
                <div class="error" v-if="$validation.username.userNull">{{$validation.username.userNull}}</div>
                <div class="error" v-bind:class="{'hidden':isTF.unam.isT}">{{errors.unam.e1}}</div>
              </li>
              <li>
                <div class="outside inner">
                  <input type="tel" pattern="[0-9]*"placeholder="请输入手机号" id="userphone"
                         v-validate:userphone="['phoneNull']" maxlength="11" initial="off" detect-blur="on"
                         detect-change="on" @keyup="keyupPhone"><i class="ico" v-on:click="resetPhone" v-if="ico.uphone.isT" ></i>
                </div>
                <div class="error" v-if="$validation.userphone.phoneNull">{{$validation.userphone.phoneNull}}</div>
                <div class="error" v-bind:class="{'hidden':isTF.uphone.e1.isT}">{{errors.uphone.e1}}</div>
                <div class="error" v-bind:class="{'hidden':isTF.uphone.e2.isT}">{{errors.uphone.e2}}</div>
              </li>
              <li>
                <input type="hidden" id="userselect" v-validate:userselect="['selectLegal']">
                <input type="submit" id="btnSubmit" class="btn" value="确认提交">
              </li>
            </ul>
          </form>
        </validator>
        <div class="tips">爱卡汽车会严格遵守<a href="http://a.xcar.com.cn/extend/service/1/" class="blue-txt">《用户服务协议》</a>和<a href="http://a.xcar.com.cn/extend/privacy/1/" class="blue-txt">《隐私权声明》</a>保证您的信息安全。
        </div>
      </div>
      <!-- 表单区 E -->
    </div>
    <div class="compare-txt" id="dealerTips">请至少选择一家经销商为您服务</div>
    <!-- 列表 S -->
    <ul class="dealer-wrap" id="dealerList">
      <li v-for="item in dealerData" data-did = "{{item.did}}">
        <h3 class="name">{{item.coaname}}<i class="ico" v-if="item.premission > 2"></i><em v-if="item.area == 0">售本市</em></h3>
        <p class="address">{{item.address}}</p>
      </li>
    </ul>
    <!-- 列表 E -->
    <div class="loading" v-show="loadShow"><i class="ico"></i><em>Loading...</em></div>
    <!-- 加载失败 S -->
    <div class="loading-fail ld-space" v-if="dealersLoadFail">
      <a @click="dealersLoadAgain" class="ld-wrap">
        <i class="ico"></i>
        <strong>加载失败</strong>
        <span>点击重新加载</span>
      </a>
    </div>
  </div>
  <div class="content" id="sucContent" v-if="!unSubmit">
    <div class="success-box">
      <span class="txt">提交成功！</span><br>
      当地经销商会尽快与你联系
    </div>
    <div class="compare-txt" id="recommendTips">你可能关注</div>
    <div class="ask-success-mode" id="askMode">
      <div class="ask-mod">
        <ul class="select-ask-list" id="selectAskList">
          <li v-for="recommend in recommendData">
            <div class="img-wrap"><img v-bind:src="recommend.first_photo" alt=""></div>
            <h3 class="name">{{ recommend.name }}</h3>
            <span class="price">{{recommend.dealer_price}}万</span>
            <span class="gray-price">指导价：{{recommend.price_msg}}</span>
            <a v-bind:data-pserid="recommend.pserid" class="ask-btn" @click="fastAsk($index)">一键询价</a>
          </li>
        </ul>
      </div>
      <div class="back-bt"><a v-link="{ name : 'index'}" class="btn">返回选车页</a></div>
    </div>
    <!-- 当页面无内容，只有一个loading时添加类名 .ld-space -->
    <div class="loading" v-show="recommendLoadShow"><i class="ico"></i><em>Loading...</em></div>
    <!-- 加载失败 S -->
    <div class="loading-fail ld-space" v-if="recommendLoadFail">
      <a @click="recommendLoadAgain" class="ld-wrap">
        <i class="ico"></i>
        <strong>加载失败</strong>
        <span>点击重新加载</span>
      </a>
    </div>
  </div>
  <sub-slider-component></sub-slider-component>
</template>
<style>
  #subContent,#sucContent { padding-bottom: 0;}
  #listType{ padding-bottom: 50px;}
  #dealerList{ position: relative;}
</style>
<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import Vuex from 'vuex'
  import VueResource from 'vue-resource'
  import VueValidator from 'vue-validator'
  import store from '../vuex/store'
  import IScroll from '../../dist/lib/js/iscroll'
  import AttachFastClick from '../../dist/lib/js/fastclick.min'
  import SubSliderComponent from '../components/subSlider.vue'
  import CityData from '../city.json'
  import {getCityId, getDealerData, getPserData} from '../vuex/getters'
  import {updateDealerData, updatePserData, updateRecommendData} from '../vuex/actions'
  import VueCookie from 'vue-cookie'



  Vue.use(Vuex)
  Vue.use(VueResource)
  Vue.use(VueValidator)
  Vue.use(VueCookie);
  Vue.http.options.emulateJSON = true;

  export default{
    vuex: {
      getters: {
        city: getCityId,
        dealerData: getDealerData,
        pserData: getPserData
      }
    },
    data (){
      return {
        cityId: "",
        cityData: {},
        loadShow: true,
        unSubmit: true,
        recommendLoadShow : true,
        recommendLoadFail : false,
        dealersLoadFail : false,
        name: "",
        dealers: [],
        parea : "",
        type : "",
        tempPro : "",
        recommendData : {},
        ico:{
                uname:{
                  isT:false
                },
                uphone:{
                  isT:false
                }

        },
        isTF:{
              unam:{
                isT:true
              },
              uphone:{
                e1:{
                  isT:true
                },
                e2:{
                  isT:true
                }
              },
              ucar:{
                isT:true
              },
              usub:{
                isT:false
              }
        },
        subMsg:{
              default:"确认提交",
              success:"提交中..."
        },
        errors:{
                unam:{
                  e1:"请认真输入姓名"
                },
                uphone:{
                  e1:"请填写正确手机号",
                  e2:"你的手机号不能进行询价"
                },
                ucar:{
                  e1:"请正确选择车型"
                },
        },
        formData : {
          mid: "", // 车型id *
          serid: "", // 子车系id  默认为空
          did: "0", // 经销商id  因为是对车型询价，did传0
          province_id: "", // 询价省份id *
          city_id: "", // 询价城市id *
          pserid: "", // 车系id *
          is_cms: "727", // source_id
          name: "", // 用户所填写的姓名 *
          mobile: "", // 用户所填手机号 *
          sex: "", // 默认传空
          type: "1", // 默认传1
          text: "", // 默认传空
          did_all : "" // 询价多选经销商id *
        }
      }
    },
    ready (){
      AttachFastClick(document.body);
      var _self = this;
      //页面初始化时，将城市信息写入城市选框
      var preCityId = window.localStorage.getItem("cityId");
      var preCityName = window.localStorage.getItem("cityName");
      var preProvId = window.localStorage.getItem("provId");

      if(preCityId != null && preCityId != undefined && preCityId != ""){
        _self.cityId = preCityId;
        $("#usercity").val(preCityId);
        $("#city").text(preCityName).removeClass("gray");
        _self.formData.province_id = preProvId;
        _self.formData.city_id = preCityId;
      }
      // 数组去重
      Array.prototype.unique = function () {
        var res = [];
        var json = {};
        for (var i = 0; i < this.length; i++) {
          if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
          }
        }
        return res;
      };

      _self.name = _self.$route.params.name;
      _self.initDealerList(_self.$route.params.pserid, _self.cityId, _self.$route.params.type);
      _self.initPserList(_self.$route.params.pserid);
      _self.initCity();

      //页面初始化时，将pserid写入formData
      _self.formData.pserid = _self.$route.params.pserid;


      _self.getLocalStorage();
      // click to choose city
      $("body #listCitySub").on("click", " li a", function (e) {
        e.preventDefault();
        var $this = $(this), cityName = $this.text(), cityId = $this.attr("data-cityid");
        $("#city").text(cityName).attr("data-id", cityId).removeClass("gray").next().hide();
        // 将省份和城市ID写入formData
        _self.formData.province_id = _self.tempPro;
        _self.formData.city_id = cityId;
        $("#usercity").val(cityId);
        _self.hideDrawer();
        //切换城市，底部经销商列表刷新
        _self.initDealerList(_self.$route.params.pserid, cityId, _self.$route.params.type);
      });

      // click province to choose city
      $("#listGroup").on("click", "li a", function (e) {
        e.preventDefault();
        var proId = $(this).attr("data-proid"), citys = _self.cityData;
        _self.tempPro = proId;
        for (let i = 0; i < citys.length; i++) {
          if (citys[i].id == proId) {
            let children = citys[i].children;
            var strs = '';
            for (let j = 0; j < children.length; j++) {
              strs += '<li><a class="province-info" data-cityid="' + children[j].id + '"><span>' + children[j].text + '</span></a></li>';
            }
            $("#listCitySub ul").empty().append(strs);
          }
        }
        $("#drawerCity").stop(true).css({
          "top": 0,
          "left": "100%",
          "height": $(window).height(),
          "display": "block"
        }).animate({
          "left": "29%"
        }, 400, function (e) {
          Tools.myScroll = new IScroll("#wrapperCity", {
            click : Tools.iScrollClick(),
            deceleration : 0.001,
            taps: true,
            preventDefault:false,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
            onScrollMove: function () {
              if ((this.y < this.maxScrollY) && (this.pointY < 1)) {
                this.scrollTo(0, this.maxScrollY, 400);
                return false;
              } else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
                this.scrollTo(0, 0, 400);
                return false;
              }
            }
          });
          document.body.addEventListener('touchmove', Tools.prevent, false);
        });
      });

      // click to choose pser
      $("body").on("click", "#listType li .info", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let _$this = $(this);
        $("#listType .info").removeClass("cur");
        _$this.addClass("cur");
        //获取选中车型的年款，写入选框中
        var years = _$this.siblings(".years").text();
        $("#type").text(years + " " + _$this.find(".name").text());
        _self.formData.mid = _$this.attr("data-mid");
        _self.parea = _$this.attr("data-parea");
        _self.type = _$this.attr("data-type");
        $("#usercar").val(_$this.attr("data-mid"));
        _self.hideDrawer();
      });

      // click to change leader "cur"
      $("body #dealerList").on("click", "li", function (e) {
        e.stopPropagation();
        var _$this = $(this);
        var curLength = $("#dealerList li.cur").length;
        if (curLength == 1 && _$this.hasClass('cur')) {
          alert("请至少选择一家经销商为您服务");
          return false;
        }
        else {
          _$this.hasClass("cur") ? _$this.removeClass("cur") : _$this.addClass("cur");
        }
      });

    },
    components: {
      SubSliderComponent
    },
    validators: {
      userNull: {
        message: '请填写姓名',
        check: Vue.validator('required')
      },
      cityNull: {
        message: '请选择上牌城市',
        check: Vue.validator('required')
      },
      phoneNull: {
        message: '请输入手机号',
        check: Vue.validator('required')
      }
    },
    methods: {
      initCity: function () {
        let citys = CityData;
        this.cityData = citys;
        // set province data
        for (let i = 0; i < citys.length; i++) {
          let l = citys[i].letter.toUpperCase();
          var $box = $("#listGroup"), $dl = $box.find("li[data-id=" + l + "]");
          if ($dl != null) {
            let letter = citys[i].text.toUpperCase();
            $dl.append('<a class="province-info" data-proid="' + citys[i].id + '"><span>' + letter + '</span></a>').show();
            $("#letterNavPro li[data-id=" + l + "]").addClass("dis");
          }
        }

        // province letter nav
        var count = 1;
        $("#letterNavPro li").each(function () {
          if ($(this).hasClass("dis")) {
            count++;
          }
        });
        var $letter = $("#letterNavPro");
        $letter.height(count * $letter.find("li").height());
        $letter.css("margin-top", -$letter.height() / 2).show();

        // city letter nav
        var evtId;
        $("#letterNavPro li a").on("touchstart", function (event) {
          event.preventDefault();
          evtId = event.target.innerText;
        });
        $("#letterNavPro li a").on("touchmove", function (event) {
          event.preventDefault();
          event.stopPropagation();
          var x = event.originalEvent.changedTouches[0].clientX;
          var y = event.originalEvent.changedTouches[0].clientY;
          var target = document.elementFromPoint(x, y);
          var cn = $(target.parentNode.parentNode).get(0).className;
          if (cn == "letter-box") {
            evtId = $(target).get(0).innerText;
            Tools.myScroll.scrollTo(0, -$("#listGroup li[data-id='" + evtId + "']").attr("scroll"), 30, IScroll.utils.ease.elastic);
          } else {
            //$(".layer-tips").hide();
          }
        });
        $("#letterNavPro li a").on("touchend", function (event) {
          event.preventDefault();
          Tools.myScroll.scrollTo(0, -$("#listGroup li[data-id='" + evtId + "']").attr("scroll"), 30);
        });
      },
      initPserList: function (pserid) {
        var _self = this;
        this.$http.get('/nxcar/index.php/tool/carcalc/getModelNew/?seriseId=' + pserid).then((response) => {
          var res = $.parseJSON(response.data);
          if (res.msg == "success") {
            _self.typeData = res.data;
          } else {
            return false;
          }
          updatePserData(store, res.data);

          // set pser data
          let yearArr = [];
          for (let i = 0; i < _self.typeData.length; i++) {
            yearArr.push(_self.typeData[i].syear);
          }
          // 得到去重后的年份
          let yearNumArr = yearArr.unique();
          // 先将年份插入到页面
          let yearStrs = '';
          for (let i = 0; i < yearNumArr.length; i++) {
            yearStrs += '<li id="' + yearNumArr[i] + '"><div class="years">' + yearNumArr[i] + '款</div></li>';
          }
          $("#listType ul").append(yearStrs);

          // 将整体的数据分别插入到对应的年份
          for (let i = 0; i < _self.typeData.length; i++) {
            let curYear = _self.typeData[i].syear;
            $("#" + curYear).append('<div class="info" data-mid="'+ _self.typeData[i].mid +'" data-parea="'+ _self.typeData[i].price_area +'" data-type="'+ _self.typeData[i].type +'"><span class="name">' + _self.typeData[i].name + '</span><span class="price">指导价：' + _self.typeData[i].price + '</span></div>');
          }
          var firstInfo = $("#listType").find("li").eq(0).find(".info").eq(0);
          var firstYear = $("#listType").find("li").eq(0).find(".years").text();
          var curName = firstInfo.find(".name").text();
          var initMid = firstInfo.attr("data-mid");
          $("#type").text(firstYear + " " + curName);
          //初始化车型列表时，将车型的mid写入formData
          _self.formData.mid = initMid;
          _self.parea = firstInfo.attr("data-parea");
          _self.type = firstInfo.attr("data-type");
          $("#usercar").val(initMid);
          $("#listType").find(".info").eq(0).addClass("cur");
        }, (response) => {
          console.log("error:" + response.data);
        });
      },
      initDealerList: function (pserid, cityid, type) {
        $("#dealerList").hide();
        this.dealersLoadFail = false;
        this.loadShow = true;
        this.$http.get('/nxcar/index.php/extend/askedprice/getDinfo?pserid=' + pserid + '&cityid=' + cityid + '&type=' + type).then((response) => {
          var res = $.parseJSON(response.data);
          updateDealerData(store, res.result.list);
          if(res.result.list.length == 0){
            $("#dealerTips,#dealerList").hide();
          }else{
            $("#dealerTips").show();
          }
          //列表渲染完毕后执行函数
          this.$nextTick(function () {
            this.loadShow = false;
            this.dealersLoadFail = false;
            $("#dealerList li").each(function (index) {
              if(index < 3){
                $(this).addClass("cur");
              }
            });
            $("#dealerList").show();
          });
        }, (response) => {
          //加载失败，显示点击重新加载按钮
          this.loadShow = false;
          this.dealersLoadFail = true;
          console.log("error:" + response.data);
        });
      },
      showPro: function () {
        $("#layer").fadeIn(400);
        $("#drawerPro").stop(true).css({
          "top": 0,
          "left": "100%",
          "height": "100%",
          "display": "block"
        }).animate({
          "left": "29%"
        }, 400, function (e) {
          var maxScroll = $("#listGroup").height() - $("#drawerPro").height();
          $("#listGroup li").each(function () {
            $(this).attr("scroll", $(this).get(0).offsetTop > maxScroll ? maxScroll : $(this).get(0).offsetTop);
          });
          Tools.myScroll = new IScroll("#wrapperPro", {
            click : Tools.iScrollClick(),
            deceleration : 0.001,
            taps: true,
            preventDefault:true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
            onScrollMove: function () {
              if ((this.y < this.maxScrollY) && (this.pointY < 1)) {
                this.scrollTo(0, this.maxScrollY, 400);
                return false;
              } else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
                this.scrollTo(0, 0, 400);
                return false;
              }
            }
          });
          document.body.addEventListener('touchmove', Tools.prevent, false);
        });
      },
      showType: function () {
        $("#layer").fadeIn(400);
        $("#drawerType").stop(true).css({
          "top": 0,
          "left": "100%",
          "height": "100%",
          "display": "block"
        }).animate({
          "left": "29%"
        }, 400, function (e) {
          var maxScroll = $("#listType").height() - $("#drawerType").height();
          $("#listType li").each(function () {
            $(this).attr("scroll", $(this).get(0).offsetTop > maxScroll ? maxScroll : $(this).get(0).offsetTop);
          });
          Tools.myScroll = new IScroll("#wrapperType", {
            click : Tools.iScrollClick(),
            deceleration : 0.001,
            taps: true,
            preventDefault:true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
            onScrollMove: function () {
              if ((this.y < this.maxScrollY) && (this.pointY < 1)) {
                this.scrollTo(0, this.maxScrollY, 400);
                return false;
              } else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
                this.scrollTo(0, 0, 400);
                return false;
              }
            }
          });
          document.body.addEventListener('touchmove', Tools.prevent, false);
        });
      },
      hideDrawer: function () {
        $("#layer").fadeOut(400);
        $("#drawerPro,#drawerCity,#drawerType").stop(true).animate({
          "left": "100%"
        }, 400, function () {
          $(this).hide();
          $("#wrapperPro").scrollTop("0");
          $("body").css("height", "auto");
          document.body.removeEventListener('touchmove', Tools.prevent, false);
        });
      },
      initRecommendList: function (pbid, price, type) {
        $("#selectAskList").hide();
        this.recommendLoadFail = false;
        this.recommendLoadShow = true;
        this.$http.get('/nxcar/index.php/extend/carlist/tuijianList/?pbid=' + pbid + '&price=' + price + '&type=' + type).then((response) => {
          if(response.data != [] && response.data != "" && response.data != "[]"){
            this.recommendData = $.parseJSON(response.data);
            updateRecommendData(store, $.parseJSON(response.data));
          }else{
            $("#recommendTips").hide();
          }
          //列表渲染完毕后执行函数
          this.$nextTick(function () {
            this.recommendLoadShow = false;
            this.recommendLoadFail = false;
            $("#selectAskList").show();
          });
        }, (response) => {
          //加载失败，显示点击重新加载按钮
          this.recommendLoadShow = false;
          this.recommendLoadFail = true;
          console.log("error:" + response.data);
        });
      },
      dealersLoadAgain: function () {
        this.initDealerList(this.$route.params.pserid, this.$route.params.cityid, this.$route.params.type);
      },
      recommendLoadAgain: function () {
        this.initRecommendList(this.$route.params.pbid,this.parea,this.type);
      },
      /* 一键询价 */
      fastAsk: function (idx) {
        var list=this.recommendData, _self = this;
        var myPid = list[idx].pserid;
        _self.formData.pserid = myPid;
        _self.formData.did_all = "";
        _self.formData.mid = "";
        _self.formData.is_cms = "728";
        _self.$http.post('/nxcar/index.php/extend/askedprice/askprice', _self.formData).then((response) => {
          var res = $.parseJSON(response.data);
          if( res.status == "200" ||　res.status == 9){//正确返回值应该是200
            self.unSubmit = false;
            alert("询价成功");
          }
          else if(res.status == 8){ //您今天问价次数已达上限
            alert("您今天问价次数已达上限");
          }
          else if(res.status == 10){ //此车型您今天已经问过价了
            alert("此车型您今天已经问过价了");
          }
          else if(res.status == 100){ //当前网络忙，请稍后重试
            alert("当前网络忙，请稍后重试");
          }
        }, (response) => {
          alert("当前网络忙，请稍后重试");
          //alert(response);
        });
      },

      resetUser: function () {
        var self = this;
        $('#username')[0].value = '';
        self.ico.uname.isT = false;
      },
      resetPhone: function () {
        var self = this;
        $('#userphone')[0].value = '';
        self.ico.uphone.isT = false;
      },
      keyupName:function(){
        var self = this;
        if(!$('#username').val() == ""){
            self.ico.uname.isT = true;
        }
        else if($('#username').val() == ""){
            self.ico.uname.isT = false;
        }

      },
      keyupPhone:function(){
        var self = this;
        if($('#userphone').val() == ""){
            self.ico.uphone.isT = false;
        }
        else if(!$('#userphone').val() == ""){
            self.ico.uphone.isT = true;
        }
      },
      setLocalStorage:function(){
        var self = this;
        window.localStorage.setItem("localName", self.formData.name);
        window.localStorage.setItem("localPhone", self.formData.mobile);
        self.$cookie.delete('cookieName');
        self.$cookie.delete('cookiePhone');
      },
      getLocalStorage:function(){
        var self = this;
        var localName = localStorage.getItem("localName")
        var localPhone = localStorage.getItem("localPhone")
        if( localName != null && localName != undefined && localPhone != null && localPhone != undefined){
          $('#username').val(localName);
          $('#userphone').val(localPhone);
        }

      },
      onSubmit: function (e) {
        var self = this, _$dealerList = $("#dealerList"), _$userSelect = $('#userselect');
        var didArr = [];
        $("#dealerList li").each(function () {
          if($(this).hasClass("cur")){
            didArr.push($(this).attr("data-did"));
          }
        });
        // 将did写入formData
        let didAll = didArr.join(',');
        self.formData.did_all = didAll;
        _$userSelect.val(didAll);
        self.$validate(['usercity', 'username', 'userphone', 'userselect'], false, function () {

          if (self.$validation.invalid) {
            e.preventDefault()
          }
          else if (self.$validation.valid) {
            $("#btnSubmit").val(self.subMsg.success);
            //self.isTF.usub.isT = true;
            $('#btnSubmit').attr('disabled','disabled');
            self.isTF.unam.isT = true ;
            self.isTF.uphone.e1.isT = true ;
            self.isTF.uphone.e2.isT = true ;
            self.isTF.ucar.isT = true ;
            //写入source_id
            self.formData.is_cms = "727";
            self.formData.name = $("#username").val();
            self.formData.mobile = $("#userphone").val();

            self.setLocalStorage();

            self.$http.post('/nxcar/index.php/extend/askedprice/askprice', self.formData).then((response) => {
              $("#btnSubmit").val(self.subMsg.default);
              //self.isTF.usub.isT = false;
              $('#btnSubmit').removeAttr('disabled');
              var res = $.parseJSON(response.data);
              if( res.status == "200" ||　res.status == 9){//正确返回值应该是200
                self.unSubmit = false;
                self.initRecommendList(self.$route.params.pbid,self.parea,self.type);
                Tools.myScroll.destroy();
              }
              else if(res.status == 1){ //请认真填写用户名
                self.isTF.unam.isT = false;//后台验证bug 只要@出现在第一位 status为null..

              }
              else if(res.status == 2 || res.status == 3){ //请选择车型
                //console.log("请选择车型");//前端已做判空 且默认被填充

              }
              else if(res.status == 4){ //你的手机号不能进行询价
                self.isTF.uphone.e2.isT = false;

              }
              else if(res.status == 5){ //请填写正确手机号
                self.isTF.uphone.e1.isT = false;

              }
              else if(res.status == 6){ //请选择城市
                //console.log("请选择城市")//这个前端时候已判空

              }
              else if(res.status == 7){ //请正确选择车型
                self.isTF.ucar.isT = false;

              }
              else if(res.status == 8){ //您今天问价次数已达上限
                alert("您今天问价次数已达上限");

              }
              else if(res.status == 10){ //此车型您今天已经问过价了
                alert("此车型您今天已经问过价了");

              }
              else if(res.status == 100){ //当前网络忙，请稍后重试
                alert("当前网络忙，请稍后重试");

              }

            }, (response) => {
              $("#btnSubmit").val(self.subMsg.default);
              //self.isTF.usub.isT = false;
              $('#btnSubmit').removeAttr('disabled');
            });
          }
        });
      }
    },
    store
  }
</script>
