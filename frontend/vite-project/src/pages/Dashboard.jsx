import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const [stories, setStories] = useState([]);

  // Fetch stories from backend
  const fetchStories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/stories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(res.data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  // Delete a story by ID
  const deleteStory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(stories.filter((story) => story._id !== id));
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Helper to convert image buffer data to base64
  const bufferToBase64 = (buffer) => {
    if (!buffer || !buffer.data) return null;
    const bytes = new Uint8Array(buffer.data);
    let binary = "";
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  return (
    <div className="dashboard">
      <h2>Your Stories</h2>
      {stories.length === 0 && <p>No stories yet.</p>}
      <ul className="story-list">
        {stories.map((story) => {
          const base64Image = bufferToBase64(story.image);
          return (
            <li key={story._id} className="story-item">
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              {base64Image && (
                <img
                  src={`data:image/jpeg;base64,${base64Image}`}
                  alt={story.title}
                  className="story-image"
                />
              )}
              <button
                className="delete-btn"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this story?")
                  ) {
                    deleteStory(story._id);
                  }
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
