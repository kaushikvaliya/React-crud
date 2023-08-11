import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditeUser = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(false);
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");


    useEffect(() => {
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
        setPassword(localStorage.getItem("password"));
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUpdateBtnClick = async () => {
        // Delete data from localStorage
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        try {
            const response = await axios.put(`http://localhost:5000/users/${id}`, {
                name: Name,
                password: Password,
                email: Email
            });
            if (response.status === 200) {
                console.log("Server connected", response);
                setErrorMsg(false);
                navigate("/");
            } else {
                console.log("Error while connecting to the server");
            }
        } catch (error) {
            console.log("Inside catch", error);
            setErrorMsg(true);
            if (error.response) {
                console.log(error.response);
                console.log("Server responded");
            } else if (error.request) {
                console.log("Network error");
            } else {
                console.log(error);
            }
        }


    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        name='name'
                                        className="form-control"
                                        placeholder="Enter User Name"
                                        value={Name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        name='email'
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={Email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        name="password"
                                        value={Password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Update"
                                        name="btn-update"
                                        onClick={handleUpdateBtnClick}
                                        id="btn-update"
                                    />
                                    <Link className="btn btn-primary mx-2" to="/">
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditeUser;
