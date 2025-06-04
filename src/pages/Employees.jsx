import React from 'react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employee';
  import { getAllDepartments } from '../services/department';
  import EmployeeForm from '../Components/EmployeeForm'; // Corrected import path
  import { Link } from 'react-router-dom';

  const Employees = () => {
    const queryClient = useQueryClient();

    const { data: employees = {}, isLoading: employeesLoading, error: employeesError } = useQuery({
      queryKey: ['employees'],
      queryFn: getAllEmployees,
    });

    const { data: departments = {}, isLoading: departmentsLoading, error: departmentsError } = useQuery({
      queryKey: ['departments'],
      queryFn: getAllDepartments,
    });

    const createMutation = useMutation({
      mutationFn: createEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees']),
      onError: (error) => alert('Failed to create employee: ' + error.message),
    });

    const updateMutation = useMutation({
      mutationFn: ({ id, data }) => updateEmployee(id, data),
      onSuccess: () => queryClient.invalidateQueries(['employees']),
      onError: (error) => alert('Failed to update employee: ' + error.message),
    });

    const deleteMutation = useMutation({
      mutationFn: deleteEmployee,
      onSuccess: () => queryClient.invalidateQueries(['employees']),
      onError: (error) => alert('Failed to delete employee: ' + error.message),
    });

    const handleCreateOrUpdate = (data) => {
      const employeeData = {
        ...data,
        departmentId: data.departmentId ? parseInt(data.departmentId, 10) : null,
        salary: data.salary ? parseFloat(data.salary) : 0, // Default to 0 if invalid
      };
      if (isNaN(employeeData.salary)) {
        alert('Invalid salary value');
        return;
      }
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
    if (employeesError || departmentsError) return <p>Error loading data: {(employeesError || departmentsError)?.message}</p>;

    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Employees</h1>
        <EmployeeForm
          onSubmit={handleCreateOrUpdate}
          initialData={null} // Pass null or selected employee for editing
          departments={departments?.data || []}
        />
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
              {employees?.data?.length > 0 ? (
                employees.data.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border p-2">
                      <Link to={`/employee/${employee.id}`} className="text-blue-500 hover:underline">
                        {employee.firstName} {employee.lastName}
                      </Link>
                    </td>
                    <td className="border p-2">{employee.email}</td>
                    <td className="border p-2">${employee.salary || 0}</td>
                    <td className="border p-2">{employee.departmentName || 'None'}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleCreateOrUpdate({ ...employee, departmentId: employee.departmentId?.id })}
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border p-2 text-center">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default Employees;