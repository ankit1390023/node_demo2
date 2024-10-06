const { default: mongoose } = require("mongoose");
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('MongoDB Connected');
    }).catch((error) => {
        console.log('Error connecting to MongoDB',error);
    })
}
module.exports = connectDB;