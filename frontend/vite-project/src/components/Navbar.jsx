import { Link } from 'react-router-dom';
const Navbar = () => (
  <nav>
    <Link to="/">Dashboard</Link>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
    <Link to="/add">Add Story</Link>
  </nav>
);
export default Navbar;
