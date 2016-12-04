<template>
  <div class="ask-mod" id="carList">
    <ul class="select-ask-list" >
      <li v-for="list in listData">
        <div class="img-wrap"><a v-link="{ name : 'sub', params: { pbid : list.pbid, pserid : list.pserid, source_id : 'source_id=727', type : 'pser', name : list.name}}"><img v-lazy="list.first_photo"></a></div>
        <h3 class="name"><a v-link="{ name : 'sub', params: { pbid : list.pbid, pserid : list.pserid, source_id : 'source_id=727', type : 'pser', name : list.name}}">{{ list.name }}</a></h3>
        <span class="price">
          <a v-link="{ name : 'sub', params: { pbid : list.pbid, pserid : list.pserid, source_id : 'source_id=727', type : 'pser', name : list.name}}" v-if="list.dealer_price=='0'">暂无报价</a>
          <a v-link="{ name : 'sub', params: { pbid : list.pbid, pserid : list.pserid, source_id : 'source_id=727', type : 'pser', name : list.name}}" v-else="">{{list.dealer_price}}万</a>
        </span>
        <span class="gray-price"><a v-link="{ name : 'sub', params: { pbid : list.pbid, pserid : list.pserid, source_id : 'source_id=727', type : 'pser', name : list.name}}">指导价：{{list.price_msg}}</a></span>
        <a class="ask-btn" v-link="{ name : 'sub', params: { pbid : list.pbid, pserid : list.pserid, source_id : 'source_id=727', type : 'pser', name : list.name}}">问促销价</a>
      </li>
    </ul>
  </div>
</template>
<style>
  #carList .price a{ color:#fe2a2a;}
</style>
<script>
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload'
  import $ from 'jquery'
  import IScroll from '../../dist/lib/js/iscroll'
  import {getListData,getCityId} from '../vuex/getters'

  Vue.use(VueLazyload, {
    error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACrAQMAAACqt/xfAAAABlBMVEUAAADa2to4qB92AAAAAXRSTlMAQObYZgAABKJJREFUaN7t2k2y1CAQAGBSLFhyBI7C0YLlwqVHMpYLlx5BLBduccci0tLdSQZCjPnxr6zpBW9g+uPNMEyTvHoC6hhEjh4AxBQSB/NAmvoq94NY4umf/rd4amBcPIeCOsJt3+HzGjNxKi/OejH5dMer2Q+XvL/je/Zwwwf5C7zrsLnmuxveAsRf4YcbXsxenPcmZ93wdfxx/9e//7/NTyHnwWv1k+Pp/2lfPN72y/457Xn/NB7beN9zGCxc9z3HBW+LdAWrePf7fX42/TUPdbx/+v/QizmeftdzqoSyfpz33WG/Xb7EnpcHfH/Kc/k6Uj8T9csIpzy4bb9E+on3W74v+m7fh5/54eFVbnzpecm6X+7Lvl88wbDy4y3P67vrw8N3B3234+OG7294wO1y0IuDXu74ccObm14d89Smxrf56qQXR739gTetdziucf/VHiYvZic4yvqjZ2+uegpHanh4rouHvRc0y3lv2Ee59vqUHxW2YuWHwx7wZ7rgLTxiLL0678Pa+3Pen/WcPC7nS+FJhmPeTF5c9Jr5WPnumOe9QxEbHyvfRmDfcc9f9Sgwr/RcwH7q+V3yc+KypwVMK98f95KWr/Xpp17yLLe8x7Z9/fa4V9RrPfzUK/KaesNFPwjLvdIzcMc875943nOV6riXaq8PeU7icBe9Bo6h9Bw/8wa9mbvXfAYc8aKfu+m8t7ml5ftIC7jjMZr6RV4h1bSAV3yio0uiD6d9n6ldauB4yaMMpNIV/43fuaEFPOsRMdRUwi/6lDPZP+MZz/hjgSWnT3yACkOtrW+VnKKuxtrSLX/C+IrfahvQCkiCSY/tYJezqCdvqatBZIpes/fsIU86duyp9ew9/jbyNEvQWJsUKfaBvAXXQVSUyfnB1remjtqoYZh8zz6SNzBInBxDcib7iNkYL6gdyWv0wH4kn4fzpOwVZ5LHp3n0JXeJmtx0k0/kCQ9mx7+iNmkItQfyEoIBx15zJvuUswsP5G32cvYOfYfv19kjPualK/2AXuDdi9jzr2c/5uTSe/YJtx8dfDpRYyM/nkcBm+wTewWOdiIE9HyVTUQYzFeFj/OsGb3OvmMv2Efylh9UnkDlZfYgZOVHYgYgHPROVT4R03nsoB9qD8TUCa9r75DJPN54VK33pvQfF+/WHiff8MGW/gMMyHKuWLzJ8Ef+G0SbCv8ePDFIx/wIsR8L/w7Cnh8bn3Xp30KcXv9RnyAWfoDxsX6tj423AKH0fZo+/2HLh8ablbfw2H+t91vel97AG/Zh5fn/MRqv82DpSYpMYuN7ANd4lQdLr8hbgLHxNvPGy5WX5Pu0UT8MDJtelL4DeNSv2mOxN6moXyr7Ds/JT/AFHHuBvoPRzvXz4RWE7Ov6OQoY0X+G+fzt6f47GnArj6OLf7X4ftMHA4OpPb6qLR9rb2E6v/zaC0jZ1+cXfkroPy3ewHR+Br32PSz+5eLNyuvsDTi56Z1J1fmdvfbo/eIVFNcPtbfoq+sH9AP5fvYy+x7wCJRrj2uaquuX7JUjb2ffZQ+Jrr/WHtc0CfaU77OX7PXsBfpsaAPVXkHI3pCnfIFekJeL78N3mFumqDbUgTgAAAAASUVORK5CYII=',
    loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACrAQMAAACqt/xfAAAABlBMVEUAAADa2to4qB92AAAAAXRSTlMAQObYZgAABKJJREFUaN7t2k2y1CAQAGBSLFhyBI7C0YLlwqVHMpYLlx5BLBduccci0tLdSQZCjPnxr6zpBW9g+uPNMEyTvHoC6hhEjh4AxBQSB/NAmvoq94NY4umf/rd4amBcPIeCOsJt3+HzGjNxKi/OejH5dMer2Q+XvL/je/Zwwwf5C7zrsLnmuxveAsRf4YcbXsxenPcmZ93wdfxx/9e//7/NTyHnwWv1k+Pp/2lfPN72y/457Xn/NB7beN9zGCxc9z3HBW+LdAWrePf7fX42/TUPdbx/+v/QizmeftdzqoSyfpz33WG/Xb7EnpcHfH/Kc/k6Uj8T9csIpzy4bb9E+on3W74v+m7fh5/54eFVbnzpecm6X+7Lvl88wbDy4y3P67vrw8N3B3234+OG7294wO1y0IuDXu74ccObm14d89Smxrf56qQXR739gTetdziucf/VHiYvZic4yvqjZ2+uegpHanh4rouHvRc0y3lv2Ee59vqUHxW2YuWHwx7wZ7rgLTxiLL0678Pa+3Pen/WcPC7nS+FJhmPeTF5c9Jr5WPnumOe9QxEbHyvfRmDfcc9f9Sgwr/RcwH7q+V3yc+KypwVMK98f95KWr/Xpp17yLLe8x7Z9/fa4V9RrPfzUK/KaesNFPwjLvdIzcMc875943nOV6riXaq8PeU7icBe9Bo6h9Bw/8wa9mbvXfAYc8aKfu+m8t7ml5ftIC7jjMZr6RV4h1bSAV3yio0uiD6d9n6ldauB4yaMMpNIV/43fuaEFPOsRMdRUwi/6lDPZP+MZz/hjgSWnT3yACkOtrW+VnKKuxtrSLX/C+IrfahvQCkiCSY/tYJezqCdvqatBZIpes/fsIU86duyp9ew9/jbyNEvQWJsUKfaBvAXXQVSUyfnB1remjtqoYZh8zz6SNzBInBxDcib7iNkYL6gdyWv0wH4kn4fzpOwVZ5LHp3n0JXeJmtx0k0/kCQ9mx7+iNmkItQfyEoIBx15zJvuUswsP5G32cvYOfYfv19kjPualK/2AXuDdi9jzr2c/5uTSe/YJtx8dfDpRYyM/nkcBm+wTewWOdiIE9HyVTUQYzFeFj/OsGb3OvmMv2Efylh9UnkDlZfYgZOVHYgYgHPROVT4R03nsoB9qD8TUCa9r75DJPN54VK33pvQfF+/WHiff8MGW/gMMyHKuWLzJ8Ef+G0SbCv8ePDFIx/wIsR8L/w7Cnh8bn3Xp30KcXv9RnyAWfoDxsX6tj423AKH0fZo+/2HLh8ablbfw2H+t91vel97AG/Zh5fn/MRqv82DpSYpMYuN7ANd4lQdLr8hbgLHxNvPGy5WX5Pu0UT8MDJtelL4DeNSv2mOxN6moXyr7Ds/JT/AFHHuBvoPRzvXz4RWE7Ov6OQoY0X+G+fzt6f47GnArj6OLf7X4ftMHA4OpPb6qLR9rb2E6v/zaC0jZ1+cXfkroPy3ewHR+Br32PSz+5eLNyuvsDTi56Z1J1fmdvfbo/eIVFNcPtbfoq+sH9AP5fvYy+x7wCJRrj2uaquuX7JUjb2ffZQ+Jrr/WHtc0CfaU77OX7PXsBfpsaAPVXkHI3pCnfIFekJeL78N3mFumqDbUgTgAAAAASUVORK5CYII=',
    try: 3 // default 1
  })

  export default{
    ready(){
    },
    vuex: {
      getters: {
        listData: getListData,
        city: getCityId
      }
    }
  }
</script>
