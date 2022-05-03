<template>
    <div class="swiper" :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/swiper.min.css'

export default {
  props: {
    preview: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'kerwin'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.preview,
      spaceBetween: 30,
      freeMode: true
    })
  }
}
</script>
