
// axiosConfig.js
import axios from 'axios';

// ─── 1) Standard defaults ───────────────────────────────────────────────────
axios.defaults.withCredentials    = true;
axios.defaults.baseURL            = 'http://localhost:8080/api';
axios.defaults.xsrfCookieName     = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName     = 'X-XSRF-TOKEN';
axios.defaults.timeout            = 10000; // optional

const CSRF_ENDPOINT = '/csrf';

function getCookieValue(name:string) {
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// ─── 4) The request interceptor ─────────────────────────────────────────────
//    This runs before *every* request.  What it does:
//      • If we’re already calling the CSRF_ENDPOINT itself, skip this logic.
//      • Otherwise, check if “XSRF-TOKEN” exists in document.cookie.
//         – If it does, all good: just return the config immediately.
//         – If it does not, `await axios.get('/csrf')` to set the cookie,
//           then return the original config so Axios will continue.

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

    // Otherwise, we must fetch /csrf *once* to set the cookie.
    // We bypass the interceptor for that call by marking a custom header:
    await axios.get(CSRF_ENDPOINT, {
      // Bypass this interceptor for the CSRF fetch:
      headers: { 'X-Skip-Csrf-Interceptor': 'true' },
    });

    // Once that GET completes, the browser has the XSRF-TOKEN cookie.
    // Now Axios will read document.cookie and attach X-XSRF-TOKEN automatically.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;
