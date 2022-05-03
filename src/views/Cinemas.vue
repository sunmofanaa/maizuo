<template>
    <div>
        <van-nav-bar title="影院" ref="navbar" @click-left="handleLeft" @click-right="handleRight">
          <template #left>
            {{$store.state.cityName}}<van-icon name="arrow-down"/>
          </template>
          <template #right>
            <van-icon name="search" size="29" color="black"/>
          </template>
        </van-nav-bar>

        <div class="box" :style="{height:height}">
            <ul>
                <li v-for="data in cinemaList" :key="data.cinemaId">
                    <div class="left">
                        <div class="cinema_name">{{data.name}}</div>
                        <div class="cinema_text">{{data.address}}</div>
                    </div>
                    <div class="right cinema_name">
                        <div style="color:red;">￥{{data.lowPrice/100}}起</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
// import http from '@/util/http'
import BetterScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      height: '0px'
    }
  },
  computed: {
    ...mapState(['cinemaList'])
  },
  mounted () {
    // 动态计算高度
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight - this.$refs.navbar.$el.offsetHeight + 'px'
    // 分发
    if (this.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=5121167`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   this.cinemaList = res.data.data.cinemas
    // this.$nextTick(() => {
    //   new BetterScroll('.box', {
    //     scrollbar: {
    //       fade: true
    //     }
    //   })
    // })
    // })
  },
  methods: {
    handleLeft () {
      this.$router.push('/city')
      // 清空cinemaList,不要在这里（外面）操作清空这个行为，监控不到
      this.$store.commit('clearCinema')
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
  li {
    padding: .8333rem;
    display: flex;
    justify-content: space-between;
    .left{
        width: 11.7778rem;
    }
    .cinema_text{font-size: 12px;margin-top: 5px;color: #797d82;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .cinema_name{font-size: 12px}
  }
  .box{overflow: hidden;position: relative;}
</style>
