// 对于数据请求的封装 （方法一）
// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6810637',
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16423813772230307797336065","bc":"110100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }

// function httpForDetail (params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=702696`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16423813772230307797336065","bc":"110100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }
// export default {
//   httpForList,
//   httpForDetail
// }

// 对于数据请求的封装 （方法二） axios自带的一种方案
import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16423813772230307797336065","bc":"110100"}'
  }
})
export default http

// 在发请求之前拦截  -- showLoading
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 在成功后拦截 --  hideLoading
// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.clear()
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
