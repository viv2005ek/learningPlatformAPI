const express = require("express")
const router = express.Router()


const { Category, validateData } = require("../modles/catagoriesModule") //Category and validData imported from module folder
router.get('/api/categories', async(req, res) => {
    const categories = await Category.find()
    res.send(categories)
})


router.get('/api/categories/:id', async(req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(404).send("no catagory by this id")
    res.send(category)
})

router.post('/api/categories', async(req, res) => {
    const { error } = validateData(req.body)
    if (error) { res.status(400).send(error.details[0].message) } else {
        const category = new Category({ //requesting data like mongo by making object of model class
            // id: categories.length + 1,  //mongo khud id de deta
            name: req.body.name
        })
        await category.save();
        res.send(category);
    }
})

router.put('/api/categories/:id', async(req, res) => {
    const { error } = validateData(req.body)
    if (error) { res.status(400).send(error.details[0].message) } else {
        const catagory = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

        if (!catagory) res.status(404).send("catagory with given id not found")

        res.send(catagory)
    }
})
router.delete('/api/categories/:id', async(req, res) => {
    const catagory = await Category.findByIdAndDelete(req.params.id)

    if (!catagory) res.status(404).send("catagory with given id not found")

    res.send(catagory)
})

module.exports = router