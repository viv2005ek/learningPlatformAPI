const express = require("express")
const router = express.Router()

const { Student, validateData } = require("../modles/studentsModule") //Category and validData imported from module folder

router.get('/', async(req, res) => {
    const students = await Student.find()
    res.send(students)
})


router.get('/:id', async(req, res) => {
    const student = await Student.findById(req.params.id)
    if (!student) res.status(404).send("no student by this id")
    res.send(student)
})

router.post('/', async(req, res) => {
    const { error } = validateData(req.body)
    if (error) { res.status(400).send(error.details[0].message) } else {
        const student = new Student({ //requesting data like mongo by making object of model class
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            phone: req.body.phone
        })
        await student.save();
        res.send(student);
    }
})

router.put('/:id', async(req, res) => {
    const { error } = validateData(req.body)
    if (error) { res.status(400).send(error.details[0].message) } else {
        const student = await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            phone: req.body.phone
        }, { new: true })

        if (!student) res.status(404).send("student with given id not found")

        res.send(student)
    }
})
router.delete('/:id', async(req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)

    if (!student) res.status(404).send("student with given id not found")

    res.send(student)
})

module.exports = router