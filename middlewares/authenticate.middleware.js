const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, "masai", (err, decoded) => {
            if (decoded) {
                req.body.user = decoded.userId
                next();
            } else {
                res.send({ "msg": "Login Please first" }).status(400)
            }
        })

    } else {
        res.send({ "msg": "Login Please first" }).status(400)
    }

}

module.exports = {
    authenticate
}