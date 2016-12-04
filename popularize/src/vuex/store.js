/**
 * Created by Xcar on 2016/9/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  city: {
    "cityId" : "375",
    "cityName" : "",
    "provId" : ""
  },
  listData: {},
  brandData: {},
  cityData: {},
  more: {
    isShow : false,
    isHide : false,
    isNone : true
  },
  dealerData: {},
  pserData: {},
  recommendData: {}
}

const mutations = {
  //设置选车页列表数据
  UPDATE_LIST_DATA (state, data){
    state.listData = data
  },
  //设置初始品牌数据
  ADD_BRAND_DATA (state, data){
    state.brandData = data
  },
  //设置初始城市列表数据
  ADD_CITY_DATA (state, data){
    state.cityData = data
  },
  //设置‘收起’‘展开’是否显示
  UPDATE_MORE_OPTIONS (state, data){
    state.more = data
  },
  //设置城市ID
  UPDATE_CITY_ID (state, data){
    state.city = data
  },
  //设置经销商列表数据
  UPDATE_DEALER_DATA (state, data){
    state.dealerData = data
  },
  //设置车型列表数据
  UPDATE_PSER_DATA (state, data){
    state.pserData = data
  },
  //设置推荐列表数据
  UPDATE_RECOMMEND_DATA (state, data){
    state.recommendData = data
  }
}


export default new Vuex.Store({
  state,
  mutations
})
