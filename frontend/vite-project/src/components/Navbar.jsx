import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      {isLoggedIn ? (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/add" style={styles.link}>Add Story</Link>
          <Link to="/mystory" style={styles.link}>My Story</Link>
          <button onClick={() => navigate(-1)} style={styles.button}>Back</button>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    borderRadius: '5px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  button: {
    background: 'white',
    color: '#007bff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Navbar;
