import React from 'react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/department';
  import DepartmentForm from '../components/DepartmentForm';

  const Departments = () => {
    const queryClient = useQueryClient();

    const { data: departments, isLoading } = useQuery({
      queryKey: ['departments'],
      queryFn: getAllDepartments,
    });

    const createMutation = useMutation({
      mutationFn: createDepartment,
      onSuccess: () => queryClient.invalidateQueries(['departments']),
    });

    const updateMutation = useMutation({
      mutationFn: ({ id, data }) => updateDepartment(id, data),
      onSuccess: () => queryClient.invalidateQueries(['departments']),
    });

    const deleteMutation = useMutation({
      mutationFn: deleteDepartment,
      onSuccess: () => queryClient.invalidateQueries(['departments']),
    });

    const handleCreateOrUpdate = (data) => {
      if (data.id) {
        updateMutation.mutate({ id: data.id, data });
      } else {
        createMutation.mutate(data);
      }
    };

    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this department?')) {
        deleteMutation.mutate(id);
      }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Departments</h1>
        <DepartmentForm onSubmit={handleCreateOrUpdate} />
        <div className="mt-4">
          <h2 className="text-xl mb-2">Department List</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments?.data?.map((department) => (
                <tr key={department.id}>
                  <td className="border p-2">{department.name}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleCreateOrUpdate(department)}
                      className="mr-2 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(department.id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default Departments;