import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const UserForm = ({ roles, onSubmit }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      role: roles && roles.length > 0 ? roles[0] : "User", // Postavljanje prve rola iz niza kao podrazumevanu, ako postoji
    }));
  }, [roles]);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateUser(user);

    if (Object.keys(errors).length === 0) {
      setValidationErrors({});
      // Simulacija 2-sekundnog kašnjenja za kreiranje/azuriranje korisnika
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSubmit(user);
      router.push("/users"); // Redirektuj na stranicu korisnika nakon podnošenja
    } else {
      setValidationErrors(errors);
    }
  };

  const validateUser = (user) => {
    const errors = {};

    if (
      !user.firstName ||
      user.firstName.length < 2 ||
      user.firstName.length > 20 ||
      !/^[A-Za-z]+$/.test(user.firstName)
    ) {
      errors.firstName = "Invalid first name";
    }

    if (
      !user.lastName ||
      user.lastName.length < 2 ||
      user.lastName.length > 20 ||
      !/^[A-Za-z]+$/.test(user.lastName)
    ) {
      errors.lastName = "Invalid last name";
    }

    if (!user.email || !isValidEmail(user.email)) {
      errors.email = "Invalid email address";
    }

    if (!user.role) {
      errors.role = "Role is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    //regex za validaciju email adrese
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={user.firstName}
        onChange={handleInputChange}
        error={!!validationErrors.firstName}
        helperText={validationErrors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={user.lastName}
        onChange={handleInputChange}
        error={!!validationErrors.lastName}
        helperText={validationErrors.lastName}
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        error={!!validationErrors.email}
        helperText={validationErrors.email}
      />
      <FormControl fullWidth>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={user.role}
          onChange={handleInputChange}
          error={!!validationErrors.role}
        >
          {roles &&
            roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Add User
      </Button>
    </form>
  );
};

export default UserForm;
