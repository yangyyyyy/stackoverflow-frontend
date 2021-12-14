import axios from 'axios'

const request = axios.create({
  baseURL: process.env.NODE_ENV === '',
  withCredentials: true,
  timeout: 200 * 1000
})

request.interceptors.request.use(config => {
  // config.data = JSON.stringify(config.data)
  // config.headers = {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }

  // const token = getCookie('??')
  // if (token) {
  //   config.params = { 'token': token }
  //   config.headers.token = token
  // }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

request.interceptors.response.use(response => {
  const res = response.data
  return res
}, error => {
  // if (error && error.response) {
  //   switch (error.response.status) {
  //     case 400:
  //       error.message = '????'
  //       break
  //     case 401:
  //       error.message = '?????????'
  //       break
  //     case 403:
  //       error.message = '????'
  //       break
  //     case 404:
  //       error.message = '????,??????'
  //       window.location.href = '/NotFound'
  //       break
  //     case 405:
  //       error.message = '???????'
  //       break
  //     case 408:
  //       error.message = '????'
  //       break
  //     case 500:
  //       error.message = '??????'
  //       break
  //     case 501:
  //       error.message = '?????'
  //       break
  //     case 502:
  //       error.message = '????'
  //       break
  //     case 503:
  //       error.message = '?????'
  //       break
  //     case 504:
  //       error.message = '????'
  //       break
  //     case 505:
  //       error.message = 'http????????'
  //       break
  //     default:
  //       error.message = `????${error.response.status}`
  //   }
  // } else {
  //   if (JSON.stringify(error).includes('timeout')) {
  //   }
  //   console.log(error.response.status)
  //   error.message('???????')
  // }
  return Promise.reject(error)
})
export default request
