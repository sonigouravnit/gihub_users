/**
 * Created by gouravsoni on 20/02/18.
 */

import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com/search';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default function (request) {

    /*{
     method: 'POST',
     url: '',
     data: {}
     }*/
    return axios(request).then(success => {
        return success;
    }).catch(error => {
        throw error;
    })
}

export const urlsConfig = {

    SEARCH: {
        method: 'GET',
        url: 'https://api.github.com/search/users?q=:userName'
    },
    USER: {
        method: 'GET',
        url: 'https://api.github.com/users/:userId'
    }
};