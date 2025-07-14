// axiosConfig.ts
import axios from 'axios';
import { ApiPaths } from './apiPaths';

axios.defaults.withCredentials = true;

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

    if (riskyMethods.includes(method)) {
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
