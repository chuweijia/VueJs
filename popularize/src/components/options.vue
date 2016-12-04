<template>
  <!-- 分类 S -->
  <ul class="select-cars-type row" id="selector">
    <li><a @click="showPro" class="item" id="city" data-id="">城市</a><i class="line"></i></li>
    <li><a @click="showBrand" class="item" id="brand">品牌</a><i class="line"></i></li>
    <li><a @click="showLevel" class="item">级别</a><i class="line"></i></li>
    <li><a @click="showPrice" class="item">价格</a></li>
  </ul>
  <!-- 分类 E -->
</template>
<style>
  #selector{ position: fixed;
    top:40px;
  width: 100%;
  z-index: 5;
    padding: 0;
    background-color: #fff;
  }
</style>
<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import IScroll from '../../dist/lib/js/iscroll'

  export default{
      data(){
          return{
          }
      },
      methods : {
        showPro : function (e) {
          $("#layer").fadeIn(400);
          $("#drawerPro").stop(true).css({
            "top": 0,
            "left" : "100%",
            "height" : "100%",
            "display": "block"
          }).animate({
            "left": "29%"
          }, 400, function (e) {
            var maxScroll = $("#listGroup").height() - $("#drawerPro").height();
            $("#listGroup li").each(function () {
              $(this).attr("scroll",$(this).get(0).offsetTop > maxScroll ? maxScroll : $(this).get(0).offsetTop);
            });
            Tools.myScroll = new IScroll("#wrapperPro", {
              click : Tools.iScrollClick(),
              deceleration : 0.001,
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
            document.body.addEventListener('touchmove',Tools.prevent, false);
          });
        },
        showBrand : function () {
          $("#layer").fadeIn(400);
          $("#drawerBrand").stop(true).css({
            "top": 0,
            "left" : "100%",
            "height" : "100%",
            "display": "block"
          }).animate({
            "left": "29%"
          }, 400, function (e) {
            var maxScroll = $("#listBrand").height() - $("#drawerBrand").height();
            $("#listBrand li").each(function () {
              $(this).attr("scroll",$(this).get(0).offsetTop > maxScroll ? maxScroll : $(this).get(0).offsetTop);
            });
            Tools.myScroll = new IScroll("#wrapperBrand", {
              click : Tools.iScrollClick(),
              deceleration : 0.001,
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
            document.body.addEventListener('touchmove',Tools.prevent, false);
          });
        },
        showLevel : function () {
          $("#wrapperLevel li a").removeClass("cur");
          var _$lev = $("#levelMark"), _lev = _$lev.val(),levArr = [];
          if(_lev.indexOf(",") > -1){
            levArr = _lev.split(",");
            for( let i = 0; i < levArr.length; i++){
              $("#wrapperLevel li a").each(function () {
                var _$this = $(this);
                if(_$this.attr("data-level") == levArr[i] && !_$this.hasClass("cur")){
                  _$this.addClass("cur");
                }
              });
            }
          }else if(_lev != ""){
            $("#wrapperLevel li a").each(function () {
              var _$this = $(this);
              if(_$this.attr("data-level") == _lev && !_$this.hasClass("cur")){
                _$this.addClass("cur");
              }
            });
          }
          $("#layer").fadeIn(400);
          $("#drawerLevel").stop(true).css({
            "top": 0,
            "left" : "100%",
            "height" : "100%",
            "display": "block"
          }).animate({
            "left": "29%"
          }, 400, function (e) {
            document.body.addEventListener('touchmove',Tools.prevent, false);
          });
        },
        showPrice : function () {
          $("#wrapperPrice li a").removeClass("cur");
          var _$pri = $("#priceMark"), _pri = _$pri.val(),priArr = [];
          if(_pri.indexOf(",") > -1){
            priArr = _pri.split(",");
            for( let i = 0; i < priArr.length; i++){
              $("#wrapperPrice li a").each(function () {
                var _$this = $(this);
                if(_$this.attr("data-price") == priArr[i] && !_$this.hasClass("cur")){
                  _$this.addClass("cur");
                }
              });
            }
          }else if(_pri != ""){
            $("#wrapperPrice li a").each(function () {
              var _$this = $(this);
              if(_$this.attr("data-price") == _pri && !_$this.hasClass("cur")){
                _$this.addClass("cur");
              }
            });
          }
          $("#layer").fadeIn(400);
          $("#drawerPrice").stop(true).css({
            "top": 0,
            "left" : "100%",
            "height" : "100%",
            "display": "block"
          }).animate({
            "left": "29%"
          }, 400, function (e) {
            document.body.addEventListener('touchmove',Tools.prevent, false);
          });
        },
      }
  }
</script>
