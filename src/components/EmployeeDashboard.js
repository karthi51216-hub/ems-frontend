
import React, { useEffect, useState } from 'react';
import API from '../services/api';

function EmployeeDashboard() {
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/employees/me/');
                setEmployee(res.data);
            } catch (err) {
                console.error(err.response?.data || err.message);
                setError('Failed to load employee profile');
            }
        };

        fetchProfile();
    }, []);

    if (error) return <div className="alert alert-danger m-4">{error}</div>;
    if (!employee) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Employee Dashboard</h2>

            <div className="card p-4 shadow-sm">
                <div className="row">
                    <div className="col-md-3 text-center">
                        {employee.profile_photo ? (
                            <img
                                src={
                                    employee.profile_photo.startsWith('http')
                                        ? employee.profile_photo
                                        : `http://127.0.0.1:8000${employee.profile_photo}`
                                }
                                alt={employee.full_name}
                                width="120"
                                height="120"
                                style={{ objectFit: 'cover', borderRadius: '50%' }}
                            />
                        ) : (
                            <div>No Image</div>
                        )}
                    </div>

                    <div className="col-md-9">
                        <h4>{employee.full_name}</h4>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Phone:</strong> {employee.phone}</p>
                        <p><strong>Department:</strong> {employee.department_name}</p>
                        <p><strong>Designation:</strong> {employee.designation_title}</p>
                        <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
                        <p><strong>Status:</strong> {employee.status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;