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
    `router.start(app,"#app");`  
    

