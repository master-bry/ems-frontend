import React from 'react';
  import { useParams } from 'react-router-dom';
  import { useQuery } from '@tanstack/react-query';
  import { getEmployeeById } from '../services/employee';

  const EmployeeDetail = () => {
    const { id } = useParams();
    const { data: employee, isLoading } = useQuery({
      queryKey: ['employee', id],
      queryFn: () => getEmployeeById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (!employee?.data) return <p>Employee not found</p>;

    const emp = employee.data;

    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Employee Details</h1>
        <div className="p-4 bg-white rounded shadow">
          <p><strong>Name:</strong> {emp.firstName} {emp.lastName}</p>
          <p><strong>Email:</strong> {emp.email}</p>
          <p><strong>Phone:</strong> {emp.phone}</p>
          <p><strong>Salary:</strong> ${emp.salary}</p>
          <p><strong>Department:</strong> {emp.departmentName || 'None'}</p>
        </div>
      </div>
    );
  };

  export default EmployeeDetail;