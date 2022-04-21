import React from 'react';
import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";

const BlogCard = ({title,description,imageURl,name}) => {
    return (
        <Card sx={{ width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": {
                boxShadow: "10px 10px 20px #ccc"
            }}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
                        {name}
                    </Avatar>
                }
                title={title}
                // subheader={new Date().toLocaleTimeString()}
            />
            <CardMedia
                component="img"
                height="194"
                image={imageURl}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BlogCard;