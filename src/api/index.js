import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from '~/store';

const service = axios.create({
  // baseURL: 'http://192.168.37.233:8088/',
  // withCredentials: true,
  timeout: 25000
});

// request拦截器
service.interceptors.request.use(
  config => {
    // token && userId
    if (store.getters.GET_TOKEN && store.getters.GET_USERID) {
      config.headers.token = store.getters.GET_TOKEN; // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers.userId = store.getters.GET_USERID;
    }
    // projectId
    if (store.getters.GET_PROJECTID) {
      config.headers.projectId = store.getters.GET_PROJECTID;
    }
    config.headers = config.headers || {};
    config.headers = Object.assign(
      config.headers,
      {
        "Content-Type": "application/json;charset=utf-8",
        "X-Requested-With": "XMLHttpRequest"
      }
    );
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /** code为非20000是抛错 可结合自己业务进行修改 */
    const headers = response.headers;
    if (response.status !== 200) {
      Message({
        message: response.data.msg,
        type: "error",
        duration: 5 * 1000
      });

      // 1000:token失效;
      if (headers.resultcode === "1000") {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.$router.push({
            path: "/login"
          });
          // store.dispatch("FedLogOut").then(() => {
          //   location.reload(); // 为了重新实例化vue-router对象 避免bug
          // });
        });
      }
      return Promise.reject(new Error('token失效'));
    } else {
      return response;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

const methods = ['get', 'post', 'put', 'delete'];
const api = {};

methods.forEach(method => {
  api[method] = ({
    url,
    headers = null,
    data = null,
    cb
  } = {}) => {
    service({
      method,
      url,
      headers,
      data
    }).then(
      res => cb(res)
    )
  }
})
export default api;
