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

      `component: Sub `

    }

  })  
```  

  
        
  
  
2.1 views/ask.vue  

```markdown

  import Vue from 'Vue'
  import VueResource from 'vue-resource'
  import $ from 'jquery'
  import IScroll from '../../dist/lib/js/iscroll'
  import Class_xgeo from '../../dist/lib/js/xgeo'
  `import Vuex from 'vuex'`
  `import HeaderComponent from '../components/header.vue'`
  `import OptionsComponent from '../components/options.vue'`
  `import SelectorComponent from '../components/selector.vue'`
  `import ListComponent from '../components/list.vue'`
  `import SliderComponent from '../components/slider.vue'`
  import AttachFastClick from '../../dist/lib/js/fastclick.min'
  `import store from '../vuex/store'`
  import LevelData from '../level.json'
  import PriceData from '../price.json'
  import CityData from '../city.json' 
  `import {updateListData, addBrandData, updateMoreOptions, updateCityId} from '../vuex/actions'`

```
2.1.1 dom操作  

      ```markdown
      
      `<options-component></options-component>`
      root
      .on('click','#listGroup')
      .on('click','#listCity')
      .on('click','#listBrand')   
      .on('click','#wrapperLevel, #wrapperPrice')
      
      .on('click','#chooseLevel')
      .on('click','#choosePrice')
      $('#tags').on('click','li .ico')  
      
      `<div class="gotop btn-bg" id="goTop" style="display: none;"></div> 置顶按钮`
      root
      .('click','#goTop')
      
      ```   
      
2.1.2 vue-methods操作
      2.1.2.1 initLevel() / initPrice() 
              调取本地level.json / price.json
      2.1.2.2 initCity()  
              调取本地city.json (省+市)
              定位  
              渲染省份
              渲染省份nav
              渲染城市nav
      2.1.2.3 initBrand()  
              ajax请求  
              
              `addBrandData(store, brands)`  
      2.1.2.4 initList(pbid, price, type, cityid, page)
              ajax请求`/nxcar/index.php/extend/carlist/carList/` 参数 pbid, price, type, cityid, page  
              
              `updateListData(store, $.parseJSON(response.data));`  
              `updateListData(store, {});`
      2.1.2.5 initScroll()
              ajax请求`/nxcar/index.php/extend/carlist/carList/` 参数 condition.pbid....    
              
              `updateListData(store, _self.listData);`
      2.1.2.6 init()  
      
              `updateMoreOptions(store, more);`
      2.1.2.7 hideDrawer()
      2.1.2.8 checkMoreOptions () || deleteIcoOptions()
      
              `updateMoreOptions(store, more);`   
      2.1.2.9 checkTime(nowTime, localTime, space)  
      2.1.2.10 loadAgain()  
                this.initList(_self.condition.pbid, _self.condition.price, _self.condition.type, _self.condition.cityid, _self.condition.page);    
                
                
   
      
              
              
      
2.2 views/sub.vue  
```markdown
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
``` 

2.2.1 dom 操作  

     ```markdown 
        来源于 **SubSliderComponent**
        root.
        on('click','#listGroup')    省份
        on('click','#listCitySub')  城市  
        on('click','#listType li .info') 车型 
        on('click','#dealerList') 经销商列表  
        
     ```
2.2.2 vue-methods 操作 
      2.2.2.1 resetUser() resetPhone() keyupName() keyupPhone()  
      2.2.2.2 setLocalStorage() getLocalStorage()  本地缓存  
      2.2.2.3 onSubmit() 提交  
      2.2.2.4 showPro() showType()  
      2.2.2.5 hideDrawer() 初始隐藏抽屉  
      2.2.2.6 fastAsk()  第三页  一键询价   
      2.2.2.7 initRecommendList()  第三页 初始化推荐经销商 
      2.2.2.8 recommendLoadAgain()  第三页 加载失败时重载经销商列表   
      2.2.2.9 initDealerList()  初始化推荐经销商   
      2.2.2.10 dealersLoadAgain()  加载失败时重载经销商列表   
      2.2.2.11 initPserList()  initCity() 初始化城市 初始化车型列表    
2.2.3 vue-ready 操作  
      _self.initDealerList()  
      _self.initPserList() 
      _self.initCity()
      _self.getLocalStorage()  
      
      dom操作  
      
      
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
    
    
2.6 components/selector.vue 子集-选项结果集
 ```markdown
  import Vue from 'vue'
  import $ from 'jquery'
  `import store from '../vuex/store'`
  `import {getMoreOptions} from '../vuex/getters'`
  `import { updateMoreOptions } from '../vuex/actions'`  
  ```
  2.6.1 changeMoreOptions() 自选选项增多时收起更多选项

2.7 components/list.vue 伴随态-筛选的结果
 ```markdown
  import Vue from 'vue'
  `import VueLazyload from 'vue-lazyload'`
  import $ from 'jquery'
  import IScroll from '../../dist/lib/js/iscroll'
  `import {getListData,getCityId} from '../vuex/getters'`
 ```  
2.8 components/subSlider.vue
```
  import Vue from 'vue'
  import $ from 'jquery'
```
  2.8.1 ##drawerPro #drawerCity || #drawerType `车型弹层`
  2.8.2 hideDrawer() hideCity()   
  
  
3.vuex
   
 
