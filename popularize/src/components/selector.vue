<template>
  <!-- 标签 S -->
  <div class="tags-mode">
    <div class="tag-group row" id="tags">
      <ul></ul>
    </div>
    <!-- 默认类名为 .show  收起状态时添加类名 .hide -->
    <div v-bind:class="{'show' : options.isShow, 'hide' : options.isHide, 'none' : options.isNone}" ><a id="moreOptions" @click="changeMoreOptions">收起</a></div>
  </div>
  <!-- 标签 E -->
</template>
<style>
  .tags-mode .none{ display: none;}
</style>
<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import store from '../vuex/store'
  import {getMoreOptions} from '../vuex/getters'
  import { updateMoreOptions } from '../vuex/actions'

  export default{
    vuex : {
      getters : {
        options : getMoreOptions
      }
    },
    ready (){
    },
    methods : {
      changeMoreOptions : function (e) {
        e.preventDefault();
        e.stopPropagation(true);
        let _$more = $("#moreOptions");
        if(_$more.text() == "展开"){
          let _$tag = $("#tags");
          _$tag.height("auto").css("overflow","visible");
          let more = {
            isShow : true,
            isHide : true,
            isNone : false
          };
          updateMoreOptions(store, more);
          _$more.text("收起");
        }else if(_$more.text() == "收起"){
          let _$tag = $("#tags");
          _$tag.height(100).css("overflow","hidden");
          let more = {
            isShow : true,
            isHide : false,
            isNone : false
          };
          updateMoreOptions(store, more);
          _$more.text("展开");
        }
      }
    }
  }
</script>
