import React, {useState} from 'react';
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useStyles} from "./utils";

const labelStyle = {mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold"}

const AddBlog = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const [postBlog, setPostBlog] = useState({
        title: "",
        description: "",
        imageURL: ""
    })
    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setPostBlog({
            ...postBlog,
            [name]: value
        })
    }
    const userId = localStorage.getItem("userId")
    const sendRequest = async () => {
        const {title, description, imageURL} = postBlog;
        const response = await axios.post(`https://mern-simple-blog-server.herokuapp.com/api/blog/add`, {
            title,
            description,
            image: imageURL,
            user: userId
        }).catch(error => console.error(error));
        const data = await response.data;
        return data
    }
    const handleSubmit = event => {
        event.preventDefault();
        sendRequest().then(() => navigate("/myBlogs"));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    border={0.5}
                    borderColor="linear-gradient(90deg, rgba(19,19,143,1) 29%, rgba(17,38,154,1) 51%, rgba(15,65,169,1) 66%, rgba(18,52,178,1) 76%, rgba(25,22,200,1) 100%, rgba(0,212,255,1) 100%)"
                    borderRadius={3}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin={3}
                    display="flex"
                    flexDirection="column"
                    width="80%"
                    marginLeft="auto"
                    marginRight="auto"
                >
                    <Typography className={classes.font} fontWeight={"bold"} padding={2} color={"grey"} variant="h4" textAlign="center">
                        Post your Blog
                    </Typography>
                    <InputLabel className={classes.font} sx={labelStyle}>Title</InputLabel>
                    <TextField
                        margin="auto"
                        variant="outlined"
                        name="title"
                        value={postBlog.title}
                        type="text"
                        onChange={handleChange}
                    />
                    <InputLabel className={classes.font} sx={labelStyle}>Description</InputLabel>
                    <TextField
                        margin="auto"
                        variant="outlined"
                        name="description"
                        value={postBlog.description}
                        type="text"
                        onChange={handleChange}
                    />
                    <InputLabel className={classes.font} sx={labelStyle}>ImageURL</InputLabel>
                    <TextField
                        margin="auto"
                        variant="outlined"
                        name="imageURL"
                        value={postBlog.imageURL}
                        type="text"
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        sx={{borderRadius: 1, marginTop: 1}}
                        type="submit"
                    >
                        Post
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddBlog;