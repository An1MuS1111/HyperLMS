const mongoose = require('mongoose');
const Schema = mongoose.Schema;







// User Schema
const userSchema = new Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;