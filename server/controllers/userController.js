const asyncMiddleware = require('../middlewares/asyncMiddleware')
const User = require('../models/user');

const addUser = asyncMiddleware(async (req, res) => {

    const user = await User.create(req.body)
    res.status(200).json(user)

})

const getUserInfo = asyncMiddleware(async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.status(200).json(user)
})

const getUsers = asyncMiddleware(async (req, res) => {

    const users = await User.find({});
    res.status(200).json(users)

} ) 

const updateUser = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
        throw new Error({ message: `Not found` })
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
}) 

const deleteUser = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error("User not found")
    }
    res.status(200).json({ message: "Success"});
}) 
module.exports =  {
   addUser, getUserInfo, getUsers, updateUser, deleteUser,
}