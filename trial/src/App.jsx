import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendfile } from './assets/handleRequests';
import { sendquery,refresh_token } from './assets/handleRequests';
import {down_excel,handleForm,handlequery} from './assets/helperfunctions';
import Loader from './Loader';
import Data from './Data';
import Logger from './Logger';
import Regist from './Regist';
import "./assets/animations.css"
function App() {
 if(localStorage.getItem('authToken')){
  const tokenPayload = JSON.parse(atob(localStorage.getItem('authToken').split('.')[1])); // Decode JWT payload
  const expiry = tokenPayload.exp * 1000;
  const now = Date.now();
 
  if (expiry - now < 15 * 60 * 1000) {
    refresh_token(localStorage.getItem('authToken')).then(
      (ans)=> {
        localStorage.setItem('authToken',ans.data.token)
       
      }
    ).catch(()=>{
      
      setLogged('false')
      localStorage.removeItem('username')
      localStorage.removeItem('authToken')
      SetTable(null)
      setTables(null)
      setFile(null)
      setQuery(null)
      setError('')
      setMessage('Your session has expired')
    })
  }
 }
 const [file,setFile] = useState(null)
 const [table,SetTable]= useState(null)
 const [tables,setTables]= useState(null)
 const [query,setQuery] = useState(null)
 const [error,setError] = useState('')
 const [form,setform] = useState('log')
 const [logged,setLogged]= useState(localStorage.getItem('username')&&localStorage.getItem('authToken')?true:false)
 const [message,setMessage]= useState('')
 const handlefile=  (event) =>{
  setFile(event.target.files[0])
 }
 const handleQuerychange = (event) =>{
    setQuery(event.target.value)
 }
 const upload_file= (event)=>{
  handleForm(event,file,setTables,SetTable,setMessage,setError)
 }
 const excutequery= ()=>{
  handlequery(SetTable,setMessage,setError,setTables,query)
 }
  return (
    <>
      <div className='container text-center form-heart' >
        {!logged?
        form=='log'?<Logger setform={setform} setLogged={setLogged} setMessage={setMessage}/>:<Regist setform={setform} setMessage={setMessage}/>
        :
        <>
        <Loader tables={tables} handleQuerychange={handleQuerychange} handleForm={upload_file}
         handlefile={handlefile} handlequery={excutequery} error={error} SetTable={SetTable} 
         setLogged={setLogged} setTables={setTables} setFile={setFile} setQuery={setQuery} setError={setError}
         />
          <button className='btn btn-success' onClick={down_excel} style={{display:tables?'block':'none'}}>export excel</button>
        
        </>
          }
      </div>
      {table?
      <div className='container' style={{marginTop:"2%"}}>
      <Data cols={table[1]} rows={table[0]}/>
      </div>
      :
      null
    }
      <div className='container text-center message-box' style={{display:message.length>0?"block":"none"}} onAnimationEnd={()=>setMessage('')}>
        <h3>{message}</h3>
      </div>
    </>
  )
}

export default App
