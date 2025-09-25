import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">TaskUp</h1>
        <div className="links">
          <Link to="/" className="dash-link">Dashboard</Link>
          <Link to="/new" className="new-goal-link">New Goal</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
