import { registuser } from "./assets/handleRequests";
import { useState } from "react";
const Regist= ({setform,setMessage}) =>{
    const [pass,setPass] = useState('')
    const [name,setName] = useState('')
    const [sent,setSent] = useState(false)
    const handlesubmit=(event)=>{
        const formdata = new FormData();
        formdata.append("password", pass);
        formdata.append('username',name)
        setSent(true)
        event.preventDefault();
        if(pass.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)&&name.match(/^[A-Za-z\s]{4,20}$/)){
        console.log(name)
        registuser(formdata).then((ans)=>{
            console.log(ans)
            if(ans.status==200){
            setform('log')
                setMessage(ans.data['message'])
            }
            else{
                setMessage(ans.data['error'])
            }
            event.target.reset() 
        })
        }
    }
    return (
       
        <div>
            <h1> register user</h1>
            <form onSubmit={handlesubmit} className="container" style={{width:"50%"}}>
                <input type="text" className={'form-control'} name="username" placeholder="user name" style={{marginBottom:"5px"}} onChange={(event)=>setName(event.target.value)}></input>
                <small className="form-text " style={{color:"red",marginBottom:"10px",display:!name.match(/^[A-Za-z\s]{4,20}$/)&&sent?"block":"none"}}>name should contain only letters and be more than 4 characters</small>
                <input style={{marginBottom:"5px"}} className={'form-control'} type="password" name="password" placeholder="user password" onChange={(event)=>setPass(event.target.value)}></input>
                <small className="form-text " style={{color:"red",marginBottom:"10px",display:!pass.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)&&sent?"block":"none"}}>password should be more than 8 characters and contain a capital letter and a number</small>
                <button type='submit' className='btn btn-primary'>submit</button>
            </form>
            <p>already registerd .<span style={{color:"blue",fontWeight:"500",textDecoration:"underline",cursor:"pointer"}} onClick={()=>setform('log')}> log in</span></p>
        </div>
    )
}
export default Regist