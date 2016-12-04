<template id="sliderTpl">
  <!-- 每个弹框最外层div的类名不同，可供开发控制弹框显示/隐藏 -->
  <!-- 选择省份弹层 S -->
  <div class="pop-content province-mode" id="drawerPro">
    <div class="title row">
      <span class="close" @click="hideDrawer">关闭</span>
      <span class="txt">选择省份</span>
    </div>
    <div class="container">
      <!-- 滚动区 S -->
      <div id="wrapperPro" class="wrapper">
        <div class="list-group" id="listGroup">
          <ul class="letter-index">
            <li data-id="A">
              <span class="txt">A</span>
            </li>
            <li data-id="B">
              <span class="txt">B</span>
            </li>
            <li data-id="C">
              <span class="txt">C</span>
            </li>
            <li data-id="D">
              <span class="txt">D</span>
            </li>
            <li data-id="E">
              <span class="txt">E</span>
            </li>
            <li data-id="F">
              <span class="txt">F</span>
            </li>
            <li data-id="G">
              <span class="txt">G</span>
            </li>
            <li data-id="H">
              <span class="txt">H</span>
            </li>
            <li data-id="I">
              <span class="txt">I</span>
            </li>
            <li data-id="J">
              <span class="txt">J</span>
            </li>
            <li data-id="K">
              <span class="txt">K</span>
            </li>
            <li data-id="L">
              <span class="txt">L</span>
            </li>
            <li data-id="M">
              <span class="txt">M</span>
            </li>
            <li data-id="N">
              <span class="txt">N</span>
            </li>
            <li data-id="O">
              <span class="txt">O</span>
            </li>
            <li data-id="P">
              <span class="txt">P</span>
            </li>
            <li data-id="Q">
              <span class="txt">Q</span>
            </li>
            <li data-id="R">
              <span class="txt">R</span>
            </li>
            <li data-id="S">
              <span class="txt">S</span>
            </li>
            <li data-id="T">
              <span class="txt">T</span>
            </li>
            <li data-id="U">
              <span class="txt">U</span>
            </li>
            <li data-id="V">
              <span class="txt">V</span>
            </li>
            <li data-id="W">
              <span class="txt">W</span>
            </li>
            <li data-id="X">
              <span class="txt">X</span>
            </li>
            <li data-id="Y">
              <span class="txt">Y</span>
            </li>
            <li data-id="Z">
              <span class="txt">Z</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 滚动区 E -->
      <!-- 字母索引 S -->
      <ul class="letter-box" id="letterNavPro">
        <li data-id="A"><a href="javascript:;">A</a></li>
        <li data-id="B"><a href="javascript:;">B</a></li>
        <li data-id="C"><a href="javascript:;">C</a></li>
        <li data-id="D"><a href="javascript:;">D</a></li>
        <li data-id="E"><a href="javascript:;">E</a></li>
        <li data-id="F"><a href="javascript:;">F</a></li>
        <li data-id="G"><a href="javascript:;">G</a></li>
        <li data-id="H"><a href="javascript:;">H</a></li>
        <li data-id="I"><a href="javascript:;">I</a></li>
        <li data-id="J"><a href="javascript:;">J</a></li>
        <li data-id="K"><a href="javascript:;">K</a></li>
        <li data-id="L"><a href="javascript:;">L</a></li>
        <li data-id="M"><a href="javascript:;">M</a></li>
        <li data-id="N"><a href="javascript:;">N</a></li>
        <li data-id="O"><a href="javascript:;">O</a></li>
        <li data-id="P"><a href="javascript:;">P</a></li>
        <li data-id="Q"><a href="javascript:;">Q</a></li>
        <li data-id="R"><a href="javascript:;">R</a></li>
        <li data-id="S"><a href="javascript:;">S</a></li>
        <li data-id="T"><a href="javascript:;">T</a></li>
        <li data-id="U"><a href="javascript:;">U</a></li>
        <li data-id="V"><a href="javascript:;">V</a></li>
        <li data-id="W"><a href="javascript:;">W</a></li>
        <li data-id="X"><a href="javascript:;">X</a></li>
        <li data-id="Y"><a href="javascript:;">Y</a></li>
        <li data-id="Z"><a href="javascript:;">Z</a></li>
      </ul>
      <!-- 字母索引 E -->
    </div>
  </div>
  <!-- 选择省份弹层 E -->

  <!-- 选择城市弹层 S -->
  <div class="pop-content city-mode" id="drawerCity">
    <div class="title row">
      <span class="close" @click="hideDrawer">关闭</span>
      <a href="javascript:;" class="back" @click="hideCity">返回</a>
      <span class="txt">选择城市</span>
    </div>
    <div class="container">
      <!-- 滚动区 S -->
      <div id="wrapperCity" class="wrapper">
        <div class="list-group" id="listCity">
          <ul class="letter-index">
          </ul>
        </div>
      </div>
      <!-- 滚动区 E -->
    </div>
  </div>
  <!-- 选择城市弹层 E -->

  <!-- 选择品牌弹层 S -->
  <div class="pop-content brand-mode" id="drawerBrand">
    <div class="title row">
      <span class="close" @click="hideDrawer">关闭</span>
      <span class="txt">选择品牌</span>
    </div>
    <div class="container">
      <!-- 滚动区 S -->
      <div id="wrapperBrand" class="wrapper">
        <div class="list-group" id="listBrand">
          <ul class="letter-index">
            <li data-id="A">
              <span class="txt">A</span>
            </li>
            <li data-id="B">
              <span class="txt">B</span>
            </li>
            <li data-id="C">
              <span class="txt">C</span>
            </li>
            <li data-id="D">
              <span class="txt">D</span>
            </li>
            <li data-id="E">
              <span class="txt">E</span>
            </li>
            <li data-id="F">
              <span class="txt">F</span>
            </li>
            <li data-id="G">
              <span class="txt">G</span>
            </li>
            <li data-id="H">
              <span class="txt">H</span>
            </li>
            <li data-id="I">
              <span class="txt">I</span>
            </li>
            <li data-id="J">
              <span class="txt">J</span>
            </li>
            <li data-id="K">
              <span class="txt">K</span>
            </li>
            <li data-id="L">
              <span class="txt">L</span>
            </li>
            <li data-id="M">
              <span class="txt">M</span>
            </li>
            <li data-id="N">
              <span class="txt">N</span>
            </li>
            <li data-id="O">
              <span class="txt">O</span>
            </li>
            <li data-id="P">
              <span class="txt">P</span>
            </li>
            <li data-id="Q">
              <span class="txt">Q</span>
            </li>
            <li data-id="R">
              <span class="txt">R</span>
            </li>
            <li data-id="S">
              <span class="txt">S</span>
            </li>
            <li data-id="T">
              <span class="txt">T</span>
            </li>
            <li data-id="U">
              <span class="txt">U</span>
            </li>
            <li data-id="V">
              <span class="txt">V</span>
            </li>
            <li data-id="W">
              <span class="txt">W</span>
            </li>
            <li data-id="X">
              <span class="txt">X</span>
            </li>
            <li data-id="Y">
              <span class="txt">Y</span>
            </li>
            <li data-id="Z">
              <span class="txt">Z</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 滚动区 E -->
      <!-- 字母索引 S -->
      <ul class="letter-box" id="letterNavBrand">
        <li data-id="A"><a href="javascript:;">A</a></li>
        <li data-id="B"><a href="javascript:;">B</a></li>
        <li data-id="C"><a href="javascript:;">C</a></li>
        <li data-id="D"><a href="javascript:;">D</a></li>
        <li data-id="E"><a href="javascript:;">E</a></li>
        <li data-id="F"><a href="javascript:;">F</a></li>
        <li data-id="G"><a href="javascript:;">G</a></li>
        <li data-id="H"><a href="javascript:;">H</a></li>
        <li data-id="I"><a href="javascript:;">I</a></li>
        <li data-id="J"><a href="javascript:;">J</a></li>
        <li data-id="K"><a href="javascript:;">K</a></li>
        <li data-id="L"><a href="javascript:;">L</a></li>
        <li data-id="M"><a href="javascript:;">M</a></li>
        <li data-id="N"><a href="javascript:;">N</a></li>
        <li data-id="O"><a href="javascript:;">O</a></li>
        <li data-id="P"><a href="javascript:;">P</a></li>
        <li data-id="Q"><a href="javascript:;">Q</a></li>
        <li data-id="R"><a href="javascript:;">R</a></li>
        <li data-id="S"><a href="javascript:;">S</a></li>
        <li data-id="T"><a href="javascript:;">T</a></li>
        <li data-id="U"><a href="javascript:;">U</a></li>
        <li data-id="V"><a href="javascript:;">V</a></li>
        <li data-id="W"><a href="javascript:;">W</a></li>
        <li data-id="X"><a href="javascript:;">X</a></li>
        <li data-id="Y"><a href="javascript:;">Y</a></li>
        <li data-id="Z"><a href="javascript:;">Z</a></li>
      </ul>
      <!-- 字母索引 E -->
    </div>
  </div>
  <!-- 选择品牌弹层 E -->

  <!-- 选择价格弹层 S -->
  <div class="pop-content price-mode" id="drawerPrice">
    <div class="title row">
      <span class="close" @click="hideDrawer">关闭</span>
      <span class="txt">选择价格</span>
    </div>
    <div class="container">
      <!-- 滚动区 S -->
      <div id="wrapperPrice" class="wrapper">
        <ul class="select-tag row">
        </ul>
        <input type="hidden" value="" id="priceMark">
      </div>
      <!-- 滚动区 E -->
    </div>
    <!-- btn已设置始终固定在屏幕最下方 -->
    <div class="action-btn">
      <ul class="row">
        <li><a id="choosePrice" href="javascript:" class="btn finish">完成</a></li>
      </ul>
    </div>
  </div>
  <!-- 选择价格弹层 E -->

  <!-- 选择级别弹层 S -->
  <div class="pop-content price-mode" id="drawerLevel">
    <div class="title row">
      <span class="close" @click="hideDrawer">关闭</span>
      <span class="txt">选择级别</span>
    </div>
    <div class="container">
      <!-- 滚动区 S -->
      <div id="wrapperLevel" class="wrapper">
        <ul class="select-tag row"></ul>
        <input type="hidden" value="" id="levelMark">
      </div>
      <!-- 滚动区 E -->
    </div>
    <!-- btn已设置始终固定在屏幕最下方 -->
    <div class="action-btn">
      <ul class="row">
        <li><a id="chooseLevel" href="javascript:" class="btn finish">完成</a></li>
      </ul>
    </div>
  </div>
  <!-- 选择级别弹层 E -->
  <div class="pop" id="layer" @click="hideDrawer"></div>
</template>
<style>
  #drawerPro, #drawerCity, #drawerBrand, #drawerLevel, #drawerPrice {
    display: none;
  }

  #letterNavPro, #letterNavBrand {
    display: none;
    top: 50%;
  }

  #letterNavPro li, #letterNavBrand li {
    display: none;
    height: 16px;
  }

  #letterNavPro li.dis, #letterNavBrand li.dis {
    display: block;
  }

  #letterNavPro li a, #letterNavBrand li a {
    height: 16px;
  }

  #listGroup li, #listBrand li {
    display: none;
  }

  #layer {
    display: none;
  }
  #drawerLevel .container, #drawerPrice .container{
    box-sizing: border-box;
    height: 100%;
    position: relative;
  }
  #wrapperPrice,#wrapperLevel{
    height:100%;
  }
  #wrapperPrice ul,#wrapperLevel ul{
    padding-bottom: 100px;
  }
</style>
<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import $ from 'jquery'
  import IScroll from '../../dist/lib/js/iscroll'
  import store from '../vuex/store'
  import { updateMoreOptions } from '../vuex/actions'

  Vue.use(VueResource)

  export default{
    ready () {
    },
    methods: {
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
        let _$tag = $("#tags");
        if(_$tag.height() > 100){
          let more = {
            isShow : true,
            isHide : false,
            isNone : false,
          };
          updateMoreOptions(store, more);
        }
      },
      hideCity: function () {
        $("#drawerCity").animate({
          "left": "100%"
        }, 400, function () {
          $(this).hide();
        });
      }
    },
    store
  }
</script>
