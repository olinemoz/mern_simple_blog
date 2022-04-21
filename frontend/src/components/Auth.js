import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

const Auth = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isSignup, setIsSignup] = useState(false)

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit = event => {
        event.preventDefault();
        console.log("New User: ",user);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={400}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    mt={5}
                    borderRadius={2}
                >
                    <Typography variant="h5" padding={3} textAlign="center">
                        {
                            isSignup ? "Signup" : "Login"
                        }
                    </Typography>
                    {
                        isSignup && (
                            <TextField
                                type="text"
                                value={user.name}
                                onChange={handleChange}
                                name="name"
                                label="Name"
                                placeholder="name"
                                margin="normal"
                            />
                        )
                    }
                    <TextField
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                        label="Email"
                        placeholder="abc@email.com"
                        margin="normal"
                    />
                    <TextField
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        placeholder="password"
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        sx={{borderRadius: 1, marginTop: 1}}
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => setIsSignup(!isSignup)}
                        sx={{borderRadius: 1}}
                        color="warning"
                    >
                        {
                            isSignup ? "Change to Login" : "Change to Signup"
                        }
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Auth;