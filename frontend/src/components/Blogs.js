import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:5000/api/blog`).catch(error => console.error(error))
        const data = await response.data;
        return data;
    }
    useEffect(() => {
        sendRequest().then(data => setBlogs(data.blogs))
        console.log(blogs)
    },[])

    return (
        <div>
            {
                blogs && blogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        description={blog.description}
                        imageURl={blog.image}
                        name={blog.user.name}
                    />
                ))
            }
        </div>
    );
};

export default Blogs;