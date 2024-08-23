import React, { useState, useContext } from 'react';
import NoteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [details, setDetails] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [localAlert, setLocalAlert] = useState({ visible: false, type: "", message: "" });
    const context = useContext(NoteContext);
    const { setType, setMessage, setAlert, signup } = context;
    let navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        
        let result = await signup(details.name, details.email, details.password);

        setDetails({ name: "", email: "", password: "", cpassword: "" });

        if (result.success) {
            localStorage.setItem('token', result.auth);
            
          

            setLocalAlert({ visible: true, type: "success", message: "Success, Signed up successfully" });

            setTimeout(() => {
                setLocalAlert({ visible: false, type: "", message: "" });
                navigate("/home");
            }, 2000);
        } else {
          
            

            setLocalAlert({ visible: true, type: "alert", message: "Please Sign up with the correct credentials" });

            setTimeout(() => {
                setLocalAlert({ visible: false, type: "", message: "" });
            }, 2000);
        }
    };

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-2'>
            {localAlert.visible && (
                <div className={`alert alert-${localAlert.type}`} role="alert">
                    {localAlert.message}
                </div>
            )}
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={8} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={8} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signup;
