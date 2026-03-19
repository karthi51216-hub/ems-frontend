import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">
                    🏢 EMS System
                </Link>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/dashboard">
                        📊 Dashboard
                    </Link>
                    <Link className="nav-link" to="/employees">
                        👥 Employees
                    </Link>
                    <Link className="nav-link" to="/add">
                        ➕ Add Employee
                    </Link>
                    <Link className="nav-link" to="/leaves">
                       📝 Leaves
                    </Link>
                    <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;