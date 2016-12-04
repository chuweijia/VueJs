import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './routers'
import $ from 'jquery'
require('./assets/css/layout.css')

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  hashbang : false,
  history : false
});

let app = Vue.extend({});

routerMap(router)

router.start(app,"#app");

/**
 * global function
 * @use-like : Tools.prevent
 */
global.Tools = {
  winHeight : $(window).height(),
  pageScroll : {},
  myScroll : {},
  prevent : function (event) {
    event.preventDefault();
  },
  iScrollClick : function () {
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
      var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
      return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
  }
};
