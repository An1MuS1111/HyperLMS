const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
});

const assessmentSchema = new mongoose.Schema({
    assessmentId: {
        type: Number,
        required: true,
    },
    questions: [questionSchema],
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
