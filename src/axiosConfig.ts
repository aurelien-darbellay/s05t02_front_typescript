import { ApiPaths } from './apiPaths';
// axiosConfig.js
import axios from 'axios';

// ─── 1) Standard defaults ───────────────────────────────────────────────────
axios.defaults.withCredentials    = true;
axios.defaults.baseURL            = ApiPaths.FRONT_ORIGIN;
axios.defaults.xsrfCookieName     = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName     = 'X-XSRF-TOKEN';
axios.defaults.timeout            = 10000; // optional

const CSRF_ENDPOINT = ApiPaths.CSRF_TOKEN_PATH;

function getCookieValue(name:string|undefined) {
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}


axios.interceptors.request.use(
  async (config) => {
    if (config.url === CSRF_ENDPOINT) {
      return config;
    }
    const riskyMethods = ['post', 'put', 'patch', 'delete'];
    const method = (config.method || '').toLowerCase();

    if (!riskyMethods.includes(method)) {
      return config;
    }

    const existingToken = getCookieValue(axios.defaults.xsrfCookieName);
    if (existingToken) {
      return config;
    }
    await axios.get(CSRF_ENDPOINT);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;
