const Joi = require("joi")
const mongoose = require("mongoose")
    //schema
const categorySchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 3, maxlength: 10 }
    })
    //model
const Category = mongoose.model("Category", categorySchema)
    //validator
function validateData(category) {
    const schema = {
        name: Joi.string().min(3).max(10).required()
    }
    return Joi.validate(category, schema)
}

exports.Category = Category; //right side is model/function name  //left side name to use in importing file to import the file
exports.validateData = validateData;