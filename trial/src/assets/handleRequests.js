import axios from 'axios';
const backpath='http://exceltosql-env-4.eba-nh3jpk3j.me-south-1.elasticbeanstalk.com'
export async  function sendHI(){
    const response = await axios.get(`${backpath}/transformer/hello`)
    return response
}
export async function sendfile(formdata){
    const response = await axios.post(`${backpath}/transformer/file`,formdata)
    return response
}
export async function sendquery(formdata){
    const response = await axios.post(`${backpath}/transformer/query`,formdata)
    return response
}
export async function registuser(formdata){
    const response = await axios.post(`${backpath}/transformer/regist`,formdata,{
        headers: { 'Content-Type': 'application/json' },
    })
    return response
}
export async function login(formdata){
    const response = await axios.post(`${backpath}/transformer/login`,formdata,{
        headers: { 'Content-Type': 'application/json' },
    })
    return response
}
export async function download(formdata){
    const response = await axios.post(`${backpath}/transformer/download`,formdata,{
        responseType: 'blob', // Ensure response is treated as a blob
    })
    return response
}
export async function refresh(formdata){
    const response = await axios.post(`${backpath}/transformer/refresh`,formdata)
    return response
}
export async function kickuser(formdata){
    const response = await axios.post(`${backpath}/transformer/logout`,formdata)
    return response
}