import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCurrentSchool } from '../features/schoolSlice';
import '../styles/SchoolsCorner.css';

function SchoolsCorner() {
    const { isAuthenticated, userType } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const [schoolProfile, setSchoolProfile] = useState({
        name: '',
        address: '',
        vacancies: [],
    });
    const [vacancy, setVacancy] = useState({ subject: '', classLevel: '', salary: '' });

    if (!isAuthenticated || userType !== 'school') {
        return <div className="schools-corner">Please log in as a school to access this page.</div>;
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        dispatch(setCurrentSchool(schoolProfile));
    };

    const handleVacancySubmit = (e) => {
        e.preventDefault();
        setSchoolProfile({
            ...schoolProfile,
            vacancies: [...schoolProfile.vacancies, vacancy],
        });
        setVacancy({ subject: '', classLevel: '', salary: '' });
    };

    return (
        <div className="schools-corner">
            <h1>Schools Corner</h1>
            <h2>Create School Profile</h2>
            <form onSubmit={handleProfileSubmit} className="school-profile-form">
                <div className="form-group">
                    <label>School Name</label>
                    <input
                        type="text"
                        value={schoolProfile.name}
                        onChange={(e) => setSchoolProfile({ ...schoolProfile, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={schoolProfile.address}
                        onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="school-profile-button">
                    Save Profile
                </button>
            </form>

            <h2>Post a Vacancy</h2>
            <form onSubmit={handleVacancySubmit} className="vacancy-form">
                <div className="form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        value={vacancy.subject}
                        onChange={(e) => setVacancy({ ...vacancy, subject: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Class Level</label>
                    <input
                        type="text"
                        value={vacancy.classLevel}
                        onChange={(e) => setVacancy({ ...vacancy, classLevel: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input
                        type="text"
                        value={vacancy.salary}
                        onChange={(e) => setVacancy({ ...vacancy, salary: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="vacancy-button">
                    Post Vacancy
                </button>
            </form>

            {schoolProfile.vacancies.length > 0 && (
                <div className="vacancies-list">
                    <h2>Posted Vacancies</h2>
                    <ul>
                        {schoolProfile.vacancies.map((vac, index) => (
                            <li key={index} className="vacancy-item">
                                {vac.subject} - Class {vac.classLevel} - Salary: {vac.salary}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SchoolsCorner;