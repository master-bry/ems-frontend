import React from 'react';
  import { useForm } from 'react-hook-form';

  const EmployeeForm = ({ onSubmit, initialData, departments }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: initialData || {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        salary: '',
        departmentId: '',
      },
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            {...register('phone', { required: 'Phone is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Salary</label>
          <input
            type="number"
            {...register('salary', { required: 'Salary is required', min: { value: 0, message: 'Salary cannot be negative' } })}
            className="w-full p-2 border rounded"
          />
          {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Department</label>
          <select
            {...register('departmentId')}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Department</option>
            {departments?.map((dept) => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    );
  };

  export default EmployeeForm;