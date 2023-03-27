const express = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");





userRouter.post("/register", async(req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body;

    try {
        const userPresent = await userModel.find({ email });
        console.log(userPresent)
        if (userPresent) {
            res.send({ "msg": "User already exist, please login" }).status(400)
        } else {
            bcrypt.hash(password, 5, async(err, hash) => {
                if (err) {
                    res.send({ "msg": err })
                } else {
                    const user = new userModel({ name, email, gender, password: hash, age, city, is_married })
                    await user.save();
                    res.send({ "msg": "A new user has been registered" }).status(200)
                }
            })
        }




    } catch (error) {
        res.send({ "msg": error.message }).send(400)
    }
})


userRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.find({ email });
        if (user.length > 0) {

            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user[0]._id }, "masai");
                    res.send({ "msg": "Logged in", "token": token });
                } else {
                    res.send({ "msg": "Wrong Credentials" })
                }
            })

        }



    } catch (error) {
        res.send({ "msg": error.message }).send(400)
    }


})


module.exports = {
    userRouter
}