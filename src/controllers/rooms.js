const Room = require('../models/room.model');
const Occupant = require('../models/occupant.model');

exports.getRoom = async (req, res) => {
	const name = req.params.name;
	const room = await Room.find({ name });
	if (!room) return res.status(404).send(`Room ${name} not found`);
	res.send(room);
};

exports.getAllRooms = async (req, res) => {
	res.send(await Room.find({}));
};

exports.roomStatus = async (req, res) => {
	const name = req.params.name;
	const room = Room.find({ name });
	console.log(room.status);
	res.send(room.status);
};

exports.createRoom = async (req, res) => {
	const body = req.body;
	const data = { name: body.name, building: body.building, number: body.number };
	console.log(body, data);
	const room = new Room(data);

	await room.save();

	res.status(200).send({ room, ...data });
};

exports.updateRoom = async (req, res) => {
	const body = req.body;
	const name = req.params.name;

	Room.findOneAndUpdate({ name }, body, (err, room) => {
		if (err) {
			console.error(`Error in updateRoom: \n${err}`);
			return res.status(400);
		}

		res.status(200).send(`updated ${name} successfully`);
	});
};

exports.addOccupant = async (req, res) => {
	const body = req.body;
	const roomName = req.params.name;

	const room = Room.find({ name: roomName });
	const dbOccupant = Occupant.find({
		name: body.name ? body.name : undefined,
		mavId: body.mavId ? body.mavId : undefined,
	});
	const newOccupant = {
		name: body.name ?? 'undefined',
		mavId: body.mavId ?? 'undefined',
		type: 2,
	};

	if (!room) return res.status(404).send(`Could not find room ${roomName}`);

	const occupants = await room.select('occupants').exec();
	occupants.push(dbOccupant ?? newOccupant);
	Room.updateOne({ name: roomName }, occupants);
};
