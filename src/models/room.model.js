const mongoose = require('mongoose');
const Occupant = require('./occupant.model');

const roomSchema = mongoose.Schema({
	name: String,
	building: String,
	number: Number,
    alias: String,
	status: Number, // 0: available, 1: busy, 2: DND
	occupantCount: Number,
	occupants: { type: mongoose.Schema.Types.ObjectId, ref: 'Occupant' },
});

const Room = mongoose.model('room', roomSchema);
module.exports = Room;
