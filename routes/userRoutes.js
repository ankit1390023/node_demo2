const { jwtAuthMiddleware,generateToken } = require('../jwt');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

//post route
router.post('/signin', async (req, res) => {
    try {
        const data = new User(req.body);
        const response = await data.save();
        const payload = {
            username: response.username,
            id:response.id
        }
        // console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        // console.log("Token is :", token);
        return res.status(200).json({response:response,token:token});
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
})
//login route
router.post('/login', async (req, res) => {
    try {
        //extract username and password from request body
        const { username, password } = req.body;
        //find user by username
        const user = await User.findOne({ username: username });
        //if user does't exist or passowrd does not match ,return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        //if user exists and password matches, generate token and return it
        const payload = {
            username: user.username,
            id:user.id
        }
        const token = generateToken(payload);
        // return token as response
        return res.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
})
//profile  route
router.get('/profile',jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log('User Data:', userData);

        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({ user });

    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error');
    }
})
//get route
router.get('/',jwtAuthMiddleware,async (req, res) => {
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