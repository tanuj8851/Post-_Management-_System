const mongoose = require("mongoose");


const connection = mongoose.connect(process.env.dblink)

module.exports = {
    connection
}