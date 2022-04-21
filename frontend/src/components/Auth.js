import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false)
    return (
        <div>
            <form>
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
                            <TextField type="text" label="Name" placeholder="name" margin="normal"/>
                        )
                    }
                    <TextField type="email" label="Email" placeholder="abc@email.com" margin="normal"/>
                    <TextField type="password" label="Password" placeholder="password" margin="normal"/>
                    <Button variant="contained" sx={{borderRadius: 1, marginTop: 1}}>Submit</Button>
                    <Button onClick={() => setIsSignup(!isSignup)} sx={{borderRadius: 1}} color="warning">
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