import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendfile } from './assets/handleRequests';
import { sendquery } from './assets/handleRequests';
import { download } from './assets/handleRequests';
import Loader from './Loader';
import Data from './Data';
import Logger from './Logger';
import Regist from './Regist';
import "./assets/animations.css"
function App() {
 const [file,setFile] = useState(null)
 const [table,SetTable]= useState(null)
 const [tables,setTables]= useState(null)
 const [query,setQuery] = useState(null)
 const [error,setError] = useState('')
 const [form,setform] = useState('log')
 const [logged,setLogged]= useState(localStorage.getItem('username')?true:false)
 const [message,setMessage]= useState('')
 const handlefile=  (event) =>{
  setFile(event.target.files[0])
 }
 const handleQuerychange = (event) =>{
    setQuery(event.target.value)
 }
 const handleForm= (event)=>{
  event.preventDefault();
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if(fileExtension!='xlx'&&fileExtension!='xlsx'){
    setTables(null)
    SetTable(null)
    setError("only excel files allowed")
    console.log(fileExtension)
    return
  }
  SetTable(null)
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append('username',localStorage.getItem('username'))
  console.log(file)
  sendfile(formdata).then((ans)=> {
    setTables(ans.data['message'])
    setError("")
    console.log(ans.data)
  })
 }

 const down_excel = ()=>{
  const formdata = new FormData();
  formdata.append('username',localStorage.getItem('username'))
  download(formdata).then((ans)=>{
    const url = window.URL.createObjectURL(new Blob([ans.data]))
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}
 const handlequery= ()=>{
  const formdata = new FormData();
  formdata.append("query", query);
  formdata.append('username',localStorage.getItem('username'))
  sendquery(formdata).then((ans)=>{
    if(ans.status==200){
      if(ans.data['type']=='read'){ 
        SetTable([ans.data['rows'],ans.data['column']])
        setMessage(ans.data['message'])
        setError('')
      }
      else{
        console.log(Object.keys(ans.data.dataset))
        SetTable(null)
        setTables(Object.keys(ans.data.dataset).map((sheet)=>[sheet,ans.data.dataset[sheet]['rows'],ans.data.dataset[sheet]['columns']]))
        setMessage(ans.data['message'])
        setError('')
      }
    }
    else{
      setError(ans.data['error'])
    }
  })
 }
  return (
    <>
      
      <div className='container text-center ' style={{border:"1px solid lightgrey", marginTop:"5%",padding:"1%",borderRadius:"10px",boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.7)"}}>
        {!logged?
        form=='log'?<Logger setform={setform} setLogged={setLogged} setMessage={setMessage}/>:<Regist setform={setform} setMessage={setMessage}/>
        :
        <>
        <Loader tables={tables} handleQuerychange={handleQuerychange} handleForm={handleForm} handlefile={handlefile} handlequery={handlequery} error={error} SetTable={SetTable} setLogged={setLogged} setTables={setTables} setFile={setFile} setQuery={setQuery} setError={setError}/>
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
      <div className='container text-center form-heart' style={{border:"1px solid lightgrey", marginTop:"5%",padding:"1%",borderRadius:"10px",boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.7)",width:"10%",zIndex:"3",display:message.length>0?"block":"none",position:"absolute",top:"10%"}} onAnimationEnd={()=>setMessage('')}>
        <h3>{message}</h3>
      </div>
    
    </>
  )
}

export default App
