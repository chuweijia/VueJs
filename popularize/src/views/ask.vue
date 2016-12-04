<!--suppress ALL -->
<template>
  <!-- 头部 S -->
  <header-component></header-component>
  <!-- 头部 E -->
  <options-component></options-component>
  <div class="content" id="wrap">
    <div id="wrapperBox">
      <selector-component></selector-component>
      <!-- 列表 S -->
      <list-component :list-Data.sync="listData"></list-component>
      <div class="loading" v-show="loadShow" id="loadingTip" style="margin-top:25%;"><i
        class="ico"></i><em>Loading...</em></div>
      <!-- 没有车 S -->
      <div class="cars-null" v-if="loadNone">
        <strong class="sorry">很抱歉</strong><br>
        没有找到符合条件的车
      </div>
      <!-- 没有车 E -->
      <div class="loading" v-if="loadDone">已经到底啦...</div>
      <!-- 加载失败 S -->
      <div class="loading-fail ld-space" v-if="loadFail">
        <a @click="loadAgain" class="ld-wrap">
          <i class="ico"></i>
          <strong>加载失败</strong>
          <span>点击重新加载</span>
        </a>
      </div>
      <!-- 列表 E -->
    </div>
  </div>
  <slider-component :list-Data.sync="listData"></slider-component>
  <!-- 置顶按钮 -->
  <div class="gotop btn-bg" id="goTop" style="display: none;"></div>
</template>
<style>
  #wrap{ width: 100%; height: 100%; padding:79px 0 0; }
  #wrapperBox{ padding-bottom: 0;}
</style>
<script>
  import Vue from 'Vue'
  import VueResource from 'vue-resource'
  import $ from 'jquery'
  import IScroll from '../../dist/lib/js/iscroll'
  import Class_xgeo from '../../dist/lib/js/xgeo'
  import Vuex from 'vuex'
  import HeaderComponent from '../components/header.vue'
  import OptionsComponent from '../components/options.vue'
  import SelectorComponent from '../components/selector.vue'
  import ListComponent from '../components/list.vue'
  import SliderComponent from '../components/slider.vue'
  import AttachFastClick from '../../dist/lib/js/fastclick.min'
  import store from '../vuex/store'
  import LevelData from '../level.json'
  import PriceData from '../price.json'
  import CityData from '../city.json'
  import {updateListData, addBrandData, updateMoreOptions, updateCityId} from '../vuex/actions'

  Vue.use(VueResource)
  Vue.use(Vuex)

  //设置vue-resource延时
  //  Vue.http.interceptors.push((request, next) => {
  //    var timeout;
  //    // 這裡改用 _timeout ，就不會觸發原本的
  //    if (request._timeout) {
  //      // 一樣綁定一個定時器，但是這裡是只要觸發了，就立即返回 response ， 並且這邊自定義了 status 和 statusText
  //      timeout = setTimeout(() => {
  //        next(request.respondWith(request.body, {
  //          status: 0,
  //          statusText: '请求超时'
  //        }));
  //      }, request._timeout);
  //    }
  //    next((response) => {
  //      clearTimeout(timeout);
  //    });
  //  })

  export default{
    data (){
      return {
        listData: [],
        condition: {
          pbid: "",
          price: "",
          type: "",
          cityid: "",
          page: 1
        },
        curProvId: "",
        cityData: {},
        loadFlag: true,
        loadShow: true,
        loadNone: false,
        loadDone: false,
        loadFail: false
      }
    },
    ready () {
      let _self = this;
      AttachFastClick(document.body);
      var preCity = window.localStorage.getItem("cityId");
      if (preCity != null && preCity != undefined && preCity != "") {
        _self.condition.cityid = preCity;
        $("#city").text(window.localStorage.getItem("cityName"));
      }
      _self.init();
      _self.initCity();
//      _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
      _self.initBrand();
      _self.initLevel();
      _self.initPrice();

      //条件切换操作
      // click to choose brand
      $("#listBrand").on("click", "li a", function (e) {
        _self.loadFlag = true;
        _self.condition.page = 1;
        e.preventDefault();
        let _$this = $(this), _name = _$this.find("span").text();
        $("#brand").text(_name);
        _self.hideDrawer();
        _self.condition.pbid = _$this.attr("data-pbid");
        _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
      });

      // click province to choose city
      $("#listGroup").on("click", "li a", function () {
        var citys = _self.cityData;
        var proId = $(this).attr("data-proid");
        _self.curProvId = proId;
        for (let i = 0; i < citys.length; i++) {
          if (citys[i].id == proId) {
            let children = citys[i].children;
            let strs = '';
            for (let j = 0; j < children.length; j++) {
              strs += '<li><a href="javascript:;" class="province-info" data-cityid="' + children[j].id + '"><span>' + children[j].text + '</span></a></li>';
            }
            $("#listCity ul").empty().append(strs);
          }
        }
        $("#drawerCity").css({
          "top": 0,
          "left": "100%",
          "height": $(window).height(),
          "display": "block"
        }).animate({
          "left": "29%"
        }, 400, function (e) {
          Tools.myScroll = new IScroll("#wrapperCity", {
            click: Tools.iScrollClick(),
            deceleration: 0.001,
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

      // click to choose city
      $("#listCity").on("click", "li a", function (e) {
        _self.loadFlag = true;
        _self.condition.page = 1;
        var _$this = $(this), cityName = _$this.text(), cityId = _$this.attr("data-cityid");
        $("#city").text(cityName);
        _self.hideDrawer();
        _self.condition.cityid = cityId;
        window.localStorage.setItem("cityId", cityId);
        window.localStorage.setItem("cityName", cityName);
        window.localStorage.setItem("provId", _self.curProvId);
        let d = new Date();
        localStorage.setItem("locationTime", d.getTime());
        _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
      });

      // click to choose level & price
      $("#wrapperLevel, #wrapperPrice").on("click", " li a", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let _this = $(this);
        _this.hasClass("cur") ? _this.removeClass("cur") : _this.addClass("cur");
      });

      // click ico to delete options
      $("#tags").on("click", "li .ico", function () {
        _self.loadFlag = true;
        _self.condition.page = 1;
        var _$this = $(this), $par = _$this.parents("li"), type = $par.attr("data-type");
        if (type == "level") {
          let lev = $par.attr("data-level"), $lev = $("#levelMark"), levVal = $lev.val();
          if (levVal.indexOf(",") >= 0) {
            let levArr = levVal.split(",");
            let newLevArr = [];
            for (let i = 0; i < levArr.length; i++) {
              if (levArr[i] != lev) {
                newLevArr.push(levArr[i]);
              }
            }
            let types = newLevArr.join(",");
            $lev.val(types);
            _self.condition.type = types;
            _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
          } else {
            //只有一个级别的情况
            $lev.val("");
            _self.condition.type = "";
            _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
          }
          $par.remove();
          $("#wrapperLevel li").each(function () {
            var _$this = $(this);
            if (_$this.find("a").attr("data-level") == lev) {
              _$this.find("a").removeClass("cur");
            }
          });
        } else if (type = "price") {
          let pri = $par.attr("data-price"), $pri = $("#priceMark"), priVal = $pri.val();
          if (priVal.indexOf(",") >= 0) {
            let priArr = priVal.split(",");
            let newPriArr = [];
            for (let i = 0; i < priArr.length; i++) {
              if (priArr[i] != pri) {
                newPriArr.push(priArr[i]);
              }
            }
            let pris = newPriArr.join(",");
            $pri.val(pris);
            _self.condition.price = pris;
            _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
          } else {
            //只有一个价格的情况
            $pri.val("");
            _self.condition.price = "";
            _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
          }
          $par.remove();
          $("#wrapperPrice li").each(function () {
            var _$this = $(this);
            if (_$this.find("a").attr("data-price") == pri) {
              _$this.find("a").removeClass("cur");
            }
          });
        }
        _self.deleteIcoOptions();
      });

      // click "完成" to choose level
      $("#chooseLevel").on("click", function () {
        _self.loadFlag = true;
        _self.condition.page = 1;
        let $lev = $("#levelMark"), levArr = [], txtArr = [], preLev = $lev.val();
        // get current data
        $("#wrapperLevel li").each(function () {
          let _this = $(this), _a = _this.find("a");
          if (_a.hasClass("cur")) {
            levArr.push(_a.attr("data-level"));
            txtArr.push(_a.text());
          }
        });

        if (preLev == levArr.join(",")) {
          _self.hideDrawer();
          return false;
        }

        //如果把级别条件全部清空
        if (levArr.length == 0) {
          $lev.val("");
          $("#tags li").each(function () {
            if ($(this).attr("data-type") == "level") {
              $(this).remove();
            }
          });
          _self.checkMoreOptions();
          _self.hideDrawer();
          _self.condition.type = "";
          _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
          return false;
        }
        else {//所选数据并不为空，也就是说用户选了级别的条件
          //如果之前数据为空，则直接将现在的数据加入到页面
          if (preLev == "") {
            $lev.val(levArr.join(","));
            let strs = '';
            for (let i = 0; i < levArr.length; i++) {
              strs += '<li data-type="level" data-level="' + levArr[i] + '"><span>' + txtArr[i] + '<i class="ico"></i></span></li>';
            }
            $("#tags ul").append(strs);
          }
          //如果之前数据不为空，且只有一个
          else if (preLev != "" && preLev.indexOf(",") < 0) {
            let strs = '';
            for (let i = 0; i < levArr.length; i++) {
              if (levArr[i] != preLev) {
                strs += '<li data-type="level" data-level="' + levArr[i] + '"><span>' + txtArr[i] + '<i class="ico"></i></span></li>';
                $lev.val($lev.val() + "," + levArr[i]);
              }
            }
            $("#tags ul").append(strs);
          }
          //如果之前数据不为空，且多于一个
          else if (preLev != "" && preLev.indexOf(',') >= 0) {
            let strs = '', oldLevArr = preLev.split(",");
            //排除本次新关闭的选项
            for (let i = 0; i < oldLevArr.length; i++) {
              var flag = true;
              for (let j = 0; j < levArr.length; j++) {
                if (oldLevArr[i] == levArr[j]) {
                  flag = false;
                }
              }
              if (flag) {
                $("#tags li").each(function () {
                  if ($(this).attr("data-level") == oldLevArr[i]) {
                    $(this).remove();
                  }
                });
              }
            }
            //获取本次新增的选项
            for (let i = 0; i < levArr.length; i++) {
              var flags = true;
              for (let j = 0; j < oldLevArr.length; j++) {
                if (levArr[i] == oldLevArr[j]) {
                  flags = false;
                }
              }
              if (flags) {
                strs += '<li data-type="level" data-level="' + levArr[i] + '"><span>' + txtArr[i] + '<i class="ico"></i></span></li>';
              }
            }
            $lev.val(levArr.join(","));
            $("#tags ul").append(strs);
          }
          _self.checkMoreOptions();
          _self.hideDrawer();
          _self.condition.type = $lev.val();
          _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
        }
      });
      // click "完成" to choose price
      $("#choosePrice").on("click", function (e) {
        _self.loadFlag = true;
        _self.condition.page = 1;
        let $pri = $("#priceMark"), priArr = [], txtArr = [], prePri = $pri.val();
        // get current data
        $("#wrapperPrice li").each(function () {
          let _this = $(this), _a = _this.find("a");
          if (_a.hasClass("cur")) {
            priArr.push(_a.attr("data-price"));
            txtArr.push(_a.text());
          }
        });

        if (prePri == priArr.join(",")) {
          _self.hideDrawer();
          return false;
        }

        //如果把价格条件全部清空
        if (priArr.length == 0) {
          $pri.val("");
          $("#tags li").each(function () {
            if ($(this).attr("data-type") == "price") {
              $(this).remove();
            }
          });
          _self.checkMoreOptions();
          _self.hideDrawer();
          _self.condition.price = "";
          _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
          return false;
        }
        else {
          // compare with old data
          if (prePri == "") {
            $pri.val(priArr.join(","));
            let strs = '';
            for (let i = 0; i < priArr.length; i++) {
              strs += '<li data-type="price" data-price="' + priArr[i] + '"><span>' + txtArr[i] + '<i class="ico"></i></span></li>';
            }
            $("#tags ul").append(strs);
          }
          else if (prePri != "" && prePri.indexOf(",") < 0) {
            let strs = '';
            for (let i = 0; i < priArr.length; i++) {
              if (priArr[i] != prePri) {
                strs += '<li data-type="price" data-price="' + priArr[i] + '"><span>' + txtArr[i] + '<i class="ico"></i></span></li>';
                $pri.val($pri.val() + "," + priArr[i]);
              }
            }
            $("#tags ul").append(strs);
          }
          else if (prePri != "" && prePri.indexOf(',') >= 0) {
            let strs = '', oldPriArr = prePri.split(",");
            //排除本次新关闭的选项
            for (let i = 0; i < oldPriArr.length; i++) {
              var flag = true;
              for (let j = 0; j < priArr.length; j++) {
                if (oldPriArr[i] == priArr[j]) {
                  flag = false;
                }
              }
              if (flag) {
                $("#tags li").each(function () {
                  if ($(this).attr("data-price") == oldPriArr[i]) {
                    $(this).remove();
                  }
                });
              }
            }
            //获取本次新增的选项
            for (let i = 0; i < priArr.length; i++) {
              var flags = true;
              for (let j = 0; j < oldPriArr.length; j++) {
                if (priArr[i] == oldPriArr[j]) {
                  flags = false;
                }
              }
              if (flags) {
                strs += '<li data-type="price" data-price="' + priArr[i] + '"><span>' + txtArr[i] + '<i class="ico"></i></span></li>';
              }
            }
            $pri.val(priArr.join(","));
            $("#tags ul").append(strs);
          }
        }
        _self.checkMoreOptions();
        _self.hideDrawer();
        _self.condition.price = $pri.val();
        _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
      });

      //回到顶部
      $("#goTop").click(function () {
        $('html,body').stop(true).animate({
          scrollTop : "0px"
        },400);
        $("#goTop").fadeOut(400);
      });
    },
    methods: {
      init: function () {
        let more = {
          isShow: false,
          isHide: false,
          isNone: true,
        };
        updateMoreOptions(store, more);
      },
      initScroll: function (e) {
        let _self = this;
        var _thisHeight = $("#wrapperBox").height() + 79;
        var _top = $(window).scrollTop();
        var _winHeight = $(window).height();
        //显示回到顶部
        if (_top > 1.5 * _winHeight && $("#goTop").is(":hidden")) {
          $("#goTop").fadeIn(400);
        } else if (_top <= 1.5 * _winHeight && !$("#goTop").is(":hidden")) {
          $("#goTop").fadeOut(400);
        }
        if(_thisHeight <= _top + _winHeight){//到达底部
          if (!_self.loadFlag) {
            return false;
          }
          _self.loadShow = true;
          _self.loadDone = false;
          _self.loadFlag = false;
          _self.condition.page = Number(_self.condition.page) + 1;
          //显示出底部加载的样式，内容向上滚动相应的高度
          $(window).scrollTop(_top + 67);
          _self.$http.get('/nxcar/index.php/extend/carlist/carList/?pbid=' + _self.condition.pbid + '&price=' + _self.condition.price + '&type=' + _self.condition.type + '&cityid=' + _self.condition.cityid + '&page=' + _self.condition.page).then((response) => {
            if (response.data != [] && response.data != "" && response.data != "[]") {
              let moreData = $.parseJSON(response.data);
              //本次请求数据已经不足20条了
              if (moreData.length < 20) {
                _self.loadFlag = false;
              }
              for (let i = 0; i < moreData.length; i++) {
                _self.listData.push(moreData[i]);
              }
              updateListData(store, _self.listData);
              _self.$nextTick(function () {
                $("#wrap").scrollTop(_thisHeight - _winHeight + 67);
                _self.loadShow = false;
                // 将开关设为开，允许请求更多
                _self.loadFlag = true;
              });
            } else {
              _self.loadFlag = false;
              _self.loadShow = false;
              _self.loadDone = true;
            }
          }, (response) => {
            _self.loadShow = false;
            _self.loadDone = false;
            _self.loadFail = true;
            _self.loadFlag = true;
          });
        }
      },
      initList: function (pbid, price, type, cityid, page) {
        var _self = this;
        $("#carList").hide();
        $("#loadingTip").css("margin-top", "25%");
        this.loadShow = true;
        this.loadNone = false;
        this.loadDone = false;
        this.loadFail = false;
        this.$http.get('/nxcar/index.php/extend/carlist/carList/?pbid=' + pbid + '&price=' + price + '&type=' + type + '&cityid=' + cityid + '&page=' + page, {timeout: 5000}).then((response) => {
          if (response.data != [] && response.data != "" && response.data != "[]") {
            this.listData = $.parseJSON(response.data);
            updateListData(store, $.parseJSON(response.data));
            //本次请求数据已经不足20条了
            if (this.listData.length < 20) {
              this.loadFlag = false;
            }
          } else {
            this.loadFlag = false;
            updateListData(store, {});
            this.loadNone = true;
          }
          //列表渲染完毕后执行函数
          this.$nextTick(function () {
            this.loadShow = false;
            $("#loadingTip").css("margin-top", "0");
            $("#carList").show();
            $(window).scroll(function () {
              _self.initScroll();
            });
          });
        }, (response) => {
          this.loadShow = false;
          $("#loadingTip").css("margin-top", "0");
          this.loadFail = true;
        });
      },
      initCity: function () {
        var _self = this;
        let citys = CityData;
        this.cityData = citys;
        //判断是否需要重新定位
        var preLocationTime = localStorage.getItem("locationTime");
        var needLocation;
        if (preLocationTime != null && preLocationTime != undefined && preLocationTime != "") {
          var n = new Date();
          needLocation = _self.checkTime(n.getTime(), preLocationTime, 1800000);
        } else {
          needLocation = true;
        }
        var curCityId = "";
        if (_self.condition.cityid == "") {
          window.xgeo = new Class_xgeo(citys);
          xgeo.getlocation(function (e, d) {
            if (!e.code) {
              var cityInfo = d;
              if (cityInfo != null && cityInfo != undefined && cityInfo != {}) {// 如果定位成功，筛选所在城市的内容
                curCityId = cityInfo.cityid;
                var obj = window.xgeo.idtoname(curCityId);
                $("#city").text(obj.city);
                _self.condition.cityid = curCityId;
                window.localStorage.setItem("cityId", curCityId);
                window.localStorage.setItem("cityName", obj.city);
                window.localStorage.setItem("provId", cityInfo.prov);
                let d = new Date();
                localStorage.setItem("locationTime", d.getTime());
              }
              _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
            } else {
              let d = new Date();
              localStorage.setItem("locationTime", d.getTime());
              _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
            }
          });
          xgeo.getcoords(function (e, d) {
            console.log(d);
          });
        } else if (_self.condition.cityid != "" && needLocation) {
          window.xgeo = new Class_xgeo(citys);
          xgeo.getlocation(function (e, d) {
            if (!e.code) {
              var nowCityInfo = d;
              if (nowCityInfo != null && nowCityInfo != undefined && nowCityInfo != {}) {// 如果定位成功，筛选所在城市的内容
                curCityId = nowCityInfo.cityid;
                var obj = xgeo.idtoname(curCityId);
                if (curCityId != _self.condition.cityid) {//所选城市跟当前定位城市不一样
                  var userChange = confirm("系统定位到您在" + obj.city + "，需要切换至" + obj.city + "吗？");
                  if (userChange) {
                    $("#city").text(obj.city);
                    _self.condition.cityid = curCityId;
                    window.localStorage.setItem("cityId", curCityId);
                    window.localStorage.setItem("cityName", obj.city);
                    window.localStorage.setItem("provId", nowCityInfo.prov);
                  }
                  let d = new Date();
                  localStorage.setItem("locationTime", d.getTime());
                }
              }
              _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
            } else {
              let d = new Date();
              localStorage.setItem("locationTime", d.getTime());
              _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
            }
          });
          xgeo.getcoords(function (e, d) {
            console.log(d);
          });
        } else {
          _self.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
        }

        // set province data
        for (let i = 0; i < citys.length; i++) {
          let l = citys[i].letter.toUpperCase();
          var $box = $("#listGroup"), $dl = $box.find("li[data-id=" + l + "]");
          if ($dl != null) {
            let letter = citys[i].text.toUpperCase();
            $dl.append('<a href="javascript:;" class="province-info" data-proid="' + citys[i].id + '"><span>' + letter + '</span></a>').show();
            $("#letterNavPro li[data-id=" + l + "]").addClass("dis");
          }
        }

        // province letter nav
        var count = 1;
        $("#letterNavPro li").each(function () {
          if ($(this).hasClass("dis")) {
            count++;
          }else{
            $(this).remove();
          }
        });
        var $letter = $("#letterNavPro");
        $letter.find("li").height(($(window).height()-80)/count);
        $letter.height(count * $letter.find("li").height());
        $letter.css("top","15px").show();

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
      initBrand: function () {
        this.$http.get('/nxcar/index.php/extend/carlist/brandList/').then((response) => {
          let brands = $.parseJSON(response.data);
          addBrandData(store, brands);
          $.each(brands, function (key, value) {
            var l = key, v = value;
            var $box = $("#listBrand"), $dl = $box.find("li[data-id=" + l + "]");
            if ($dl != null) {
              for (let j = 0; j < v.length; j++) {
                $dl.append('<a class="province-info" data-pbid = "' + v[j].pbid + '"><span><i class="logo"><img src="' + v[j].ico_img + '" alt="" width="28"></i>' + v[j].name + '</span></a>').show();
              }
              $("#letterNavBrand li[data-id=" + l + "]").addClass("dis");
            }
          });

          // brand letter nav
          var countBrand = 1;
          $("#letterNavBrand li").each(function () {
            if ($(this).hasClass("dis")) {
              countBrand++;
            }else{
              $(this).remove();
            }
          });
          var $letterBrand = $("#letterNavBrand");
          $letterBrand.find("li").height(($(window).height()-80)/countBrand);
          $letterBrand.height(countBrand * $letterBrand.find("li").height());
          $letterBrand.css("top","15px").show();

          // brand letter nav
          var evtIdBrand;
          $("#letterNavBrand li a").on("touchstart", function (event) {
            event.preventDefault();
            evtIdBrand = event.target.innerText;
          });
          $("#letterNavBrand li a").on("touchmove", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var x = event.originalEvent.changedTouches[0].clientX;
            var y = event.originalEvent.changedTouches[0].clientY;
            var target = document.elementFromPoint(x, y);
            var cn = $(target.parentNode.parentNode).get(0).className;
            if (cn == "letter-box") {
              evtIdBrand = $(target).get(0).innerText;
              Tools.myScroll.scrollTo(0, -$("#listBrand li[data-id='" + evtIdBrand + "']").attr("scroll"), 30, IScroll.utils.ease.elastic);
            } else {
              //$(".layer-tips").hide();
            }
          });
          $("#letterNavBrand li a").on("touchend", function (event) {
            event.preventDefault();
            Tools.myScroll.scrollTo(0, -$("#listBrand li[data-id='" + evtIdBrand + "']").attr("scroll"), 30);
          });
        }, (response) => {
          console.log("error:" + response.data);
        })
      },
      initLevel: function () {
        let levels = LevelData;
        //set level data
        $.each(levels, function (key, value) {
          var l = key, v = value;
          var $box = $("#wrapperLevel ul");
          $box.append('<li><a class="info" data-level="' + l + '">' + v + '</a></li>');
        });
      },
      initPrice: function () {
        var prices = PriceData;
        //set price data
        $.each(prices, function (key, value) {
          var l = key, v = value;
          var $box = $("#wrapperPrice ul");
          $box.append('<li><a class="info" data-price="' + l + '">' + v + '</a></li>');
        });
      },
      hideDrawer: function () {
        $("#layer").fadeOut(400);
        $("#drawerPro,#drawerCity,#drawerBrand,#drawerLevel,#drawerPrice").animate({
          "left": "100%"
        }, 400, function () {
          $(this).hide();
          $("#wrapperPro").scrollTop("0");
          $("body").css("height", "auto");
          document.body.removeEventListener('touchmove', Tools.prevent, false);
        });
      },
      checkMoreOptions: function () {
        let _$tag = $("#tags"), _$more = $("#moreOptions");
        if (_$tag.find("li").length > 6) {
          let more = {
            isShow: true,
            isHide: false,
            isNone: false
          };
          updateMoreOptions(store, more);
          _$tag.height(100).css("overflow", "hidden");
          _$more.text("展开");
        } else {
          let more = {
            isShow: false,
            isHide: false,
            isNone: true
          };
          updateMoreOptions(store, more);
          _$tag.height("auto").css("overflow", "visible");
        }
      },
      deleteIcoOptions: function () {
        let _$tag = $("#tags"), _$more = $("#moreOptions");
        if (_$tag.find("li").length > 6) {
          //不进行任何操作
        } else {
          let more = {
            isShow: false,
            isHide: false,
            isNone: true
          };
          updateMoreOptions(store, more);
          _$tag.height("auto").css("overflow", "visible");
        }
      },
      checkTime: function (nowTime, localTime, space) {
        return (Number(nowTime) - Number(localTime)) > Number(space);
      },
      loadAgain: function () {
        var _self = this;
        this.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);
      }
    },
    components: {
      HeaderComponent,
      OptionsComponent,
      SelectorComponent,
      ListComponent,
      SliderComponent
    },
    store
  }
</script>
