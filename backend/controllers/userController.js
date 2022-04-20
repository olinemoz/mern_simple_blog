const bcrypt = require('bcryptjs')
const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (e) {
        console.log("Error in GetAllUsers: ", e);
    }
    if (!users) {
        return res.status(404).json({message: "No Users Found!"});
    }
    return res.status(200).json({users});
}

const signup = async (req, res, next) => {
    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (e) {
        console.log("Error in Signup: ", e)
    }

    if (existingUser) {
        return res.status(400).json({message: "User already exists!"})
    }
    const hashPassword = await bcrypt.hash(password, 12)
    const user = new User({
        name,
        email,
        password: hashPassword,
        blogs: []
    })
    try {
        await user.save();
    } catch (e) {
        console.log("Error in Signup: ", e)
    }
    return res.status(201).json({user})
}

const login = async (req, res) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (e) {
        console.log("Error in Login: ", e)
    }
    if (!existingUser) {
        return res.status(404).json({message: "User does not exist!"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect password!"})
    }
    return res.status(200).json({message: "Login Successful"})
}

module.exports = {
    getAllUsers,
    signup,
    login
}