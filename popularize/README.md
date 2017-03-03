1. 入口页面   index.html

```
<div id="app">
  <router-view></router-view>
</div>

```  

1.1 驱动路由  main.js  
  
  Vue.use(VueRouter)  
  Vue.use(VueResource)

  let router = new VueRouter({
    hashbang : false,
    history : false
  });

  let app = Vue.extend({});

  routerMap(router)  
    
    
`router.start(app,"#app"); ` 但是这个app 是个`Vue component constructor` 构造函数？并没有找到根源    



2.全局路由钩子  routers.js  

````markdown
router.map({ 

'/': {

name: 'index',

title: '爱卡汽车-推广活动',

 `component: Ask,`

 history : true

},

'sub/:pbid/:pserid/:source_id/:type/:name': {

name: 'sub',

title:'爱卡汽车-询问活动',

`component: Sub **哈哈哈**  \*哈哈哈哈啊哈\* `

}

})  
```  

  
        
  
  
2.1 views/ask.vue  

  `import VueResource from 'vue-resource'`
  `import Vuex from 'vuex'`  
  `import HeaderComponent from '../components/header.vue'`
  `import OptionsComponent from '../components/options.vue'`
  `import SelectorComponent from '../components/selector.vue'`
  `import ListComponent from '../components/list.vue'`
  `import SliderComponent from '../components/slider.vue'`
  `import store from '../vuex/store'`
  `import {updateListData, addBrandData, updateMoreOptions, updateCityId} from '../vuex/actions'`    
  
2.2 views/sub.vue  
  import Vue from 'vue'
  import $ from 'jquery'
  `import Vuex from 'vuex'`
  import VueResource from 'vue-resource'
  `import VueValidator from 'vue-validator'`
  `import store from '../vuex/store'`
  import IScroll from '../../dist/lib/js/iscroll'
  import AttachFastClick from '../../dist/lib/js/fastclick.min'
  `import SubSliderComponent from '../components/subSlider.vue'`
  import CityData from '../city.json'
  `import {getCityId, getDealerData, getPserData} from '../vuex/getters'`
  `import {updateDealerData, updatePserData, updateRecommendData} from '../vuex/actions'`
  `import VueCookie from 'vue-cookie'`  
  
2.3 components/header.vue  子集-头部
    空数据？
2.4 components/options.vue 子集-选项横条
    2.4.1 showPro()
    2.4.2 showBrand()
    2.4.3 showLevel()
    2.4.4 showPrice()
2.5 components/slider.vue 子集-选项抽屉
    2.5.1 #drawerPro #drawerCity || #drawerBrand || #drawerLevel || #drawerPrice
    2.5.2 hideDrawer() hideCity()
    2.5.3 checkMoreOptions()??    
    
    
2.6 components/selector.vue 子集-  

  import Vue from 'vue'
  import $ from 'jquery'
  `import store from '../vuex/store'`
  `import {getMoreOptions} from '../vuex/getters'`
  `import { updateMoreOptions } from '../vuex/actions'`  
  2.6.1 changeMoreOptions() 自选选项增多时收起更多选项

2.3 components/header.vue
