import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserForm from "../src/components/UserForm";

const UserFormPage = () => {
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setRoles(data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddUser = (newUser) => {
    // Simulate saving the new user to the database or updating state
    console.log("Creating user:", newUser);

    // Store the new user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Redirect to the users page
    router.push("/users");
  };

  return (
    <div>
      <h1>Add User</h1>
      <UserForm roles={roles} onSubmit={handleAddUser} />
    </div>
  );
};

export default UserFormPage;
