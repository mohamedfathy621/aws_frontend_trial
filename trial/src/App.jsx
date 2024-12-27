import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendHI } from './assets/handleRequests';
import { sendfile } from './assets/handleRequests';
import { sendquery } from './assets/handleRequests';
import TableMenu from './TableMenu';
import Data from './Data';
function App() {
 const [file,setFile] = useState(null)
 const [table,SetTable]= useState(null)
 const [tables,setTables]= useState(null)
 const [query,setQuery] = useState(null)
 const [error,setError] = useState('')
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
  console.log(file)
  sendfile(formdata).then((ans)=> {
    setTables(ans.data['message'])
    setError("")
    console.log(ans.data)
  })
 }
 const handlequery= ()=>{
  const formdata = new FormData();
  formdata.append("query", query);
  sendquery(formdata).then((ans)=>{
    if(ans.status==200){
      SetTable([ans.data['message'],ans.data['column']])
      setError('')
    }
    else{
      setError(ans.data['error'])
    }
  })
 }
  return (
    <>
      <div className='container text-center' style={{border:"1px solid lightgrey", marginTop:"5%",padding:"1%",borderRadius:"10px",boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.7)"}}>
        <h1 style={{marginBottom:"50px"}}>hello upload your files here</h1>
        {!0?
        <>
        <input type='text' className='form-control'  placeholder='write your queires here' style={{marginBottom:"20px"}} onChange={handleQuerychange}></input>
        <button className='btn btn-success' style={{marginBottom:"20px"}} onClick={handlequery}>send query</button>
        </>
        :null
        }
        <form onSubmit={handleForm}>
          <input type='file' onChange={handlefile}></input>
          <button type='submit' className='btn btn-primary'>submit</button>
        </form>
        {tables?<TableMenu tables={tables} settable={SetTable}/>:null}
        <h1 style={{color:"red"}}>{error}</h1>
      </div>
      
      {table?
      <div className='container' style={{marginTop:"2%"}}>
      <Data cols={table[1]} rows={table[0]}/>
      </div>
      :
      null
    }
      
    
    </>
  )
}

export default App
