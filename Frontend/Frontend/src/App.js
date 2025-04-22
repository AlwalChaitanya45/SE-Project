import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    favoriteColor: '',
    favoriteFood: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/profiles`);
      setProfiles(res.data);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/profiles/${editingId}`, {
          ...formData,
          likes: profiles.find(p => p.id === editingId)?.likes || 0
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/profiles`, formData);
      }
      setFormData({ name: '', favoriteColor: '', favoriteFood: '' });
      fetchProfiles();
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/api/profiles/${id}`);
    fetchProfiles();
  };

  const handleLike = async (id) => {
    await axios.patch(`${API_URL}/api/profiles/${id}/likes`);
    fetchProfiles();
  };

  const handleEdit = (profile) => {
    setFormData({
      name: profile.name,
      favoriteColor: profile.favoriteColor,
      favoriteFood: profile.favoriteFood
    });
    setEditingId(profile.id);
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#e0f7ff', minHeight: '100vh' }}>
      <h2 className="text-center mb-4" style={{ color: '#003366' }}>Student Profile Form</h2>

      <form onSubmit={handleSubmit} className="mx-auto mb-4" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Favorite Color"
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Favorite Food"
            name="favoriteFood"
            value={formData.favoriteFood}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {editingId ? 'Update Profile' : 'Save Profile'}
        </button>
      </form>

      {/* Profile Cards */}
      <div className="row justify-content-center mb-5">
        {profiles.map((profile) => (
          <div className="col-md-3 mb-4" key={profile.id}>
            <div className="card profile-card text-center shadow-sm p-3" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
              <h5 className="card-title" style={{ textDecoration: 'underline' }}>{profile.name}</h5>
              <p className="card-text" style={{ fontStyle: 'italic' }}>
                <strong>Color:</strong>{' '}
                <span style={{ color: profile.favoriteColor.toLowerCase() }}>
                  {profile.favoriteColor}
                </span>
              </p>
              <p className="card-text" style={{ fontStyle: 'italic' }}>
                <strong>Food:</strong> {profile.favoriteFood}
              </p>
              <p className="card-text fs-5">
                ❤️ <span>{profile.likes}</span>
              </p>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handleLike(profile.id)}>❤️</button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 text-center" style={{ color: '#003366' }}>Student Profiles Table</h3>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Favorite Color</th>
            <th>Favorite Food</th>
            <th>Likes ❤️</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={profile.id} className="hover-row" style={{ transition: 'transform 0.2s' }}>
              <td>{index + 1}</td>
              <td>{profile.name}</td>
              <td>{profile.favoriteColor}</td>
              <td>{profile.favoriteFood}</td>
              <td>{profile.likes}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  style={{ backgroundColor: '#e0f7ff', color: '#003366', border: '1px solid #003366' }}
                  onClick={() => handleEdit(profile)}
                >
                  ✏️ Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(profile.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CSS hover styling */}
      <style>
        {`
          .profile-card:hover {
            transform: scale(1.02);
          }
          .hover-row:hover {
            transform: scale(1.01);
          }
        `}
      </style>
    </div>
  );
}

export default App;
