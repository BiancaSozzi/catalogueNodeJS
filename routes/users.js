var express = require('express');
var router = express.Router();

var usersController = require("../controllers/usersController");

/* LOGIN */
router.post('/login', usersController.login);

/* REGISTER */
router.post('/register', usersController.register);

module.exports = router;
