import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { adminRegister } from '../services/auth';

const AdminRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Convert comma-separated roles to array
      const userData = {
        ...data,
        roles: data.roles ? data.roles.split(',').map(role => role.trim()) : []
      };
      await adminRegister(userData);
      alert('User registered successfully');
      navigate('/dashboard');
    } catch (error) {
      alert('Admin registration failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Admin Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            {...register('username', { required: 'Username is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Roles (comma-separated, e.g., ADMIN,EMPLOYEE)</label>
          <input
            {...register('roles', { required: 'Roles are required' })}
            className="w-full p-2 border rounded"
          />
          {errors.roles && <p className="text-red-500">{errors.roles.message}</p>}
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Employee ID</label>
          <input
            type="number"
            {...register('employeeId')}
            className="w-full p-2 border rounded"
          />
        </div> */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register User</button>
      </form>
    </div>
  );
};

export default AdminRegister;