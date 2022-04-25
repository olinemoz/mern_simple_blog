import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";

const labelStyle = {mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold"}
const BlogDetail = () => {
    const [blog, setBlog] = useState({})
    const [updateBlog, setUpdateBlog] = useState({})
    const navigate = useNavigate()
    const {id} = useParams();
    const fetchDetails = async () => {
        const response = await axios.get(`https://mern-simple-blog-server.herokuapp.com/api/blog/${id}`)
            .catch(error => console.error(error))
        const data = await response.data;
        return data;
    }
    const updateDetails = async () => {
        const response = await axios.put(`https://mern-simple-blog-server.herokuapp.com/api/blog/update/${id}`,{
            title: updateBlog.title,
            description: updateBlog.description,
            image: updateBlog.image
        })
            .catch(error => console.error(error))
        const data = await response.data;
        return data;
    }

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setUpdateBlog({
            ...updateBlog,
            [name]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        updateDetails().then(() => navigate("/myBlogs"));
    }

    useEffect(() => {
        fetchDetails().then(data => {
            setBlog(data.blog)
            setUpdateBlog({
                ...updateBlog,
                title: data.blog.title,
                description: data.blog.description,
                image: data.blog.image
            })
        })
    }, [id])
    return (
        <div>
            {
                updateBlog && (
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
                            <Typography fontWeight={"bold"} padding={2} color={"grey"} variant="h4" textAlign="center">
                                Post your Blog
                            </Typography>
                            <InputLabel sx={labelStyle}>Title</InputLabel>
                            <TextField
                                margin="auto"
                                variant="outlined"
                                name="title"
                                value={updateBlog.title}
                                type="text"
                                onChange={handleChange}
                            />
                            <InputLabel sx={labelStyle}>Description</InputLabel>
                            <TextField
                                margin="auto"
                                variant="outlined"
                                name="description"
                                value={updateBlog.description}
                                type="text"
                                onChange={handleChange}
                            />
                            <InputLabel sx={labelStyle}>ImageURL</InputLabel>
                            <TextField
                                margin="auto"
                                variant="outlined"
                                name="image"
                                value={updateBlog.image}
                                type="text"
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                sx={{borderRadius: 1, marginTop: 1}}
                                type="submit"
                            >
                                Update Post
                            </Button>
                        </Box>
                    </form>
                )
            }
        </div>
    );
};

export default BlogDetail;