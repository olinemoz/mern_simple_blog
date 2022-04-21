const Blog = require('../models/Blog')
const User = require('../models/User')
const mongoose = require("mongoose");

const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user')
    } catch (e) {
        console.log("Error in GetAllBlogs: ", e)
    }
    if (!blogs) {
        return res.status(404).json({message: "No Blogs Found"})
    }
    return res.status(200).json({blogs})
}

const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (e) {
        console.log("Error in addBlog: ", e)
    }
    if (!existingUser) {
        return res.status(404).json({message: "Unable to find user by id"})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        // await blog.save()
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        // await blog.save();
        // existingUser.blogs.push(blog);
        // await existingUser.save();
    } catch (e) {
        console.log("Error in addBlog: ", e)
        return res.status(500).json({message: e})
    }
    return res.status(200).json({blog})
}

const updateBlog = async (req, res, next) => {
    const {title, description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (e) {
        console.log("Error in updateBlog", e);
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to Update the Blog"})
    }
    return res.status(200).json({blog})
}

const getById = async (req, res, next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (e) {
        console.log("Error in getById Blog", e);
    }
    if (!blog) {
        return res.status(404).json({message: "No Blog Found!"})
    }
    return res.status(200).json({blog})
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (e) {
        console.log("Error in delete Blog", e);
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to delete blog!"})
    }
    return res.status(200).json({message: "Blog deleted successfully!"})
}

const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs')
    }catch (e) {
        console.log("Error in getByUserId",e)
    }
    if(!userBlogs){
        return res.status(404).json({message: "No Blogs Found!"});
    }
    return res.status(200).json({blogs: userBlogs});
}

module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog,
    getById,
    deleteBlog,
    getByUserId
}