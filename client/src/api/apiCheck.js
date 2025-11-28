import axios from "axios";   //token check cheyadaniki
axios.defaults.withCredentials = true;//global ga ekada pedithe login lo pettakaledu
const API = axios.create({    //edigo axios na kosam oka object ni create chey
    baseURL: `${import.meta.env.VITE_API_URL}/api` ,   //every request use the base url  default  //annitilo marchakunda e oka dagara maristhe saripoddi...2000 ane url we replaced this after deployment
    withCredentials:true   //related to cookie
})

//attach the token to every file
API.interceptors.request.use((req) => {   //local storage lo unna token ni use chesko
    const token = localStorage.getItem("token") //login.jsx lo unnadi 
    if (token) { //token unte
        req.headers.Authorization = `Bearer ${token}`  //default structure   url lo paina mana details kanipistayi avi kanapadakunda undataniki bearer use chestham
    }
    return req
})
export default API  //we will use this in so many files