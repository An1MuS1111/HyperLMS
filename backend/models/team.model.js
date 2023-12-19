const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team Schema
const teamSchema = new Schema({
    teamId: { type: String, required: true, unique: true },
    teamName: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team