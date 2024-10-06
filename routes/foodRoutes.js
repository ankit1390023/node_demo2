const Food = require("../models/food");
const router = require('express').Router();
//get route
router.get('/', async (req, res) => {
    try {
        const response = await Food.find();
        return res.status(200).json(response);
    } catch (error) {
        console.log('Internal  Server error', error);
        return res.status(500).json(response);
    }
})

//get by id
router.get('/:id', async (req, res) => {
    try {
        const FoodId = req.params.id;
        const response = await Food.findById(FoodId);
        if (!response) res.status(404).json({ message: 'FoodId not found' });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server error' });
    }
})

//post API
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const food = new Food(data);
        const response = await food.save();
        return res.status(201).json(response);
    } catch (error) {
        console.log('Internal  Server error', error);
    }

})

//update route
router.put('/:id', async (req, res) => {
    const FoodId = req.params.id;
    const Fooddata = req.body;
    try {
        const updatedData = await Food.findByIdAndUpdate(FoodId, Fooddata, { new: true });
        if (!updatedData) return res.status(404).json({ message: 'FoodId is not  found' });
        return res.status(200).json(updatedData);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server error' });
    }
})


//delete route
router.delete('/:id', async (req, res) => {
    const FoodId = req.params.id;
    try {
        const deletedData = await Food.findByIdAndDelete(FoodId);
        if (!deletedData) res.status(404).json({ message: 'FoodId not found' });
        return res.status(200).json(deletedData);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports =router;