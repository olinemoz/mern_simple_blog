import React from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {useNavigate} from "react-router-dom"
import axios from "axios";

const BlogCard = ({id, title, description, image, name, isUser}) => {
    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    }
    const deleteRequest = async () => {
        const response = await axios.delete(`http://localhost:5000/api/blog/${id}`)
            .catch(error => console.log(error));
        const data = await response.data;
        return data;
    }
    const handleDelete = () => {
        deleteRequest().then(() => navigate('/')).then(() => navigate("/blogs"))
    }

    return (
        <Card sx={{
            width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": {
                boxShadow: "10px 10px 20px #ccc"
            }
        }}>
            {
                isUser && (
                    <Box display="flex">
                        <IconButton color="warning" onClick={handleEdit} sx={{marginLeft: "auto"}}>
                            <ModeEditOutlineIcon/>
                        </IconButton>
                        <IconButton color="error" onClick={handleDelete}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </Box>
                )
            }
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "blue"}} aria-label="recipe">
                        {name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={title}
                // subheader={new Date().toLocaleTimeString()}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
            />
            <CardContent>
                <hr/> <br/>
                <Typography variant="body2" color="text.secondary">
                    <b>{name}</b> {": "} {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BlogCard;