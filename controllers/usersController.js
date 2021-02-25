const usersModel = require("../models/usersModel");
const errorMessage = require("../utils/errorMessages");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async function(req, res, next) {
        try {
            const user = await usersModel.findOne({ email: req.body.email })
            if(!user){
                res.status(404).json({
                    error: true,
                    message: errorMessage.LOGIN.userNotFound
                });
                return;
            }
            if(bcrypt.compareSync(req.body.password, user.password)) {
                if (user.status == "active") {
                    const token = jwt.sign(
                        {userId: user._id},
                        req.app.get("secretKey"),{expiresIn:"1h"}
                    )
                    res.status(200).json({
                        error: false,
                        message: "Login ok",
                        token: token
                    })
                    return;
                } else {
                    res.status(403).json({
                        error: true,
                        message: errorMessage.LOGIN.inactiveUser
                    })
                }

            } else {
                res.status(404).json({
                    error: true,
                    message: errorMessage.LOGIN.passwordError
                })
                return;
            }
        } catch(e) {
            next(e);
        }
    },
    register: async function(req, res, next) {
        try {
            // Admin user should be by default active
            var status = req.body.status;
            if (req.body.userType == "admin") {
                status = "active";
            }
            // Create user
            const user = new usersModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
                status: status
            })
            const newUser = await user.save()
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    }
}
