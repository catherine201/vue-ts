import axios from 'axios';
import Vue from 'vue';
import { serverIpAddress } from './server_config';
import loadingImg from '../assets/images/loading.gif';
axios.defaults.baseURL = serverIpAddress;
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 请求前统一添加token
axios.defaults.headers.common['accessToken'] = accessToken();

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      // 加个随机数解决有些ie 浏览器卡死的问题
      config.url = config.url + '?' + Math.random();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    let Info = JSON.parse(window.localStorage.getItem('objStr'));
    if (res.data.code === 100010 || res.data.code === 100050) {
      Vue.prototype.$msg({
        message: res.data.msg,
        type: 'error',
        duration: 1000,
        onClose() {
          if (Info) {
            window.localStorage.clear();
            window.location.href = '/account/index.html#/login';
          }
        }
      });
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export function accessToken() {
  // 从storage 拿, 登录成功就把token 存入storage,这里要做判断
  if (window.localStorage.getItem('objStr')) {
    var Info = JSON.parse(window.localStorage.getItem('objStr'));
    if (Info && Info.accessToken) {
      return Info.accessToken;
    }
  }
  return '';
}

export function get(url, data, options) {
  const param = { method: 'GET', url, params: data };
  return fetchApi(param, options);
}

export function post(url, data, options) {
  const param = { method: 'POST', url, data };
  return fetchApi(param, options);
}

export function postUploadFile(url, data, options) {
  const param = { method: 'POST', url, data, headers: { 'Content-Type': 'multipart/form-data' } };
  return fetchApi(param, options);
}

export function del(url, data, options) {
  const param = { method: 'DELETE', url, params: data };
  return fetchApi(param, options);
}

export function put(url, data, options) {
  const param = { method: 'PUT', url, data };
  return fetchApi(param, options);
}

var loadingNum = 0;
function fetchApi(param, options) {
  // 遮罩层
  let loading = {
    start: () => {
      let containerDOM = document.getElementById('loadingContainer');
      if (containerDOM) {
        containerDOM.parentNode.removeChild(containerDOM);
      } else {
        containerDOM = document.createElement('div');
        containerDOM.setAttribute('id', 'loadingContainer');
      }
      containerDOM.style.cssText = `width: 100%;height: 100%;position: fixed;background: #e0e0e0;bottom: 0;text-align: center;opacity: 0.5;z-index: 500`;
      let ImgDOM = document.createElement('img');
      ImgDOM.style.cssText = `display: inline-block;width: 2rem; height: 2rem;position: absolute;top: 50%; left: 50%; margin-top: -62px; margin-left: -62px;`;
      ImgDOM.setAttribute('src', loadingImg);
      containerDOM.appendChild(ImgDOM);
      document.body.appendChild(containerDOM);
    },
    end: () => {
      setTimeout(() => {
        let containerDOM = document.getElementById('loadingContainer');
        if (containerDOM) {
          containerDOM.parentNode.removeChild(containerDOM);
        }
      }, 1000);
    }
  };
  if (typeof options.showLoading !== 'boolean') {
    options.showLoading = true;
  }
  if (options.showLoading) {
    if (loadingNum <= 0) {
      //   Vue.prototype.$loading({ fullscreen: true });
      //   var loading = Vue.prototype.$loading({ fullscreen: true });
      loading.start();
    }
    loadingNum++;
  }
  if (typeof options.errorHandler !== 'boolean') {
    options.errorHandler = true;
  }
  return new Promise((resolve, reject) => {
    axios(param)
      .then(response => {
        if (options.errorHandler) {
          switch (response.data.code) {
            case 0:
              return resolve(response.data);
            default:
              Vue.prototype.$msg({
                message: response.data.msg,
                type: 'error'
              });
          }
        } else {
          return resolve(response.data);
        }
      })
      .catch(error => {
        var errorMsg = '';
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMsg = '400请求错误';
              break;
            case 404:
              errorMsg = '404请求地址出错';
              break;
            case 408:
              errorMsg = '408请求超时';
              break;
            case 500:
              errorMsg = '500服务器内部错误';
              break;
            case 502:
              errorMsg = '502网关错误';
              break;
            case 504:
              errorMsg = '504网关超时';
              break;
          }
        } else if (error.request) {
          errorMsg = '请求失败';
        } else {
          errorMsg = error.message;
        }
        if (options.errorHandler) {
          if (options.showLoading) {
            loadingNum--;
            if (loadingNum <= 0) {
              loading.end();
              console.log('error');
              Vue.prototype.$msg({
                message: errorMsg,
                type: 'error'
              });
              return;
              // loading.close();
            }
          }
        }
        reject(error);
      })
      .then(() => {
        if (options.showLoading) {
          loadingNum--;
          if (loadingNum <= 0) {
            loading.end();
            // loading.close();
          }
        }
      });
  });
}
