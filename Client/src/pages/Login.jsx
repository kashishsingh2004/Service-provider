import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/userAuthSlice';
import api from '../utils/api'; // Use the api utility instead of raw axios
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('teacher');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check if the user is already authenticated on page load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const response = await api.get('/auth/me');
                const { user } = response.data;
                dispatch(login({ user, userType: user.userType }));
                navigate(user.userType === 'school' ? '/schools' : '/teachers');
            } catch (err) {
                // Not authenticated, stay on login page
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch, navigate]);

    // Form validation
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError('');
            const response = await api.post('/auth/login', { email, password, userType });
            const { user } = response.data;
            dispatch(login({ user, userType }));
            navigate(userType === 'school' ? '/schools' : '/teachers');
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Loading...</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    {formErrors.email && <p className="form-error">{formErrors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    {formErrors.password && <p className="form-error">{formErrors.password}</p>}
                </div>
                <div className="form-group">
                    <label>I am a:</label>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)} disabled={loading}>
                        <option value="teacher">Teacher</option>
                        <option value="school">School</option>
                    </select>
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;