import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function AddLeave() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employee: '',
        leave_type: 'casual',
        from_date: '',
        to_date: '',
        reason: '',
        status: 'pending',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await API.get('/employees/');
                setEmployees(res.data);
            } catch (err) {
                console.error('Employee fetch error:', err.response?.data || err.message);
                setError('Failed to load employees');
            }
        };

        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await API.post('/leaves/', formData);
            alert('Leave added successfully');
            navigate('/leaves');
        } catch (err) {
            console.error('Add leave error:', err.response?.data || err.message);
            setError('Failed to add leave');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add Leave</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <select
                        name="employee"
                        className="form-control"
                        value={formData.employee}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Employee --</option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.full_name || `${emp.first_name || ''} ${emp.last_name || ''}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Leave Type</label>
                    <select
                        name="leave_type"
                        className="form-control"
                        value={formData.leave_type}
                        onChange={handleChange}
                    >
                        <option value="sick">Sick Leave</option>
                        <option value="casual">Casual Leave</option>
                        <option value="earned">Earned Leave</option>
                        <option value="lop">Loss of Pay</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">From Date</label>
                    <input
                        type="date"
                        name="from_date"
                        className="form-control"
                        value={formData.from_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">To Date</label>
                    <input
                        type="date"
                        name="to_date"
                        className="form-control"
                        value={formData.to_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                        name="reason"
                        className="form-control"
                        rows="3"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-control"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary me-2">Save Leave</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/leaves')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AddLeave;