import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddEmployee() {
    const navigate = useNavigate();

const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    salary: '',
    date_of_joining: '',
    department: '',
    designation: '',
    status: 'active',
    username: '',
    password: '',
});

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [deptRes, desigRes] = await Promise.all([
                    API.get('/departments/'),
                    API.get('/designations/'),
                ]);
                setDepartments(deptRes.data);
                setDesignations(desigRes.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load departments/designations');
            }
        };

        fetchDropdowns();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (profilePhoto) {
            data.append('profile_photo', profilePhoto);
        }

        await API.post('/employees/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        alert('Employee added successfully!');
        navigate('/employees');
    } catch (err) {
        console.error('Add employee error:', err.response?.data || err.message);
        setError('Failed to add employee. Please check all fields.');
    }
};

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add New Employee</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Employee ID</label>
                            <input
                                type="text"
                                name="employee_id"
                                placeholder="Enter Employee ID"
                                className="form-control"
                                value={formData.employee_id}
                                onChange={handleChange}
                            />
                        </div>




                        <div className="mb-3">
                      <label className="form-label">Profile Photo</label>
                       <input
                          type="file"
                           name="profile_photo"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                         />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
    <label className="form-label">Username</label>
    <input
        type="text"
        name="username"
        className="form-control"
        value={formData.username}
        onChange={handleChange}
        required
    />
</div>

<div className="mb-3">
    <label className="form-label">Password</label>
    <input
        type="password"
        name="password"
        className="form-control"
        value={formData.password}
        onChange={handleChange}
        required
    />
</div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                className="form-control"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date of Joining</label>
                            <input
                                type="date"
                                name="date_of_joining"
                                className="form-control"
                                value={formData.date_of_joining}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select
                                name="department"
                                className="form-control"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Department --</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Designation</label>
                            <select
                                name="designation"
                                className="form-control"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Designation --</option>
                                {designations.map((des) => (
                                    <option key={des.id} value={des.id}>
                                        {des.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-success me-2">
                            Save Employee
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/employees')}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;