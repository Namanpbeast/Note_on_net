import React,{useState,useContext} from 'react'
import NoteContext from '../context/noteContext'
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [details, setDetails]=useState({name:"",email:"",password:""})
    const context = useContext(NoteContext);
    const {setType,setMessage,setAlert,login, } = context;
    let navigate=useNavigate();
   
   

    const submit=async(e)=>{
        e.preventDefault();
       let result=await login(details.email,details.password)
       setDetails({name:"",email:"",password:""})
       console.log(result);
       if(result.success){
        localStorage.setItem('token',result.auth)
        setType("success");
        setMessage("Logged In successfully")
        setAlert(true);
        setTimeout(()=>{
          console.log("Setting UP the time")
          setAlert(false);
          console.log(alert)
        },2000)
        navigate("/home");
      }
      else {
        setType("Alert");
        setMessage("Please LogIn with the correct Credential ")
        setAlert(true);
        setTimeout(()=>{
          setAlert(false);
        },2000)
      }
      }

    const onChange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
      }
  return (
    <div className='container my-2'>
        <form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={8} required/>
  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
