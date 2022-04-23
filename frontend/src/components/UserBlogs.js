import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogCard from "./BlogCard";

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const userId = localStorage.getItem('userId');
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:5000/api/blog/user/${userId}`)
            .catch(error => console.log(error));
        const data = await response.data;
        return data;
    }
    useEffect(() => {
        sendRequest().then(data => setBlogs(data.blogs.blogs))
    }, [])

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

export default UserBlogs;