
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import LeaveList from './components/LeaveList';
import AddLeave from './components/AddLeave';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const token = localStorage.getItem('access_token');

    return (
        <Router>
            <div className="App">
                {token && <Navbar />}

                <Routes>
                    <Route
                        path="/"
                        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
                    />

                    <Route
                        path="/login"
                        element={token ? <Navigate to="/dashboard" replace /> : <Login />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/employees"
                        element={
                            <PrivateRoute>
                                <EmployeeList />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/add"
                        element={
                            <PrivateRoute>
                                <AddEmployee />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/edit/:id"
                        element={
                            <PrivateRoute>
                                <EditEmployee />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/leaves"
                        element={
                            <PrivateRoute>
                                <LeaveList />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/add-leave"
                        element={
                            <PrivateRoute>
                                <AddLeave />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;