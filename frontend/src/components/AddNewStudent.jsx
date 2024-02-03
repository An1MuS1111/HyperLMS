import { useState } from 'react';
import axios from 'axios';

const AddNewStudent = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        matric: '',
        faculty: '',
        semester: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4444/exercises/add', userData)
            .then(res => console.log(res.data));

        // Optionally: Redirect or update state as needed
    }

    return (
        <div>
            <h3>Add New Student</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Matric: </label>
                    <input
                        type="text"
                        name="matric"
                        value={userData.matric}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Faculty: </label>
                    <input
                        type="text"
                        name="faculty"
                        value={userData.faculty}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Semester: </label>
                    <input
                        type="text"
                        name="semester"
                        value={userData.semester}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Add Student" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default AddNewStudent;
