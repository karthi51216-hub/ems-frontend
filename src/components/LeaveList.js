
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function LeaveList() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await API.get('/leaves/');
            setLeaves(res.data);
        } catch (err) {
            console.error('Leave fetch error:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const ok = window.confirm('Delete this leave request?');
        if (!ok) return;

        try {
            await API.delete(`/leaves/${id}/`);
            fetchLeaves();
        } catch (err) {
            console.error('Delete leave error:', err.response?.data || err.message);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Leave List</h2>
                <Link to="/add-leave" className="btn btn-success">+ Add Leave</Link>
            </div>

            {leaves.length === 0 ? (
                <div className="alert alert-info">No leave requests found</div>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Employee</th>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave.id}>
                                <td>{leave.employee_name}</td>
                                <td>{leave.leave_type}</td>
                                <td>{leave.from_date}</td>
                                <td>{leave.to_date}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(leave.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LeaveList;