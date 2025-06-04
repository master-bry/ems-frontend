import React from 'react';
  import { useQuery } from '@tanstack/react-query';
  import { getAllEmployees } from '../services/employee';
  import { getAllDepartments } from '../services/department';

  const Dashboard = () => {
    const { data: employees } = useQuery({
      queryKey: ['employees'],
      queryFn: getAllEmployees,
    });

    const { data: departments } = useQuery({
      queryKey: ['departments'],
      queryFn: getAllDepartments,
    });

    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl mb-2">Total Employees</h2>
            <p className="text-3xl">{employees?.data?.length || 0}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl mb-2">Total Departments</h2>
            <p className="text-3xl">{departments?.data?.length || 0}</p>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;