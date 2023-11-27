import React, { useState, useEffect } from "react";
import { Link, Pagination, PaginationItem } from "@mui/material";
import DataTable from "../src/components/DataTable";
import Navigation from "../src/components/Navigation";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Fetch data only when the component mounts
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();

      // Sort users by creation date in descending order
      const sortedUsers = data.users.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setUsers(sortedUsers);
    };

    fetchData();
  }, []); // Fetch data only on mount

  // Calculate the index range for the current page
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  // Get the slice of users for the current page
  const pageUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Navigation />
      <h1>Users</h1>
      <Link href="/user-form">Add User</Link>
      <DataTable data={pageUsers} />

      {/* Pagination */}
      <Pagination
        count={Math.ceil(users.length / usersPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component="a"
            {...item}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(e, item.page);
            }}
          />
        )}
      />
    </div>
  );
};

export default UsersPage;
