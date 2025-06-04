import React from 'react';
  import { useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { login } from '../services/auth';
  import { useAuth } from '../context/AuthContext';

  const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login: setUser } = useAuth();

    const onSubmit = async (data) => {
      try {
        const response = await login(data);
        // Example: Use response data if it contains a token or user info
        setUser({ username: data.username, ...response }); // Adjust based on response structure
        navigate('/dashboard');
      } catch (error) {
        alert('Login failed: ' + (error.response?.data?.message || error.message));
      }
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
      </div>
    );
  };

  export default Login;