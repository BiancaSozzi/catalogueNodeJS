var express = require('express');
var router = express.Router();

var categoriesController = require("../controllers/categoriesController");

// GET all categories
router.get('/', categoriesController.getAll);

// POST Create new category
router.post('/', (req,res,next)=>{req.app.validateUser(req,res,next)}, categoriesController.create);

// PUT Update a category
router.put('/:id', (req,res,next)=>{req.app.validateUser(req,res,next)}, categoriesController.update);

// DELETE  a category
router.delete('/:id', (req,res,next)=>{req.app.validateUser(req,res,next)}, categoriesController.delete);

module.exports = router;
