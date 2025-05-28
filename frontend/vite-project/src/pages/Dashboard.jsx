import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddJournal from './AddJournal';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.topRight}>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
        <button onClick={() => navigate('/mystories')} style={styles.button}>My Stories</button>
      </div>
      <AddJournal />
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundImage: `url('/your-background.jpg')`,
    backgroundSize: 'cover',
    position: 'relative',
  },
  topRight: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px',
    background: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }
};

export default Dashboard;
