import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        props.showAlert("Success", "Logged Out Successfully !", "fa-check-square", "green");
        navigate("/login");
    }
    let location = useLocation();
    React.useEffect(() => {
        //prints the current path of website page
        // console.log(location.pathname);
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ?
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form>
                        :
                        <>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <div className="btn-group">
                                        <Link className="nav-link dropdown-toggle text-light" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Welcome! <b>{localStorage.getItem('name')}</b>
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <button onClick={handleLogout} className="dropdown-item" type="button">Log Out</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </>}
                </div>
            </div>
        </nav>
    )
}
