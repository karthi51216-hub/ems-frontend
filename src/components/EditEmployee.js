import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        salary: '',
        date_of_joining: '',
        department: '',
        designation: ''
    });

    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);

    useEffect(() => {
        API.get(`/employees/${id}/`)
            .then((res) => setFormData(res.data))
            .catch((err) => console.error(err));

        API.get('/departments/').then((res) => setDepartments(res.data));
        API.get('/designations/').then((res) => setDesignations(res.data));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.put(`/employees/${id}/`, formData)
            .then(() => {
                alert('Employee Updated Successfully!');
                navigate('/employees');
            })
            .catch((err) => console.error('Update Error:', err.response?.data || err.message));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Edit Employee</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ''}
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date of Joining</label>
                            <input
                                type="date"
                                name="date_of_joining"
                                value={formData.date_of_joining || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select
                                name="department"
                                value={formData.department || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
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
                                value={formData.designation || ''}
                                className="form-control"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Designation</option>
                                {designations.map((des) => (
                                    <option key={des.id} value={des.id}>
                                        {des.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-success me-2">
                            Update
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

export default EditEmployee;

