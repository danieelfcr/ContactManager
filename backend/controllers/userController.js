const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    console.log(username, email, password)
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error('User already registered!');
    }

    //Hash passwd
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log(`User created ${user}`)
    if(user) {
        res.status(201).json({_id: user.id, email: user.email})
    }
    else {
        res.status(400);
        throw new Error('User data is not valid')
    }
})

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!')
    }
    const user = await User.findOne({email})
    //Compare passwd with hashedPassword
    if(user && (await bcrypt.compare(password, user.password))) {
        //Provide access token jwt
        const accessToken = jwt.sign(
            {
                //Payload
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1m"}
        );
        res.status(200).json({accessToken})
    }
    else {
        res.status(401)
        throw new Error('Email or password not valid')
    }
})

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: 'Current user information'})
})

module.exports = {registerUser, loginUser, currentUser}