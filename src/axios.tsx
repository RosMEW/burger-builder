import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ros.firebaseio.com/'
});

export default instance;
