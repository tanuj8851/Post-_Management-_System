const express = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const postRouter = express.Router();
const { postModel } = require("../models/post.model");
const bcrypt = require("bcrypt");


postRouter.get("/", async(req, res) => {

    const limit = 3
    const page = req.query.page || 1;
    const post = await postModel.find().limit(3).skip((page - 1) * limit)
    res.send(post).status(200)
})


postRouter.post("/add", async(req, res) => {
    const payload = req.body;

    try {

        const post = new postModel(payload);
        await post.save();
        res.send({ "msg": "Note created Successfully" }).status(200);
    } catch (error) {
        res.send({ "msg": error.message })
    }
})


postRouter.delete("/delete/:id", async(req, res) => {
    const postId = req.params.id;
    await postModel.findByIdAndDelete({ _id: postId });
    res.send({ "msg": `Post Deleted successfully of postId ${postId}` }).status(200);
})

postRouter.patch("/update/:id", async(req, res) => {
    const postId = req.params.id;
    const payload = req.body;

    try {
        const post = await postModel.updateOne({ _id: postId }, { $set: payload });
        res.send({ "msg": `Post updated of id ${postId}` }).status(200)
    } catch (error) {
        res.send({ "msg": error.message }).status(400);
    }

})



module.exports = {
    postRouter
}