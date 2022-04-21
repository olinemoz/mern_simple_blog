import React, {useState} from 'react';
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Header = () => {
    const [value, setValue] = useState(1);

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "linear-gradient(90deg, rgba(19,19,143,1) 29%, rgba(17,38,154,1) 51%, rgba(15,65,169,1) 66%, rgba(18,52,178,1) 76%, rgba(25,22,200,1) 100%, rgba(0,212,255,1) 100%)"
            }}
        >
            <Toolbar>
                <Typography variant="h6">BlogsApp</Typography>
                <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor="inherit" value={value} onChange={(event, value) => setValue(value)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                    </Tabs>
                </Box>
                <Box display="flex" marginLeft="auto">
                    <Button
                        LinkComponent={Link} to="/auth"
                        variant="outlined"
                        sx={{margin: 1, borderRadius: 10, color: "white"}}
                    >
                        Login
                    </Button>
                    <Button
                        LinkComponent={Link} to="/auth"
                        variant="outlined"
                        sx={{margin: 1, borderRadius: 10, color: "white"}}
                    >
                        Signup
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{margin: 1, borderRadius: 10, color: "white"}}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;