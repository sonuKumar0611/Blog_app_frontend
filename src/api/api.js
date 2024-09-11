
import axios from 'axios';
import { API_BASE_URL, cleanLocalStorage, getJWTToken } from '../helper/helper';

const BASE_URL = API_BASE_URL || 'http://localhost:8000';

const GetApi = (tag = '', isHeader = false) => {
    return axios
        .get(BASE_URL + '' + tag, {
            headers: isHeader
                ? {
                    Authorization: getJWTToken()
                }
                : {}
        })
        .then((data) => {
            return data;
        })
        .catch(async (e) => {
            ErrorHandler(e);
        });
};

const PostApi = (tag = '', reqBody, isHeader = false, flag = false) => {
    let flagCheck = flag
        ? 'multipart/form-data; boundary=----WebKitFormBoundaryueI4YvrqiXxUgVGA'
        : 'application/json';

    return axios
        .post(BASE_URL + '' + tag, reqBody, {
            headers: isHeader
                ? {
                    'Content-Type': flagCheck,
                    accept: 'application/json',
                    Authorization: getJWTToken()
                }
                : {}
        })
        .then((data) => {
            return data;
        })
        .catch(async (e) => {
            ErrorHandler(e);
        });
};

const DeleteApi = (tag = '', isHeader = false) => {
    return axios
        .delete(BASE_URL + '' + tag, {
            headers: isHeader
                ? {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    Authorization: getJWTToken()
                }
                : {}
        })
        .then((data) => {
            return data;
        })
        .catch(async (e) => {
            ErrorHandler(e);
        });
};

const PutApi = (tag = '', reqBody, isHeader, isJSON = false) => {
    const contentType = {
        'Content-Type': 'application/json'
    };
    const headers = {
        accept: 'application/json',
        Authorization: getJWTToken(),
        ...(isJSON ? contentType : {})
    };
    return axios
        .put(BASE_URL + '' + tag, reqBody !== null && reqBody, {
            headers: isHeader ? headers : {}
        })
        .then((data) => {
            return data;
        })
        .catch(async (e) => {
            ErrorHandler(e);
        });
};

const ErrorHandler = async (e) => {
    if (e.response?.data?.message) {
        if (e.response?.data?.code === 401) {
            cleanLocalStorage();
            window.location.href = '/login';
        } else {
            // errorToast(e.response?.data?.message);
        }
    } else if (e.response?.data) {
        if (e.response?.data?.code === 401) {
            // errorToast(e.response?.data?.message);
            cleanLocalStorage();
            window.location.href = '/login';
        } else {
            // errorToast(e.response?.data?.meta?.message);
        }
    } else {
        // errorToast('Something went wrong');
    }
};

export const Api = {
    login: (reqBody) => PostApi('/login', reqBody),
    signUp: (reqBody) => PostApi('/signup', reqBody),
    addBlog: (reqBody) => PostApi('/blogs', reqBody, true, true),
    getBlog: (blog_id) => GetApi(`/blogs/${blog_id}`, true),
    getBlogs: (pageNumber, pageSize) => GetApi(`/blogs?page_number=${pageNumber}&page_size=${pageSize}`, true),
    deleteBlog: (id) => DeleteApi(`/blogs/${id}`, true),


    

};
