const { default: mongoose } = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    city: {
        type: String,
    }
})
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;