<template>
    <div class="city">
        <van-index-bar :index-list="computedList" @select="handleChange">
            <div v-for="data in cityList" :key="data.type">
                <van-index-anchor :index="data.type" />
                <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleClick(item)"/>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj.js'
export default {
  mixins: [obj], // 混入
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    }
  },
  // 一走就销毁，就让它显示
  destroyed () {
    this.$store.commit('show')
  },
  mounted () {
    // 一进来的时候,就让底部选项卡隐藏
    this.$store.commit('hide')
    http({
      url: '/gateway?k=621262',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)
      // 1.将这些300多条数据转化成以A、B、C··· 开头的进行分组
      // 2.利用转换后的数组，结合组件库进行渲染页面
      this.cityList = this.renderCity(res.data.data.cities)
    })
  },
  methods: {
    handleChange (data) {
      Toast(data)
    },
    renderCity (list) {
      var cityList = []
      var letterList = []
      for (var i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      // 让这26个字母分别去数据里面过滤
      letterList.forEach(letter => {
        var newList = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        // console.log(newList)
        newList.length > 0 && cityList.push({
          type: letter,
          list: newList
        })
      })
      // var newList = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() == 'A')
      // console.log(newList)
      // console.log(cityList)
      return cityList
    },
    handleClick (item) {
      // console.log(this.$store.state)
      // this.$store.state.cityName = item.name 直接公共部分会有风险，通过mutation修改
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
    .van-toast--html, .van-toast--text{
        min-width: 30px;
    }
</style>
