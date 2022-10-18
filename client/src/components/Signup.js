import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();

    //redirect to notes page if already logged in
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        const {name, email, password, cpassword} = credentials;
        if(password !== cpassword)
        {
            props.showAlert("Error", "Password do not match !", "fa-circle-xmark", "red");
            return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('name',name);
            navigate("/");
            props.showAlert("Success", "Registered Successfully !", "fa-check-square", "green");
        }
        else
        {
            props.showAlert("Error", json.error, "fa-circle-xmark", "red");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    return (
        <div className="container mt-3">
            <h2 className="my-3">Create an Account to use iNotebook</h2>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={credentials.password} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
