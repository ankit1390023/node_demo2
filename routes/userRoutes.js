const User = require('../models/user');

const router = require('express').Router();

//post route
router.post('/', async (req, res) => {
    try {
        const data = new User(req.body);
        const response = await data.save();
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
})
//get route
router.get('/', async (req, res) => {
    try {
        const response = await User.find();
        if (!response) return res.status(404).json({ message: "user not found" });
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server error' });
    }
})
// //get route by id
// router.get('/:id', async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const response = await User.findById(userId);
//         if (!response) return res.status(404).json({ message: "User not found" });
//         res.status(200).json(response);
//     }   catch (error) {
//         console.error(error);
//         return res.status(500).json('Internal Server error');
//     }
// })
//get route by role
router.get('/:roleType', async (req, res) => {
    const roleType = req.params.roleType;
    try {
        if (roleType == "admin" || roleType == "user" || roleType == "ustad" || roleType == "chela" || roleType == "singham") {
            const response = await User.find({ role: roleType })
            return res.status(200).json(response);
        } else {
            return res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;