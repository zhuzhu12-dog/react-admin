import axios from 'axios';
import { message } from 'antd';
import store from '../redux/store';
import codeMessage from '../config/code-message';
import { removeItem } from '../utils/storage';
import history from '../utils/history';
import { removeUserSuccess } from '../redux/action-creators/user'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    headers: {

    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        if(config.method === 'post') {
            config.headers['content-type'] = 'application/x-www-form-urlencoded';
            config.data = Object.keys(config.data).reduce((prev, key)=>{
                const value = config.data[key];
                return prev + `&${key}=${value}`;
            }, '').substring(1);
        }
        const{
            user: {
                token
            }
        } = store.getState();
        if(token) {
            config.headers.authorization = 'Bearer' + token;
        }
        return config;
    },
)
axiosInstance.interceptors.response.use(
    ({
        data
    }) => {
        if (data.status === 0) {
            return data.data;
        } else {
            message.error(data.msg)
            return Promise.reject(data.msg);
        }
    },
    (error) => {
        let errorMessage = '';
        if(error.response) {
            errorMessage = codeMessage[error.response.status] || '未知';
            if (error.response.status === 401) {
                removeItem();
                store.dispatch(removeUserSuccess());
                history.push('/login');
              }
        } else {
            if (error.message.indexOf('Network Error')!== -1) {
                errorMessage = '请检查网络';
            } else if (error.message.indexOf('timeout') !== -1) {
                errorMessage = '网络太卡';
            } else {
                errorMessage = '未知';
            }
        }
        message.error(errorMessage);
        return Promise.reject(errorMessage);
    }
)
export default axiosInstance;