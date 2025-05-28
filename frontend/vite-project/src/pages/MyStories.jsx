import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyStories = () => {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/journals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJournals(res.data);
      } catch (err) {
        console.error('Failed to fetch journals:', err);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.topRight}>
        <button onClick={() => navigate('/dashboard')} style={styles.button}>Back</button>
      </div>
      <h2 style={styles.title}>My Stories</h2>
      {journals.length === 0 ? (
        <p style={styles.text}>No journals found.</p>
      ) : (
        journals.map((story) => (
          <div key={story._id} style={styles.card}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            {story.imageUrl && (
              <img
                src={`http://localhost:5000${story.imageUrl}`}
                alt="Story"
                style={styles.image}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    background: 'linear-gradient(to right, #f0f0f0, #dcdcdc)',
    minHeight: '100vh',
  },
  topRight: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  button: {
    padding: '10px',
    background: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    marginBottom: '20px',
  },
  text: {
    fontStyle: 'italic',
  },
  card: {
    background: 'white',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    marginTop: '10px',
  },
};

export default MyStories;
