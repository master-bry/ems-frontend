import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSuperAdmin = user && user?.roles?.includes('SUPER_ADMIN');

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">EMS</Link>
        <div>
          {user ? (
            <>
              <Link to="/dashboard" className="mx-2">Dashboard</Link>
              <Link to="/employees" className="mx-2">Employees</Link>
              <Link to="/departments" className="mx-2">Departments</Link>
              {isSuperAdmin && <Link to="/admin-register" className="mx-2">Admin Register</Link>}
              <button onClick={handleLogout} className="mx-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">Login</Link>
              <Link to="/register" className="mx-2">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;