const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUsers, addUser, updateUser, deleteUser, registerUser, loginUser, getUserInfo } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(addUser)
    .post(registerUser)
    .get(loginUser)

userRouter.route('/:id')
    .put(updateUser)
    .delete(deleteUser)
    .get( authMiddleware, getUserInfo)

module.exports = userRouter