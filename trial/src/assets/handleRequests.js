import axios from 'axios';
const backpath="http://127.0.0.1:3000"
const authToken = localStorage.getItem('authToken');

export async  function sendHI(){
    const response = await axios.get(`${backpath}/gatekeeper/hello`)
    return response
}
export async function sendfile(formdata){
    console.log(authToken)
    const response = await axios.post(`${backpath}/gatekeeper/file`,formdata,{
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
    return response
}
export async function sendquery(formdata){
    const response = await axios.post(`${backpath}/transformer/query`,formdata)
    return response
}
export async function registuser(formdata){
    const response = await axios.post(`${backpath}/gatekeeper/regist`,formdata,{
        headers: { 'Content-Type': 'application/json' },
    })
    return response
}
export async function login(formdata){
    const response = await axios.post(`${backpath}/gatekeeper/login`,formdata,{
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.status === 200) {
        const { token } = response.data['token'];
        localStorage.setItem('authToken', token); // Save token in localStorage
    }
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
    const response = await axios.post(`${backpath}/gatekeeper/logout`,formdata)
    return response
}


