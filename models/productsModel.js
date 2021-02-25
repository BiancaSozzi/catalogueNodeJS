const mongoose = require("../bin/mongodbConnection");
const errorMessage = require("../utils/errorMessages");
const categoryModel = require("../models/categoriesModel");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.REQUIRED.requiredField],
        minlength: [1, errorMessage.VALIDATIONS.minlength] ,
        maxlength: [10, errorMessage.VALIDATIONS.maxlength]
    },
    sku: {
        type: String,
        unique: true
    },
    description: String,
    price: {
        type: Number,
        required: [true, errorMessage.REQUIRED.requiredField]
    },
    status: {
        type: String,
        enum:["active", "inactive"],
        default: "active"
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type:mongoose.Schema.ObjectId,
        required: [true, errorMessage.REQUIRED.requiredField],
        ref: "category",
        validate: {
            validator: function(v) {
                return categoryModel.findBydIdAndValidate(v)
            },
            message: errorMessage.VALIDATIONS.notFound
        }
    },
})
productSchema.virtual("price_currency").get(function(){
    return "$ " + this.price
})
productSchema.set("toJSON",{getters:true, virtuals:true})

productSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model("products", productSchema);
