import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import note_image from '../images/note.png'

const Login = (props) => {
    let navigate = useNavigate();

    //redirect to notes page if already logged in
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const [loader, setLoader] = useState(false);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
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
        setLoader(false);
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
        <div className="container container-signup mt-4 p-4">
            <div className="d-flex justify-content-center my-4">
                <div className="fit-content">
                    <div className="typed-out">Welcome to iNotebook !</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md px-4">
                    <h2 className="my-4">Login to continue to iNotebook</h2>
                    <form className="my-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <div className="input-group">
                                <div className="input-group-text border-0 border-bottom bg-transparent"><i className="fa-solid fa-envelope"></i></div>
                                <input type="email" className="form-control border-0 border-bottom" id="email" name="email" onChange={onChange} value={credentials.email} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <div className="input-group-text border-0 border-bottom bg-transparent"><i className="fa-solid fa-key"></i></div>
                                <input type="password" className="form-control border-0 border-bottom" name="password" id="password" onChange={onChange} value={credentials.password} minLength={5} required />
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <button type="submit" className="btn btn-primary mx-3">Log In</button>
                            {loader && <div class="spinner-border text-success" role="status">
                            </div>}
                        </div>
                    </form>
                </div>
                <div className="col-md d-flex justify-content-center align-items-center">
                    <img src={note_image} className="img-fluid small-image" alt="Sign In" />
                </div>
            </div>
        </div>
    )
}

export default Login
