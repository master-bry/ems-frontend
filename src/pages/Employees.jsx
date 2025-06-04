import React from 'react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employee';
  import { getAllDepartments } from '../services/department';
  import EmployeeForm from '../Components/EmployeeForm';
  import { Link } from 'react-router-dom';

  const Employees = () => {
    const queryClient = useQueryClient();

    const { data: employees, isLoading: employeesLoading } = useQuery({
      queryKey: ['employees'],
      queryFn: getAllEmployees,
    });

    const { data: departments, isLoading: departmentsLoading } = useQuery({
      queryKey: ['departments'],
      queryFn: getAllDepartments,
    });

    const createMutation = useMutation({
      mutationFn: createEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees']),
    });

    const updateMutation = useMutation({
      mutationFn: ({ id, data }) => updateEmployee(id, data),
      onSuccess: () => queryClient.invalidateQueries(['employees']),
    });

    const deleteMutation = useMutation({
      mutationFn: deleteEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees']),
    });

    const handleCreateOrUpdate = (data) => {
      const employeeData = {
        ...data,
        departmentId: data.departmentId ? parseInt(data.departmentId) : null,
        salary: parseFloat(data.salary),
      };
      if (data.id) {
        updateMutation.mutate({ id: data.id, data: employeeData });
      } else {
        createMutation.mutate(employeeData);
      }
    };

    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this employee?')) {
        deleteMutation.mutate(id);
      }
    };

    if (employeesLoading || departmentsLoading) return <p>Loading...</p>;

    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Employees</h1>
        <EmployeeForm onSubmit={handleCreateOrUpdate} departments={departments?.data} />
        <div className="mt-4">
          <h2 className="text-xl mb-2">Employee List</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.data?.map((employee) => (
                <tr key={employee.id}>
                  <td className="border p-2">
                    <Link to={`/employee/${employee.id}`} className="text-blue-500 hover:underline">
                      {employee.firstName} {employee.lastName}
                    </Link>
                  </td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">${employee.salary}</td>
                  <td className="border p-2">{employee.departmentName || 'None'}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleCreateOrUpdate(employee)}
                      className="mr-2 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
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

  export default Employees;