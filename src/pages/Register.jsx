import React from 'react';
  import { useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { register } from '../services/auth';

  const Register = () => {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      try {
        await register(data);
        navigate('/login');
      } catch (error) {
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      }
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              {...formRegister('username', { required: 'Username is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...formRegister('password', { required: 'Password is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Roles (comma-separated, e.g., ADMIN,EMPLOYEE)</label>
            <input
              {...formRegister('roles', { required: 'Roles are required' })}
              className="w-full p-2 border rounded"
            />
            {errors.roles && <p className="text-red-500">{errors.roles.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
        </form>
      </div>
    );
  };

  export default Register;