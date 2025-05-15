import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('teacher');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [experience, setExperience] = useState('');
    const [subjects, setSubjects] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name) errors.name = 'Name is required';
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
        if (userType === 'school') {
            if (!address) errors.address = 'Address is required';
        } else {
            if (!qualifications) errors.qualifications = 'Qualifications are required';
            if (!experience) errors.experience = 'Experience is required';
            if (!subjects) errors.subjects = 'Subjects are required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError('');
            const data = userType === 'school'
                ? { name, email, password, userType, address }
                : { name, email, password, userType, qualifications, experience, subjects };
            console.log('Sending registration data:', data); // Log the data being sent
            await api.post('/auth/register', data);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err); // Log the error
            setError(err.response?.data?.msg || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Loading...</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                    {formErrors.name && <p className="form-error">{formErrors.name}</p>}
                </div>
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
                {userType === 'school' ? (
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled={loading}
                        />
                        {formErrors.address && <p className="form-error">{formErrors.address}</p>}
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Qualifications</label>
                            <input
                                type="text"
                                value={qualifications}
                                onChange={(e) => setQualifications(e.target.value)}
                                required
                                disabled={loading}
                            />
                            {formErrors.qualifications && <p className="form-error">{formErrors.qualifications}</p>}
                        </div>
                        <div className="form-group">
                            <label>Experience (Years)</label>
                            <input
                                type="text"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                required
                                disabled={loading}
                            />
                            {formErrors.experience && <p className="form-error">{formErrors.experience}</p>}
                        </div>
                        <div className="form-group">
                            <label>Subjects You Teach</label>
                            <input
                                type="text"
                                value={subjects}
                                onChange={(e) => setSubjects(e.target.value)}
                                required
                                disabled={loading}
                            />
                            {formErrors.subjects && <p className="form-error">{formErrors.subjects}</p>}
                        </div>
                    </>
                )}
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default Register;