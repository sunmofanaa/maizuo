<template>
    <div>
       <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check = "false">
        <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage (data.filmId)">
              <img :src="data.poster">
                <div>
                  <div class="title">{{data.name}}</div>
                  <div class="content">
                    <div>观众评分:<span style="color:red;">{{data.grade}}</span></div>
                    <div class="actors">主演: {{data.actors | actorsFilter}}</div>
                    <div>{{data.nation}} | {{data.runtime}}分钟</div>
                  </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
// import axios from 'axios'
import Vue from 'vue'
// import http from '@/util/http.js'
import http from '@/util/http'
Vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=5196770`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true // 禁用懒加载了
        return
      }
      console.log('到底了')
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5196770`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        // 文档中要求将 loading 主动设置成 false
        this.loading = false
      })
    },
    handleChangePage (id) {
    // 通过路径进行跳转
    // this.$router.push(`/detail/${id}`)
    // 通过命名路由进行跳转
      this.$router.push({
        name: 'sunmofan',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .van-list{
    .van-cell{
      padding: .8333rem;
      overflow: hidden;
      img{float: left;width: 3.6667rem;}
      .title{font-size: .8889rem;}
      .content{
        font-size: .7222rem;
        color:gray;
        .actors{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
