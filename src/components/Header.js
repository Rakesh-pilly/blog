import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggIn = useSelector((state) => state.isLoggedIn);
  const dispath = useDispatch()
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);",
        }}
      >
        <Toolbar>
          <Typography variant="h4">Blogs App</Typography>

          {isLoggIn && (
            <Box display={"flex"} marginX={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft="auto">
            {!isLoggIn && (
              <>
                <Button
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                  variant="contained"
                  LinkComponent={Link}
                  to="/auth"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                  variant="contained"
                  LinkComponent={Link}
                  to="/auth"
                >
                  Singup
                </Button>
              </>
            )}
            {isLoggIn && (
              <Button
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
                variant="contained"
                LinkComponent={Link}
                to="/auth"
                onClick = {()=> dispath(authActions.logout())}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
