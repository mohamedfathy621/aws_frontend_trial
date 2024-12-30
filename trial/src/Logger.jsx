import { login } from "./assets/handleRequests";
const Logger= ({setform,setLogged,setMessage}) =>{
    
    const handlesubmit=(event)=>{
            event.preventDefault();
            login(event.target).then((ans)=>{
                if(ans.status=='200'){
                    setLogged(true)
                    localStorage.setItem('username',ans.data['username'])
                    setMessage(ans.data['message'])
                }      
                else{
                    setMessage(ans.data['error'])
                }         
                console.log(ans)})
    }
    return (
        <div>
            <h1> log in user</h1>
            <form onSubmit={handlesubmit} className="container" style={{width:"50%"}}>
                <input type="text" name="username"  className={'form-control'} style={{marginBottom:"5px"}} placeholder="user name"></input>
                <input type="password" name="password"  className={'form-control'} style={{marginBottom:"5px"}} placeholder="user password"></input>
                <button type='submit' className='btn btn-primary'>submit</button>
                
            </form>
            <p>register from here .<span style={{color:"blue",fontWeight:"500",textDecoration:"underline",cursor:"pointer"}} onClick={()=>setform('reg')}> join us</span></p>
        </div>
    )
}
export default Logger