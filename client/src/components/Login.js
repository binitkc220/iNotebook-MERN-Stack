import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();

    //redirect to notes page if already logged in
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('name', json.name);
            navigate("/");
            props.showAlert("Success", "Logged In Successfully !", "fa-check-square", "green");
        }
        else {
            props.showAlert("Error", "Invalid Credentials !", "fa-circle-xmark", "red");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-3">
            <h2 className="my-3">Login to continue to iNotebook</h2>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}

export default Login
