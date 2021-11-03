import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8081/',
  withCredentials: true
})
console.log(process.env.NODE_ENV)
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get('ACCESS_TOKEN')
    if (error.response.status === 403)

    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      if (token) {
        // store.dispatch('Logout').then(() => {
        //   setTimeout(() => {
        //     window.location.reload()
        //   }, 1500)
        // })
      }
    }
  }
  return Promise.reject(error)
}

//request incerceptor
service.interceptors.request.use((config) => {
  const requestConfig = {
    ...config,
    url: `${config.url}`,
  }
  return requestConfig
}, err)

service.interceptors.response.use((response) => {
  switch (response.status) {
    case 200:
      if(response.data.success && response.data.success){
        return response.data.content
      }
      break
    case 404:
      return false
    default:
  }
})

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
