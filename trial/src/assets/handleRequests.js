import axios from 'axios';
const backpath="http://15.184.77.221:3000"


export async  function sendHI(){
    const response = await axios.get(`${backpath}/gatekeeper/hello`)
    return response
}
export async function sendfile(formdata,authToken){

    const response = await axios.post(`${backpath}/gatekeeper/file`,formdata,{
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
    return response
}
export async function sendquery(formdata,authToken){
    
    const response = await axios.post(`${backpath}/gatekeeper/query`,formdata,{
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
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
export async function download(authToken){
 
    const response = await axios.get(`${backpath}/gatekeeper/download`,{
        responseType: 'blob', // Ensure response is treated as a blob
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
    return response
}
export async function refresh(){
    const authToken = localStorage.getItem('authToken');
    const response = await axios.get(`${backpath}/gatekeeper/reload`,{
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
    return response
}


export async function refresh_token(authToken){
    const response = await axios.get(`${backpath}/gatekeeper/refresh`,{
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
    return response
}
export async function log_out(authToken){
    console.log(authToken)
    const response = await axios.get(`${backpath}/gatekeeper/logout`,{
        headers: {  'Authorization': `Bearer ${authToken}` }
    })
    return response
}