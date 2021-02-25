const mongoose = require("../bin/mongodbConnection");
const errorMessage = require("../utils/errorMessages");

const categorySchema = new mongoose.Schema({
    name: String,
    status:{
        type: String,
        enum:["active", "inactive"],
        default: "active"
    },
});

categorySchema.statics.findBydIdAndValidate = async function(id) {
    const document = await this.findById(id);

    if(!document){
        return false
    }
    return true;
}
module.exports = mongoose.model("category", categorySchema);
