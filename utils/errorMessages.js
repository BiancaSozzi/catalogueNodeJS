module.exports={
    REQUIRED: {
        requiredField: "{PATH} is required"
    },
    VALIDATIONS: {
        minlength: "{PATH} must contain at least {VALUE} characters",
        maxlength: "{PATH} must can't contain more than {VALUE} characters",
        emailInvalid: "Please enter a valid email address",
        passwordInvalid:"{PATH} must contain at least 1 number, 1 lowercase, 1 uppercase and have between 6 and 12 characters",
        notFound: "{PATH} does not exist in the DB"
    },
    LOGIN: {
        userNotFound: "Can't find a user for this email address",
        passwordError: "Incorrect Password",
        inactiveUser: "Inactive user cannot login"
    },
    ACCESS: {
        forbidden: "Only admin user can access this resource"
    }
}
