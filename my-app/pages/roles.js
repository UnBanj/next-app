import React, { useEffect, useState } from "react";
import RoleTable from "../src/components/RoleTable";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import Navigation from "../src/components/Navigation";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch roles from localStorage or use an empty array if not found
    const storedRoles = localStorage.getItem("roles");
    const parsedRoles = storedRoles ? JSON.parse(storedRoles) : [];

    // Sort roles by roleName
    const sortedRoles = parsedRoles.sort((a, b) =>
      a.roleName.localeCompare(b.roleName)
    );

    setRoles(sortedRoles);
  }, []);

  const handleCreateRole = (newRole) => {
    // Check for duplicate role names
    const isDuplicate = roles.some(
      (role) => role.roleName === newRole.roleName
    );

    if (isDuplicate) {
      setValidationError("Role name must be unique");
      return;
    } else {
      setValidationError("");
    }

    // Add the new role to the existing roles
    const updatedRoles = [...roles, newRole];

    // Sort roles by roleName
    const sortedRoles = updatedRoles.sort((a, b) =>
      a.roleName.localeCompare(b.roleName)
    );

    setRoles(sortedRoles);

    // Update localStorage
    localStorage.setItem("roles", JSON.stringify(sortedRoles));
  };

  const handleUpdateButtonClick = (roleId) => {
    // Redirect to the roles-update page with the role ID as a query parameter
    router.push(`/roles-update?id=${roleId}`);
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h1" gutterBottom>
        Roles
      </Typography>

      <Link href="/roles-form">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Create New Role
        </Button>
      </Link>

      {validationError && (
        <Typography variant="body2" color="error" gutterBottom>
          {validationError}
        </Typography>
      )}

      <RoleTable roles={roles} onUpdateClick={handleUpdateButtonClick} />
    </Container>
  );
};

export default RolesPage;
