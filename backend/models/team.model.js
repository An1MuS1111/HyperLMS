const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Team Schema
const teamSchema = new Schema({
    teamId: { type: String, required: true, unique: true },
    teamName: { type: String, required: true },
    members: [{ type: String, required: true }]
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team