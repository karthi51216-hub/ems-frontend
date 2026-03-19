import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalDepartments, setTotalDepartments] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, deptRes] = await Promise.all([
                    API.get('/employees/'),
                    API.get('/departments/'),
                ]);

                const employees = empRes.data;
                const departments = deptRes.data;

                setTotalEmployees(employees.length);
                setTotalDepartments(departments.length);

                const salary = employees.reduce(
                    (sum, emp) => sum + parseFloat(emp.salary || 0),
                    0
                );
                setTotalSalary(salary);
            } catch (err) {
                console.error('Dashboard error:', err.response?.data || err.message);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger m-5">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Dashboard</h2>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-primary">
                        <div className="card-body text-center">
                            <h5>Total Employees</h5>
                            <h1>{totalEmployees}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-success">
                        <div className="card-body text-center">
                            <h5>Total Departments</h5>
                            <h1>{totalDepartments}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-info">
                        <div className="card-body text-center">
                            <h5>Total Salary</h5>
                            <h1>₹{totalSalary.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 mb-3">
                    <Link to="/employees" className="btn btn-outline-primary btn-lg w-100">
                        View All Employees
                    </Link>
                </div>
                <div className="col-md-6 mb-3">
                    <Link to="/add" className="btn btn-outline-success btn-lg w-100">
                        Add New Employee
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;