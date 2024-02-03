// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;







// // User Schema
// const userSchema = new Schema({
//     userId: { type: String, required: true },
//     username: { type: String, required: true },
//     email: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    matric: { type: String, required: true },
    faculty: { type: String, required: true },
    semester: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
