/**
 * 请求封装文件
 */
import axios from 'axios';
import { message } from 'antd';
import { clearTokenAndToLogin, getUserInfo } from './token';

let baseUrl = '';
// if (process.env.NODE_ENV === 'production') {
//   baseUrl = '';
// }

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 30000,
});

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return Promise.resolve(response.data);
  },
  (error) => {
    // 对响应错误做点什么
    const errorSource = error.response.data || {};
    if (+error.response.status === 401) {
      clearTokenAndToLogin();
      return Promise.reject();
    }
    if (errorSource.msg) {
      message.error(errorSource.msg);
      return Promise.reject();
    }
    const rejectObj = {
      code: 404,
      msg: '服务器找不到请求的网页',
    };
    message.error(rejectObj.msg);
    return Promise.reject();
  }
);

export default function request(option) {
  option = option || {};
  // 过滤空值或无效值
  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      if (
        (Array.isArray(option.data[key]) && option.data[key].length === 0) ||
        option.data[key] === '' ||
        option.data[key] === undefined ||
        option.data[key] === null ||
        (typeof option.data[key] === 'object' &&
          JSON.stringify(option.data[key]) === '{}')
      ) {
        delete option.data[key];
      }
    });
  }
  if (option.method && option.method.toLowerCase() === 'get') {
    option.params = option.data;
  }

  option.headers = {
    ...option.headers,
    Authorization: getUserInfo().token,
  };

  return instance({
    ...option,
  });
}
