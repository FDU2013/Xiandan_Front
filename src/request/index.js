import axios from 'axios'

axios.defaults.withCredentials = true;
const request = axios.create({
    baseURL: '',
    timeout: 500
})

// 请求拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    let userJson = sessionStorage.getItem("user")
    if (!userJson) {
        config.headers['userID'] = '';  // 设置请求头
        config.headers['token'] = '';  // 设置请求头
    }
    else {
        config.headers['userID'] = JSON.parse(userJson).userID;  // 设置请求头
        config.headers['token'] = JSON.parse(userJson).token;  // 设置请求头
    }
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = {
            data:response.data,
            status:response.status
        }
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default request
