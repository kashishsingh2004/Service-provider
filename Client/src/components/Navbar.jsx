import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/userAuthSlice';
import ThemeToggle from './ThemeToggle';
import api from '../utils/api';
import '../styles/Navbar.css';

function Navbar() {
    const { isAuthenticated, userType } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
            dispatch(logout());
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    School-Teacher Platform
                </Link>
                <div className="navbar-links">
                    <Link to="/schools" className="navbar-link">
                        Schools Corner
                    </Link>
                    <Link to="/teachers" className="navbar-link">
                        Teachers Corner
                    </Link>
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <>
                            <span className="navbar-user">
                                {userType === 'school' ? 'School' : 'Teacher'} Dashboard
                            </span>
                            <button onClick={handleLogout} className="navbar-button logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link">
                                Login
                            </Link>
                            <Link to="/register" className="navbar-link">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;