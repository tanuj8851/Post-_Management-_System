const express = require("express")
const app = express()
const cors = require("cors");
require('dotenv').config();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.middleware")
const { postRouter } = require("./routes/post.route");
const { userModel } = require("./models/user.model");

app.use(express.json())
app.use(cors())




app.use("/users", userRouter)
app.use(authenticate);
app.use("/posts", postRouter)


app.listen(process.env.port, async() => {
    try {
        await connection
        console.log(" DB Connected ");
    } catch (error) {
        console.log(" Connection Failed")
    }
    console.log(`app is running on port ${process.env.port}`)
})