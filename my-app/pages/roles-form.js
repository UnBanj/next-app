import React from "react";
import { useRouter } from "next/router";
import RoleForm from "../src/components/RoleForm";
import Navigation from "../src/components/Navigation";

const RolesFormPage = () => {
  const router = useRouter();

  const handleCreateRole = (newRole) => {
    // Simulate saving the new role to the database or updating state
    console.log("Creating role:", newRole);

    // Get existing roles from localStorage
    const existingRolesString = localStorage.getItem("roles");
    const existingRoles = existingRolesString
      ? JSON.parse(existingRolesString)
      : [];

    // Check for duplicate role names
    const isDuplicate = existingRoles.some(
      (role) => role.roleName === newRole.roleName
    );

    if (isDuplicate) {
      alert("Role name must be unique");
      return;
    }

    // Add the new role to existing roles
    const updatedRoles = [...existingRoles, newRole];

    // Sort roles by roleName
    const sortedRoles = updatedRoles.sort((a, b) =>
      a.roleName.localeCompare(b.roleName)
    );

    // Update localStorage with sorted roles
    localStorage.setItem("roles", JSON.stringify(sortedRoles));

    // Redirect to the roles page
    router.push("/roles");
  };

  return (
    <div>
      <Navigation />
      <h1>Create Role</h1>
      <RoleForm onSubmit={handleCreateRole} />
    </div>
  );
};

export default RolesFormPage;
