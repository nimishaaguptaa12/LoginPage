import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="users-list">
      <h2>Registered Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <div className="user-cards">
          {users.map(user => (
            <div key={user._id} className="user-card">
              {user.profilePicture && (
                <img 
                  src={`http://localhost:5000/uploads/${user.profilePicture}`} 
                  alt={`${user.name}'s profile`}
                  className="user-image"
                />
              )}
              <div className="user-details">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age Category:</strong> {user.category}</p>
                <p><strong>Rating:</strong> {user.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;