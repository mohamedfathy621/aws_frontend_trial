import { download } from "./handleRequests";
import { sendfile } from "./handleRequests";
import { sendquery } from "./handleRequests";
export function down_excel(){
  const formdata = new FormData();
  formdata.append('username',localStorage.getItem('username'))
  download(localStorage.getItem('authToken')).then((ans)=>{
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
export function handleForm(event,file,setTables,SetTable,setMessage,setError){
  event.preventDefault();
  setError('')
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if(fileExtension!='xlx'&&fileExtension!='xlsx'){
    setTables(null)
    SetTable(null)
    setMessage("only excel files allowed")
    
    return
  }
  SetTable(null)
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append('username',localStorage.getItem('username'))

  sendfile(formdata,localStorage.getItem('authToken')).then((ans)=> {
    setTables(ans.data['message'])
    setError("")
    
  })
 }

 export function handlequery(SetTable,setMessage,setError,setTables,query){
   const formdata = new FormData();
   formdata.append("query", query);
   formdata.append('username',localStorage.getItem('username'))
   sendquery(formdata,localStorage.getItem('authToken')).then((ans)=>{
     if(ans.status==200){
       if(ans.data['type']=='read'){ 
         SetTable([ans.data['rows'],ans.data['column']])
         setMessage(ans.data['message'])
         setError('')
       }
       else{
       
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