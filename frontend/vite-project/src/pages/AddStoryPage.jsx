import { useState } from 'react';
import axios from 'axios';

const AddStoryPage = () => {
  const [form, setForm] = useState({ title: '', description: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    if (form.image) {
      data.append('image', form.image);
    }

    const token = localStorage.getItem('token');

    // Build API URL from environment variable
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/stories`;

    console.log('Posting story to:', apiUrl); // Debug the URL

    try {
      await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Story added");
      // Optionally reset form here
      setForm({ title: '', description: '', image: null });
    } catch (error) {
      console.error('Error adding story:', error);
      alert('Failed to add story. See console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />
      <button type="submit">Add Story</button>
    </form>
  );
};

export default AddStoryPage;
