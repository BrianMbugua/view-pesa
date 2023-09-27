const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes');
const transactionRouter = require('./routes/transaction.routes');
const walletRouter = require('./routes/wallet.routes');

const db = require('./config/db');
const { getUsers, getUserInfo, addUser, updateUser, deleteUser, registerUser, loginUser } = require('./controllers/user.controller');
const errorMiddleware = require('./middlewares/errorMiddleware');
// const crypto = require('crypto');


dotenv.config()

const app = express();

//allows the application to receive json data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}
));
// console.log(crypto.randomUUID())


const PORT = process.env.PORT || 4000

db()

app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/wallets", walletRouter);

app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

