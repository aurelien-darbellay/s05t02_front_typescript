import { ApiPaths } from './apiPaths';
// axiosConfig.js
import axios from 'axios';

// ─── 1) Standard defaults ───────────────────────────────────────────────────
axios.defaults.withCredentials = true;
axios.defaults.baseURL = ApiPaths.BACK_ORIGIN;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.timeout = 10000; // optional

let csrfToken: string | null = null;

// 1️⃣ Function to refresh CSRF token
export async function refreshCsrfToken() {
  const response = await axios.get(ApiPaths.CSRF_TOKEN_PATH);
  csrfToken = response.data.token;
}

// 2️⃣ Axios request interceptor
axios.interceptors.request.use(
  async (config) => {
    const riskyMethods = ['post', 'put', 'patch', 'delete'];
    const method = (config.method || '').toLowerCase();
    console.log(config.url);
    let requestOrigin = '';
    try {
      const fullUrl = new URL(config.url as string, config.baseURL);
      requestOrigin = fullUrl.origin;
    } catch {
      console.warn('Could not parse request URL for CSRF check:', config.url);
    }
    const isOwnApi = requestOrigin === ApiPaths.BACK_ORIGIN;
    console.log(isOwnApi);
    if (riskyMethods.includes(method) && isOwnApi) {
      if (!csrfToken) {
        await refreshCsrfToken();
      }
      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
