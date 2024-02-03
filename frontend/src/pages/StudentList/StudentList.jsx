
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4444/users/')
            .then(response => {
                setUsers(response.data);
                console.log(response.data); // Log the updated state
            })
            .catch(error => console.log(error));
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4444/users/${id}`)
            .then(res => {
                console.log(res.data);
                setUsers(users.filter(user => user._id !== id)); // Filter users after updating state
            })
            .catch(error => console.log(error));
    }

    return (
        <><button><Link to="/addNewStudent">
            Add New Student
        </Link></button>
            <div>
                <h3>Student List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Matric Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.matric}</td>
                                <td>
                                    <Link to={`/editNewStudent/${user._id}`}>edit</Link> |{' '}
                                    <a href="#" onClick={() => deleteUser(user._id)}>delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></>
    );
}

export default StudentList;
