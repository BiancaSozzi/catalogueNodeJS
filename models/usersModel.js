const mongoose = require("../bin/mongodbConnection");
const errorMessage = require("../utils/errorMessages");
const validators = require("../utils/validators");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, errorMessage.REQUIRED.requiredField]
    },
    email: {
        type: String,
        unique: true,
        required: [true, errorMessage.REQUIRED.requiredField],
        validate: {
            validator: function(v) {
                return validators.validEmail(v)
            },
            message: errorMessage.VALIDATIONS.emailInvalid
        }
    },
    password: {
        type: String,
        required: [true, errorMessage.REQUIRED.requiredField],
        validate: {
            validator: function(v) {
                return validators.validPassword(v)
            },
            message: errorMessage.VALIDATIONS.passwordInvalid
        }
    },
    userType: {
        type: String,
        enum: ["admin", "web"],
        default: "web"
    },
    status: {
        type: String,
        enum:["active", "inactive"],
        default: "active"
    }
})

userSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

userSchema.statics.isUserAdmin = async function(id) {
    const user = await this.findById(id);

    if (!user) {
        return false;
    }

    return user.userType == "admin";
}

module.exports = mongoose.model("user", userSchema)
