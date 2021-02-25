const categoryModel = require("../models/categoriesModel");
const usersModel = require("../models/usersModel");
const errorMessage = require("../utils/errorMessages");

const forbiddenJson = {
    error: true,
    message: errorMessage.ACCESS.forbidden
}

module.exports = {
    getAll: async function(req, res, next) {
        try {
            const categories = await categoryModel.find({});
            res.json(categories);
        } catch (e) {
            next(e);
        }
    },
    create: async function(req, res, next) {
        try {
            const isUserAdmin = await usersModel.isUserAdmin(req.body.tokenData.userId);
            if (!isUserAdmin) {
                res.status(403).json(forbiddenJson)
                return;
            }
            const category = await new categoryModel({ name: req.body.name })
            const savedCategory = await category.save()
            res.status(201).json(savedCategory)
        } catch (e) {
            next(e);
        }
    },
    update: async function(req, res, next) {
        try {
            const isUserAdmin = await usersModel.isUserAdmin(req.body.tokenData.userId);
            if (!isUserAdmin) {
                res.status(403).json(forbiddenJson)
                return;
            }
            let category = await categoryModel.updateOne(
                { _id: req.params.id },
                req.body,
                { multi: false }
            )
            res.status(200).json(category)
        } catch (e) {
            next(e)
        }
    },
    delete: async function(req, res, next) {
        try {
            const isUserAdmin = await usersModel.isUserAdmin(req.body.tokenData.userId);
            if (!isUserAdmin) {
                res.status(403).json(forbiddenJson)
                return;
            }
            let category = await categoryModel.deleteOne({ _id: req.params.id })
            res.json(category)
        } catch (e) {
            next(e)
        }
    }
}
