'use client'
import React, { useEffect, useState } from 'react';
import './admin.scss';
import * as XLSX from 'xlsx';

interface User {
  parentFirstName: string;
  parentLastName: string;
  kidFirstName: string;
  kidLastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://chess-club-backend.vercel.app/Club_users')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-container">
      <button className="export-button" onClick={exportToExcel}>Export to Excel</button>
      <table className="users-table">
        <thead>
          <tr>
            <th>Parent First Name</th>
            <th>Parent Last Name</th>
            <th>Kid First Name</th>
            <th>Kid Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.parentFirstName}</td>
              <td>{user.parentLastName}</td>
              <td>{user.kidFirstName}</td>
              <td>{user.kidLastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
