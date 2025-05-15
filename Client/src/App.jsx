import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './app/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SchoolsCorner from './pages/SchoolsCorner';
import TeachersCorner from './pages/TeachersCorner';
import './styles/App.css';

function App() {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <Provider store={store}>
      <Router>
        <div className={`app ${isDarkMode ? 'dark' : ''}`}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/schools" element={<SchoolsCorner />} />
              <Route path="/teachers" element={<TeachersCorner />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;