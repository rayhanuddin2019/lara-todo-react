import axios from 'axios';

axios.defaults.baseURL = window.Laravel.appUrl; // Your Laravel app URL
axios.defaults.withCredentials = true;

export default axios;