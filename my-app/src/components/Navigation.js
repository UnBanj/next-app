// components/Navigation.js
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material"; // Dodajte Button iz MUI

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit">
          {" "}
          <Link href="/">Home</Link>
        </Button>
        <Button color="inherit">
          <Link href="/roles">Roles</Link>
        </Button>
        <Button color="inherit">
          <Link href="/users">Users</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
