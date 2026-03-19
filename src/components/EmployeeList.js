
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployees = async () => {
        try {
            const response = await api.get('/employees/');
            setEmployees(response.data);
            setFilteredEmployees(response.data);
        } catch (err) {
            console.error('Fetch error:', err.response?.data || err.message);
            if (err.response?.status === 401) {
                setError('Session expired. Please login again.');
                localStorage.clear();
                window.location.href = '/login';
            } else {
                setError('Failed to load employees');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        const filtered = employees.filter((emp) => {
            const text = searchTerm.toLowerCase();

            return (
                (emp.full_name || `${emp.first_name || ''} ${emp.last_name || ''}`).toLowerCase().includes(text) ||
                (emp.email || '').toLowerCase().includes(text) ||
                (emp.employee_id || '').toString().toLowerCase().includes(text) ||
                (emp.department_name || '').toLowerCase().includes(text)
            );
        });

        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (!confirmDelete) return;

        try {
            await api.delete(`/employees/${id}/`);
            alert('Employee deleted successfully');
            fetchEmployees();
        } catch (err) {
            console.error('Delete error:', err.response?.data || err.message);
            alert('Failed to delete employee');
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger m-5">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employee List</h2>
                <Link to="/add" className="btn btn-success">
                    + Add Employee
                </Link>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, employee ID, or department"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="alert alert-info">No employees found</div>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Salary</th>
                            <th>Joining Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.employee_id || emp.id}</td>
                                <td>
    {emp.profile_photo ? (
        <img
            src={
                emp.profile_photo.startsWith('http')
                    ? emp.profile_photo
                    : `http://127.0.0.1:8000${emp.profile_photo}`
            }
            alt={emp.full_name || emp.first_name}
            width="50"
            height="50"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
    ) : (
        'No Image'
    )}
</td>
                                <td>{emp.full_name || `${emp.first_name || ''} ${emp.last_name || ''}`}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department_name || '-'}</td>
                                <td>{emp.designation_title || '-'}</td>
                                <td>₹{emp.salary}</td>
                                <td>{emp.date_of_joining}</td>
                                <td>{emp.status}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Link to={`/edit/${emp.id}`} className="btn btn-sm btn-primary">
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(emp.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeList;