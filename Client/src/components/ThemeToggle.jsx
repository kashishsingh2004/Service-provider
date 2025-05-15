import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import '../styles/ThemeToggle.css';

function ThemeToggle() {
    const { isDarkMode } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(toggleTheme())} className="theme-toggle">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}

export default ThemeToggle;