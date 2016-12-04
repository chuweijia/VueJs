/**
 * Created by Xcar on 2016/8/31.
 */
import Ask from './views/ask.vue'
import Sub from './views/sub.vue'
export default function (router) {
  //** 全局 路由 钩子
  router.map({
    '/': {
      name: 'index',
      title: '爱卡汽车-推广活动',
      component: Ask,
      history : true
    },
    'sub/:pbid/:pserid/:source_id/:type/:name': {
      name: 'sub',
      title:'爱卡汽车-询问活动',
      component: Sub
    }
  })
}
