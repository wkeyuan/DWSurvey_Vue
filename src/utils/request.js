import axios from 'axios'
import { Notification, MessageBox, Message, Loading } from 'element-ui'
import {msgBoxNoLogin, msgBoxNoRole, msgError, msgInfo} from './dw-msg'


// 全局的 axios 默认值
axios.defaults.baseURL = process.env.DW_API_URL
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.DW_API_URL,
  // 超时
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log('request-error:'+error)
    return Promise.error(error)
  })

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.debug('response')
    console.debug(response)
    if (response.status === 200) {
      const {data} = response
      if(data.hasOwnProperty('resultCode')) {
        if(data.resultCode === 401 ) {
          msgBoxNoLogin()
        }else if(data.resultCode === 403 ) {
          msgBoxNoRole()
        } else if(data.resultCode !== 200 ) {
          let message = `异常码：${data.resultCode}`
          if(data.hasOwnProperty('resultMsg'))
            message = `${data.resultMsg}，异常码：${data.resultCode}`
          msgError(message)
        }
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // 服务器状态码不是200的情况
    console.log('err' + error)
    let { message } = error;
    if (message.includes("Network Error")) {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      const code = message.substr(message.length - 3);
      if(code==="401" || code==="403"){
        message=null
        if(code==="401"){
          msgBoxNoLogin()
        }else if(code==="403"){
          msgBoxNoRole()
        }
      }else{
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
    }
    if(message!=null) msgError(message)
    return Promise.reject(error)
  }
)

export default service
