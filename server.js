const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');
// const passport = require('./auth.js');
const { jwtAuthMiddleware } = require('./jwt.js');
require('dotenv').config();
const app = express();
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Initialize Passport
// app.use(passport.initialize());

// Use food routes
app.use('/food',jwtAuthMiddleware, foodRoutes);

// Secure user routes with local strategy authentication
// const localAuthMiddleware = passport.authenticate('local', { session: false });
app.use('/',userRoutes);


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Listen to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
