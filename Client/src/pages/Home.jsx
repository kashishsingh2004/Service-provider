import '../styles/Home.css';

function Home() {
    return (
        <div className="home">
            <h1>Welcome to School-Teacher Platform</h1>
            <p>Connecting schools with talented teachers. Find the right teacher for your school or discover teaching opportunities.</p>
            <div className="home-buttons">
                <a href="/schools" className="home-button schools">
                    Schools Corner
                </a>
                <a href="/teachers" className="home-button teachers">
                    Teachers Corner
                </a>
            </div>
        </div>
    );
}

export default Home;