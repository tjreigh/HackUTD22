const mongoose = require('mongoose');

const occupantSchema = mongoose.Schema({
	type: Number, // 0: keyholder, 1: officer, 2: guest
	name: String,
	mavId: String,
	status: Number, // 0: available, 1: busy, 2: DND
});

const Occupant = mongoose.model('occupant', occupantSchema);
module.exports = Occupant;
