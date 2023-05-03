import axios from 'axios'
import Cookies from "js-cookie";


const baseUrl=process.env.REACT_APP_API_URL

const instance=axios.create({
    timeout:300000,
})


instance.interceptors.request.use(
    (config)=>{
        config.headers.Authorization = Cookies.get("token") ? '' : 'Bearer ' +  Cookies.get("token")
        config.headers['Content-Type']= config?.content_type ?? 'application/json; charset=utf-8'
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response)=>{
        if(response.status===200){
            return Promise.resolve(response.data)
        }else{

        }
    }
)

const Get = (url, params, config) => {
	return new Promise((resolve, reject) => {
		instance({
			method: 'get',
			url,
			params,
			...config
		})
			.then((response) => {
				// response.code = 1000;
				resolve(response)
			})
			.catch((error) => {
				// error.code = -1;
				reject(error)
			})
	})
}

const Post = (url, data, config) => {
	return new Promise((resolve, reject) => {
		instance({
			method: 'post',
			url,
			data,
			...config
		})
			.then((response) => {
				// response.code = 1000;
				resolve(response)
			})
			.catch((error) => {
				// error.code = -1;
				reject(error)
			})
	})
}


export const login = (data) => Post('http://35.89.86.149:8080/login', data)
export const PostBuy = (p) => Post('http://35.89.86.149:8080/buy', p)
export const PostSell = (p) => Post('http://35.89.86.149:8080/repay', p)
export const PostLookrareSell = (p) => Post('http://35.89.86.149:8080/repay', p)
export const GetOrderNonce = (p) => Get('https://api.looksrare.org/api/v2/orders/nonce', p)

export const uploadFile = (p) => Post('/file/upload', p, { content_type: 'multipart/form-data' })