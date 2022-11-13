const Occupant = require('../models/occupant.model');

exports.getOccupant = async (req, res) => {
	const name = req.params.name;
	const Occupant = await Occupant.find({ name });
	if (!Occupant) return res.status(404).send(`Occupant ${name} not found`);
	res.send(Occupant);
};

exports.getAllOccupants = async (req, res) => {
	res.send(await Occupant.find({}));
};

exports.OccupantStatus = async (req, res) => {
	const name = req.params.name;
	const Occupant = Occupant.find({ name });
	console.log(Occupant.status);
	res.send(Occupant.status);
};

exports.createOccupant = async (req, res) => {
	const body = req.body;
	const data = { name: body.name, building: body.building, number: body.number };
	console.log(body, data);
	const Occupant = new Occupant(data);

	await Occupant.save();

	res.status(200).send({ Occupant, ...data });
};

exports.updateOccupant = async (req, res) => {
	const body = req.body;
	const name = req.params.name;

	Occupant.findOneAndUpdate({ name }, body, (err, Occupant) => {
		if (err) {
			console.error(`Error in updateOccupant: \n${err}`);
			return res.status(400);
		}

		res.status(200).send(`updated ${name} successfully`);
	});
};
