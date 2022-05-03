import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemaList: [],
    isTabberShow: true
  },
  actions: {
    getCinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=5121167`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        // console.log(res.data.data.cinemas)
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  // 统一管理，被devtools记录了
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabberShow = true
    },
    hide (state) {
      state.isTabberShow = false
    }
  }
})
