import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogCard from "./BlogCard";

const UserBlogs = () => {
    const [user, setUser] = useState([]);
    const userId = localStorage.getItem('userId');
    const sendRequest = async () => {
        const response = await axios.get(`https://mern-simple-blog-server.herokuapp.com/api/blog/user/${userId}`)
            .catch(error => console.log(error));
        const data = await response.data;
        return data;
    }

    useEffect(() => {
        sendRequest().then(data => setUser(data.blogs))
    }, [])

    return (
        <div>
            {
                user && user.blogs && user.blogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        name={user.name}
                    />
                ))
            }
        </div>
    );
};

export default UserBlogs;