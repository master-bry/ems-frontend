import React from 'react';
  import { useForm } from 'react-hook-form';

  const DepartmentForm = ({ onSubmit, initialData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: initialData || { name: '' },
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Department Name</label>
          <input
            {...register('name', { required: 'Department name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    );
  };

  export default DepartmentForm;