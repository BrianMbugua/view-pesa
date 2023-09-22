const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUsers, addUser, updateUser, deleteUser, registerUser, loginUser,getUserInfo } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(addUser)

userRouter.route('/:id')
    .put(updateUser)
    .delete(deleteUser)
    .get( authMiddleware, getUserInfo)

userRouter.route('/loginUser')
    .post(loginUser)

userRouter.route('/registerUser')
    .post(registerUser)



module.exports = userRouter