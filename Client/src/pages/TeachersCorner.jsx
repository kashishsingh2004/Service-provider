import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCurrentTeacher } from '../features/teacherSlice';
import '../styles/TeachersCorner.css';

function TeachersCorner() {
    const { isAuthenticated, userType } = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();
    const [teacherProfile, setTeacherProfile] = useState({
        name: '',
        qualifications: '',
        experience: '',
        subjects: '',
    });

    const vacancies = [
        { id: 1, school: 'ABC School', subject: 'Math', classLevel: '10th', salary: '₹30,000' },
        { id: 2, school: 'XYZ School', subject: 'Science', classLevel: '8th', salary: '₹25,000' },
    ];

    if (!isAuthenticated || userType !== 'teacher') {
        return <div className="teachers-corner">Please log in as a teacher to access this page.</div>;
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        dispatch(setCurrentTeacher(teacherProfile));
    };

    const handleApply = (vacancyId) => {
        alert(`Applied to vacancy ${vacancyId}`);
    };

    return (
        <div className="teachers-corner">
            <h1>Teachers Corner</h1>
            <h2>Create Teacher Profile</h2>
            <form onSubmit={handleProfileSubmit} className="teacher-profile-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={teacherProfile.name}
                        onChange={(e) => setTeacherProfile({ ...teacherProfile, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Qualifications</label>
                    <input
                        type="text"
                        value={teacherProfile.qualifications}
                        onChange={(e) => setTeacherProfile({ ...teacherProfile, qualifications: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Experience (Years)</label>
                    <input
                        type="text"
                        value={teacherProfile.experience}
                        onChange={(e) => setTeacherProfile({ ...teacherProfile, experience: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subjects You Teach</label>
                    <input
                        type="text"
                        value={teacherProfile.subjects}
                        onChange={(e) => setTeacherProfile({ ...teacherProfile, subjects: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="teacher-profile-button">
                    Save Profile
                </button>
            </form>

            <h2>Available Vacancies</h2>
            <ul className="vacancies-list">
                {vacancies.map((vacancy) => (
                    <li key={vacancy.id} className="vacancy-item">
                        <div>
                            {vacancy.school} - {vacancy.subject} - Class {vacancy.classLevel} - Salary: {vacancy.salary}
                        </div>
                        <button onClick={() => handleApply(vacancy.id)} className="apply-button">
                            Apply
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeachersCorner;