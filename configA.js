import axios from 'axios';

// 1) Send cookies (and thus the XSRF‐TOKEN cookie) on cross‐site requests
axios.defaults.withCredentials = true;

// 2) Tell Axios which cookie to look for, and which header to send
//    (These names match Spring Security’s defaults out of the box.)
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// 3) (Optional) If you want a base URL for all your calls:
axios.defaults.baseURL = 'http://localhost:5173';

// 4) (Optional) Any other defaults you need
axios.defaults.timeout = 10000; // e.g. 10 seconds
// axios.defaults.headers.common['Authorization'] = 'Bearer <your-token>'; 

// 5) Export the configured axios as the default export
export default axios;
