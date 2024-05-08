import { useNavigate } from 'react-router-dom'
import { URL } from './path';
import axios from 'axios';


const instance = axios.create({
    baseURL: URL,
    timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Access Token");
    
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${token}`;
    
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    /** 200이면 응답 리턴, 404면 에러 메세지 출력 */
    (response) => {
        if (response.status === 404) {
            console.log('404 페이지로 넘어가야 함!');
        }

    return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            const navigate= useNavigate();

            error.response.statusText = 'Unauthorized';
            error.response.status = 401;
            navigate('/');    
            }
            return Promise.reject(error);
        }
    );
    
    export default instance;