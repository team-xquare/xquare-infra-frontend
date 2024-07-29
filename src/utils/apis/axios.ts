import axios from 'axios';
import { Cookie } from '../cookie';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 30000,
});

instance.interceptors.request.use(
  (res) => {
    const token = Cookie.get('accessToken');
    if (token) res.headers.Authorization = `Bearer ${token}`;
    return res;
  },
  (err) => {
    // toast.error('오류가 발생헀습니다');
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const {
      response: { status },
    } = err;
    if (status === 403 || status === 401) {
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      window.location.href = '';
      // const token = Cookie.get('refreshToken');
      // reissue(token)
      //   .then((res) => {
      //     Cookie.set('accessToken', res.data.access_token);
      //     Cookie.set('refreshToken', res.data.refresh_token);
      //     window.location.reload();
      //   })
      //   .catch(() => {
      //     Cookie.remove('accessToken');
      //     Cookie.remove('refreshToken');
      //     window.location.href = '/signin';
      //   });
    } else {
      // toast.error('오류가 발생헀습니다');
      return Promise.reject(err);
    }
  },
);
