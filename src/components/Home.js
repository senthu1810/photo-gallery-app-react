import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to photo-gallery-app</h1>
      <p>Manage your photos&videos efficiently using our mobile-focused React app.</p>
      <Link to="/registration" className="btn btn-primary">Register</Link>
      <Link to="/users" className="btn btn-outline-primary ms-2">View Users</Link>
    </div>
  );
}
export default Home;
