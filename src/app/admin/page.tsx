'use client'
import React, { useEffect, useState } from 'react';
import './admin.scss';
import * as XLSX from 'xlsx';

interface User {
  parentName: string;
  kidName: string;
  schoolName: string;
  email: string;
  phone: string;
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
        // Use only the necessary fields from the fetched data
        const modifiedData = data.map((user: any) => ({
          parentName: user.parentName,
          kidName: user.kidName,
          schoolName: user.schoolName,
          email: user.email,
          phone: user.phone,
        }));
        setUsers(modifiedData);
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
            <th>Parent Name</th>
            <th>Kid Name</th>
            <th>School Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.parentName}</td>
              <td>{user.kidName}</td>
              <td>{user.schoolName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
