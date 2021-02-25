const productsModel = require("../models/productsModel");
const categoryModel = require("../models/categoriesModel");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getAll: async function(req, res, next) {
        try {
            // Get active products by default
            let filterParams = {status: "active"};
            if ('featured' in req.query){
                // If featured required add featured filter
                filterParams.featured = true
            }
            const products = await productsModel.paginate(filterParams, {
                sort: { name: 1},
                populate: "category",
                limit: req.query.limit || 4,
                page: req.query.page || 1
            });
            res.json(products);
        } catch(e) {
            next(e);
        }
    },
    getById: async function(req, res, next) {
        try {
            const product = await productsModel.findById(req.params.id).populate("category");
            res.json(product);
        } catch(e) {
            next(e);
        }
    },
    create: async function(req, res, next) {
        try {
            // Create product
            const product = new productsModel({
                name:req.body.name,
                sku:req.body.sku ? req.body.sku : uuidv4(),
                description:req.body.description,
                price:req.body.price,
                status: req.body.status,
                featured: req.body.featured,
                category: req.body.category
            })
            const prod = await product.save()
            res.status(201).json(prod);
        } catch(e) {
            next(e);
        }
    },
    update: async function(req, res, next) {
        try {
            let product = await productsModel.updateOne({ _id: req.params.id }, req.body, { multi: false })
            res.json(product)
        } catch (e) {
            next(e)
        }
    },
    delete: async function(req, res, next) {
        try {
            let product = await productsModel.deleteOne({ _id: req.params.id })
            res.json(product)
        } catch (e) {
            next(e)
        }
    }
}
