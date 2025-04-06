import { api } from "../config"
import axios from "axios"
import { history } from "./historyFile"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

axios.defaults.baseURL = api.API_URL;
axios.defaults.headers.common["X-API-Version"] = "1";

let token = localStorage.getItem("token");

token = token && JSON.parse(token) || "";


if(token && token.length >0)  axios.defaults.headers.common["Authorization"] = "Bearer "+ token;

//interceptor on send
axios.interceptors.request.use(
    (config) => {
        // nprogress.start();
        return config;
    },
    (error) => {
        // nprogress.done();
        return Promise.reject(error);
    }
) 

// Interceptor to capture errors
axios.interceptors.response.use(
    function (response) {
        // nprogress.done();
        return response.data || response;
    },

    async function (error) {
        // let message;
        switch (error?.response?.status) {
            // case 400:
            //     message = error
            //     break;
            // case 500:
            //     message = "Internal serveur error"
            //     break;
            // case 401:
            //     message: "Invalid credentials"
            //     break;
            case 403:
                redirect("/login");
                break;
            // case 404:
            //     message: "Ressource not found"
            //     break;
            // default:
            //     message = error.message || error;
        }
        nprogress.done();
        return Promise.reject(error?.response?.data);
    }
)


// Set default authorisation
// @param {*} token
const setAuthorization = (token: string) => {
    axios.defaults.headers.common["Authorization"] = "Bearer "+token
}

const removeAuthorization = () => {
    axios.defaults.headers.common["Authorization"] = ""
}

const redirect = (road: string) => {
    removeAuthorization()
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    history.push(road)
    window.location.reload()
}

class  APIClient {

    get = (url: string, params?: {[key: string]: string}) => {
        let response: object
        let paramKeys: Array<string> = []

        if (params) {
            Object.keys(params).map(key => {
                paramKeys.push(key + '=' +params[key])
                return paramKeys
            })

            const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }

        return response;
    }

    create = (url: string, data?: any) => {
        return axios.post(url, data);
    }

    update = (url: string, data?: any) => {
        return axios.put(url, data);
    }

    patch = (url: string, data: any) => {
        return axios.patch(url, data)
    }

    delete = (url: string) => {
        return axios.delete(url);
    }
}

const getLoggedInUserToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return JSON.parse(token)
    }
    return null
}

export { APIClient, setAuthorization, removeAuthorization, getLoggedInUserToken }