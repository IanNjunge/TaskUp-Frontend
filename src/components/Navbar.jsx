import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-section">
          <h1 className="logo">🎯 TaskUp</h1>
          <p className="tagline">Manage your goals easily</p>
        </div>

        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Dashboard 🏠</Link>
          <Link to="/new" className="nav-link">New Goal 📝</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
