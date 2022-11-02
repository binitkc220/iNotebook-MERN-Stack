import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import checklist from '../images/checklist.jpg';

const Signup = (props) => {
    let navigate = useNavigate();

    //redirect to notes page if already logged in
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const [loader, setLoader] = useState(false);

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const host = "http://localhost:5000";
        const { name, email, password, cpassword } = credentials;
        if (password !== cpassword) {
            setLoader(false);
            props.showAlert("Error", "Password do not match !", "fa-circle-xmark", "red");
            return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        // console.log(json);
        setLoader(false);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('name', name);
            navigate("/");
            props.showAlert("Success", "Registered Successfully !", "fa-check-square", "green");
        }
        else {
            props.showAlert("Error", json.error, "fa-circle-xmark", "red");
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
            <h2 className="my-4">Create an Account to use iNotebook</h2>
            <div className="row">
                <div className="col-md px-4">
                    <form className="my-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <div className="input-group">
                                <div className="input-group-text border-0 border-bottom bg-transparent"><i className="fa-solid fa-user"></i></div>
                                <input type="text" className="form-control border-0 border-bottom" id="name" name="name" onChange={onChange} value={credentials.name} minLength={3} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <div className="input-group">
                                <div className="input-group-text border-0 border-bottom bg-transparent"><i className="fa-solid fa-envelope"></i></div>
                                <input type="email" className="form-control border-0 border-bottom" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required />
                            </div>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <div className="input-group-text border-0 border-bottom bg-transparent"><i className="fa-solid fa-key"></i></div>
                                <input type="password" className="form-control border-0 border-bottom" name="password" id="password" onChange={onChange} value={credentials.password} minLength={5} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <div className="input-group">
                                <div className="input-group-text border-0 border-bottom bg-transparent"><i className="fa-solid fa-lock"></i></div>
                                <input type="password" className="form-control border-0 border-bottom" name="cpassword" id="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required />
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <button type="submit" className="btn btn-primary mx-3">Sign Up</button>
                            {loader && <div class="spinner-border text-success" role="status">
                            </div>}
                        </div>
                    </form>
                </div>
                <div className="col-md p-0">
                    <img src={checklist} className="img-fluid" alt="Sign UP" />
                </div>
            </div>
        </div>
    )
}

export default Signup
