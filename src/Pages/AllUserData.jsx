import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllUserData = () => {

    const [loader, setLoader] = useState(true);
    // delete
    const [loade, setLoade] = useState(true);

    const [allUsers, setAllUsers] = useState(null);
    const [scarchData, setSearchData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        savedata();
    }, [loade]);


    let hendelDelete = async (id) => {
        const response = await axios.delete(`http://localhost:5000/users/${id}`)
            .then(() => {
                setLoade(false);
                // savedata();
            })
    }


    // localStorage


    const setToLocalStoreage = (id, name, password, email) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("password", password);
        localStorage.setItem("email", email);


    }


    const generateUserRows = (userData) => {
        return Object.entries(userData).map(([key, value], i) => (
            <tr key={key}>
                <td>{i + 1}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.id}</td>
                <td>
                    <Link className='btn btn-primary text-light' to={`editeuser/${value.id}`} onClick={() =>
                        setToLocalStoreage(
                            value.id,
                            value.name,
                            value.email,
                            value.password

                        )}>
                        Edit</Link>
                </td>
                <td>
                    <Link className='btn btn-danger' onClick={() => hendelDelete(value.id)} to='#'>DELETE</Link>
                </td>
            </tr>
        ));
    };


    const savedata = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users")
                .then((response) => {

                    if (response.status === 200) {
                        setSearchData(response.data);
                        const allUserDataList = generateUserRows(response.data);
                        setAllUsers(allUserDataList);
                        setLoader(true);
                    } else {
                        console.log("Error while connecting to the server.");
                    }

                })
                .catch((error) => {
                    console.log(error);
                    if (error.response) {
                        console.log(error.response);
                        console.log("server responded");
                    } else if (error.request) {
                        console.log("network error");
                    } else {
                        console.log(error);
                    }
                });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <div className="col-6">
                            <p className='h1'>Add new user data</p>
                        </div>
                        <div className="col-6 text-end" >
                            <Link className='btn btn-primary' to="/signup">Add new user</Link>
                        </div>
                    </div>
                </div>


            </section>

            <section>
                <h2 className='text-center my-3'>All user data</h2>
                <table className='w-100 table'>
                    <thead>
                        <tr className='bg-primary text-light'>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Id</th>
                            <th colSpan={2}>scshan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loader ? allUsers : <tr><td colSpan={5}>no record fund</td></tr>}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllUserData;




