import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const RoleForm = ({ onSubmit }) => {
  const [roleName, setRoleName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [validationErrorRoleName, setValidationErrorRoleName] = useState("");
  const [validationErrorShortDesc, setValidationErrorShortDesc] = useState("");

  const handleCreateRole = () => {
    // Validation for Role Name
    if (!/^[a-zA-Z0-9_]{2,16}$/.test(roleName)) {
      setValidationErrorRoleName(
        "Role name is required and must be alphanumeric, max 16 characters"
      );
      return;
    } else {
      setValidationErrorRoleName("");
    }

    // Validation for Short Description
    if (
      shortDescription &&
      (shortDescription.length < 2 || shortDescription.length > 50)
    ) {
      setValidationErrorShortDesc(
        "Short Description must be between 2 and 50 characters"
      );
      return;
    } else {
      setValidationErrorShortDesc("");
    }

    const newRole = {
      id: new Date().getTime(),
      roleName: roleName,
      shortDescription: shortDescription,
    };

    // Pass the new role to the onSubmit handler
    onSubmit(newRole);

    // Clear form fields
    setRoleName("");
    setShortDescription("");
  };

  return (
    <div>
      <TextField
        label="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        error={!!validationErrorRoleName}
        helperText={validationErrorRoleName}
      />
      <TextField
        label="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        error={!!validationErrorShortDesc}
        helperText={validationErrorShortDesc}
      />
      <Button variant="contained" onClick={handleCreateRole}>
        Create Role
      </Button>
    </div>
  );
};

export default RoleForm;
