const mongoose = require('mongoose');

const occupantSchema = mongoose.Schema({
	type: Number,
	name: String,
});

const Occupant = mongoose.model('occupant', occupantSchema);
module.exports = Occupant;
