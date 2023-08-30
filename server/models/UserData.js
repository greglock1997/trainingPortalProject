const mongoose = require('mongoose');

const answeredQuestionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },
    correctlyAnswered: {
        type: Boolean,
        required: true
    }
});

const unitCompletedSchema = new mongoose.Schema({
    unitId: {
        type: Number,
        required: true
    },
    completedDate: {
        type: Date,
        default: Date.now
    },
    answeredQuestions: {
        type: [answeredQuestionSchema],
        default: []
    }
});

const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    unitsCompleted: {
        type: [unitCompletedSchema],
        default: []
    }
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;