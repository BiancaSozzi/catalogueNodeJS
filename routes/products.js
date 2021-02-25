var express = require('express');
var router = express.Router();

var productsController = require("../controllers/productsController");

// GET all products
router.get('/', productsController.getAll);

// GET product by id
router.get('/:id', productsController.getById);

// Create a new product
router.post('/', (req,res,next)=>{req.app.validateUser(req,res,next)}, productsController.create);


// Update a product
router.put('/:id', (req,res,next)=>{req.app.validateUser(req,res,next)}, productsController.update);

// Delete a product
router.delete('/:id', (req,res,next)=>{req.app.validateUser(req,res,next)}, productsController.delete);

module.exports = router;
