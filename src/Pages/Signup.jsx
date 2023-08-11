import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState('');

    const registration = (event) => {
        event.preventDefault();



        const userData = { email, password, name };

        axios.post("http://localhost:5000/users", userData)
            .then(response => {
                console.log(response.data);
                setName('');
                setEmail('');
                setPassword('');
                setRegistrationSuccess('Registration successful');
                setTimeout(() => {
                    setRegistrationSuccess('');
                }, 3000);
            })
            .catch(error => {
                console.error("Registration error:", error);
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '88vh' }}>
            <div className="col-lg-5 m-auto">
                <div className='card p-5'>
                    <div className="container">
                        <h2>Sign Up</h2>
                        <form onSubmit={registration}>

                            <input
                                required
                                className='form-control mb-3'
                                type="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                required
                                className='form-control mb-3'
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                required
                                className='form-control mb-3'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className='btn mt-3 w-100 btn-primary' type="submit">Sign Up</button>
                        </form>
                        <p className="text-success mt-2">{registrationSuccess}</p>
                        <Link className='btn mt-3 btn-primary' to="/">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
