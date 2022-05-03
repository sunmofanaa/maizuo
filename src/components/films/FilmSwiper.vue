<template>
    <div class="swiper kerwin">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- <div class="swiper-pagination"></div> -->
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/swiper.min.css'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    new Swiper('.kerwin', {
      /* pagination: {
        el: '.swiper-pagination'
      }, */
      loop: this.loop,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }
}
</script>
