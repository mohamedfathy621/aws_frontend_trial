import axios from 'axios';
const backpath='http://127.0.0.1:8000/'
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