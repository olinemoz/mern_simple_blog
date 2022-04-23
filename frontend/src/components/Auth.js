import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {login} from "../features/auth/authSlice";

const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
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

    const sendRequest = async (type) => {
        const response = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name: user.name,
            email: user.email,
            password: user.password
        }).catch((error) => console.log(error))
        const data = await response.data;
        return data;
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (isSignup) {
            sendRequest("signup")
                .then(data => localStorage.setItem("userId",data.user._id))
                .then(() => dispatch(login()))
                .then(() => navigate('/blogs'))
        } else {
            sendRequest("login")
                .then(data => localStorage.setItem("userId",data.user._id))
                .then(() => dispatch(login()))
                .then(() => navigate('/blogs'))
        }
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