import { Link } from "react-router-dom";

function Navbar () {
  return (
    <div className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/new-goal">New Goal</Link>
    </div>
  )
}

export default Navbar;