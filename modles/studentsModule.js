const Joi = require("joi")
const mongoose = require("mongoose")
    //schema
const studentsSchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 3, maxlength: 10 },
        isEnrolled: { type: Boolean, default: false },
        phone: { type: String, required: true, minlength: 8, maxlength: 15 }
    })
    //model
const Student = mongoose.model("Student", studentsSchema)
    //validator
function validateData(student) {
    const schema = {
        name: Joi.string().min(3).max(10).required(),
        phone: Joi.string().min(8).max(15).required(),
        isEnrolled: Joi.boolean()
    }


    return Joi.validate(student, schema)
}

exports.Student = Student;
exports.validateData = validateData;