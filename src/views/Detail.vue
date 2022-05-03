<template>
    <div v-if="filmInfo">
      <detail-header v-scroll>
        {{filmInfo.name}}
      </detail-header>
        <div :style="{backgroundImage:'url('+filmInfo.poster+')'}" class="poster"></div>
        <div class="content">
          <div>{{filmInfo.name}}</div>
          <div>
            <div class="detail-text">{{filmInfo.category}}</div>
            <div class="detail-text">{{filmInfo.premiereAt | dataFilter}}上映</div>
            <div class="detail-text">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
            <div class="detail-text" style="line-height:15px;" :class="isHidden?'hidden':''">{{filmInfo.synopsis}}</div>
            <div style="text-align:center;"><i class="iconfont" @click="isHidden=!isHidden" :class="isHidden?'icon-moreunfold':'icon-less'"></i></div>
          </div>
          <!-- 演职人员 -->
          <div>
            <div>演职人员</div>
            <detail-swiper :preview="3.5" name="actors">
              <detail-swiper-item v-for="(data,index) in filmInfo.actors" :key="index">
                 <div :style="{backgroundImage:'url('+data.avatarAddress+')'}" class="avatar"></div>
                <div style="font-size:12px;text-align:center;">{{data.name}}</div>
                <div style="font-size:13px;text-align:center;">{{data.role}}</div>
              </detail-swiper-item>
            </detail-swiper>
          </div>
          <!-- 剧照 -->
          <div>
            <div>剧照</div>
            <detail-swiper :preview="2" name="photos">
              <detail-swiper-item v-for="(data,index) in filmInfo.photos" :key="index">
                 <div :style="{backgroundImage:'url('+data+')'}" class="avatar" @click="handlePreview(index)"></div>
              </detail-swiper-item>
            </detail-swiper>
          </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import detailHeader from '@/components/detail/DetailHeader'
import { ImagePreview } from 'vant'
import http from '@/util/http'
import obj from '@/util/mixinObj.js'

moment.locale('zh-cn') // 设置成中文的
// console.log(moment().format('YYYY-MM-DD')) // 拿到当前日期进行格式化
Vue.filter('dataFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > 10) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  components: {
    detailSwiperItem,
    detailSwiper,
    detailHeader
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  mounted () {
    // console.log('created', this.$route.params.id)
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=702696`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film)
      this.filmInfo = res.data.data.film // 打印出来的是一个大对象
    })
  }
}
</script>
<style lang="scss" scoped>
  .poster{width: 100%;height: 11.6667rem;background-position: center;background-size:cover ;}
  .content{
    padding: .8333rem;
    .detail-text{
      color: #797d82;
      font-size:.7222rem;
      margin-top:.2222rem ;
    }
  }
  .hidden{overflow: hidden;height:30px;}
  .avatar{width: 100%;height:4.7222rem;background-position: center;background-size:cover ;}
</style>
