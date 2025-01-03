import TableMenu from "./TableMenu"
import { refresh } from './assets/handleRequests';
import { sendHI,log_out } from "./assets/handleRequests";
const Loader=({tables,handleQuerychange,handlequery,handlefile,handleForm,SetTable,error,setLogged,setTables,setFile,setQuery,setError})=>{
    const logout=()=>{
      const formdata = new FormData();
      formdata.append('username',localStorage.getItem('username'))
        log_out(localStorage.getItem('authToken')).then(()=>{
          localStorage.removeItem('username')
          localStorage.removeItem('authToken')
          SetTable(null)
          setLogged(false)
          setTables(null)
          setFile(null)
          setQuery(null)
          setError('')
        })
    }
     const refresh_data= ()=>{
      const formdata = new FormData();
      setError('')
      formdata.append('username',localStorage.getItem('username'))
      refresh(formdata).then((ans)=>{
        setTables(Object.keys(ans.data.dataset).map((sheet)=>[sheet,ans.data.dataset[sheet]['rows'],ans.data.dataset[sheet]['columns']]))
      })
     }
    return (
        <>
       
        <h1 style={{marginBottom:"50px"}}>hello upload your files here</h1>
        <form onSubmit={handleForm} style={{marginBottom:"10px",borderBottom:"2px solid black",paddingBottom:"20px"}}>
          <input type='file' onChange={handlefile}></input>
          <button className='btn btn-primary'>submit</button>
        </form>
        <button className='btn btn-success' style={{marginRight:"20px",display:tables?"none":"inline"}} onClick={refresh_data}>load latest database</button>
        {tables?
        <div style={{borderBottom:"2px solid black"}}>
        <h3>write sql queries</h3>
        <input type='text' className='form-control'  placeholder='write your queires here' style={{marginBottom:"20px"}} onChange={handleQuerychange}></input>
        <button className='btn btn-success' style={{marginBottom:"20px"}} onClick={handlequery}>send query</button>
        <h1 style={{color:"red"}}>{error}</h1>
        </div>
        :null
        }
        {tables?
        <>
        <div style={{borderBottom:"2px solid black",paddingBottom:"20px",marginBottom:"5px"}}>
        <h3>sheets in the excel file</h3>
        <TableMenu tables={tables} settable={SetTable}/>
        </div>
        </>
        :null}
        <button className='btn btn-warning' onClick={logout}>log out</button>
        </>
    )
}
export default Loader