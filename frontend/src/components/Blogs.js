import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const sendRequest = async () => {
        const response = await axios.get(`https://mern-simple-blog-server.herokuapp.com/api/blog`).catch(error => console.error(error))
        const data = await response.data;
        return data;
    }
    useEffect(() => {
        sendRequest().then(data => setBlogs(data.blogs))
    },[])

    return (
        <div>
            {
                blogs && blogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        id={blog._id}
                        isUser={localStorage.getItem("userId") === blog.user._id}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        name={blog.user.name}
                    />
                ))
            }
        </div>
    );
};

export default Blogs;