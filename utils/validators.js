const userModel = require('../models/usersModel');
const errorMessage = require("../utils/errorMessages");
const jwt = require('jsonwebtoken');

module.exports = {
    validPassword: (value) => {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/.test(value);
    },
    validEmail: (value) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
    },
    validateUser: (req,res,next) => {
        jwt.verify(req.headers['x-access-token'], req.app.get("secretKey"), function(err,decoded) {
            if(err){
                res.status(403).json({message:err.message})
            } else {
                req.body.tokenData = decoded;
                next();
            }
        })
    }
}
