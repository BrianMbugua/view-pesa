const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(addUser)

userRouter.route('/:id')
    .put(updateUser)
    .delete(deleteUser)

module.exports = userRouter