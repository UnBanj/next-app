import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Navigation from "../src/components/Navigation";

const RolesUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [roleDetails, setRoleDetails] = useState({
    id: "",
    roleName: "",
    shortDescription: "",
  });

  useEffect(() => {
    const fetchRoleDetails = () => {
      // Fetch role details based on the ID from localStorage
      const roles = JSON.parse(localStorage.getItem("roles")) || [];
      const roleDetailsData =
        roles.find((role) => role.id === Number(id)) || {};

      // Set roleDetails state with fetched details
      setRoleDetails(roleDetailsData);
    };

    // Call the fetchRoleDetails function
    fetchRoleDetails();
  }, [id]);

  const handleInputChange = (e) => {
    // Update the corresponding field in roleDetails state
    setRoleDetails({
      ...roleDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    console.log("Saving role details:", roleDetails);
    // Update role details in localStorage
    const roles = JSON.parse(localStorage.getItem("roles")) || [];
    const updatedRoles = roles.map((role) =>
      role.id === Number(id) ? { ...role, ...roleDetails } : role
    );
    localStorage.setItem("roles", JSON.stringify(updatedRoles));

    // Redirect back to the roles page after saving
    router.push("/roles");
  };

  return (
    <div>
      <Navigation />
      <h1>Update Role</h1>
      <TextField
        label="Role Name"
        name="roleName"
        value={roleDetails.roleName}
        onChange={handleInputChange}
      />
      <TextField
        label="Short Description"
        name="shortDescription"
        value={roleDetails.shortDescription}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export default RolesUpdatePage;
