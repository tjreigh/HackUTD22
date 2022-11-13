require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hackutd22.cfgpdzf.mongodb.net/?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://${process.env.DB_USER_ALT}:${process.env.DB_PASS_ALT}@cluster0.dljqb.azure.mongodb.net/?retryWrites=true&w=majority`;
mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => console.log('Connected to database'))
	.catch(err => {
		console.error(`Error while attempting to connect to database: \n${err}`);
		process.exit();
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
	res.send('success');
});

const Rooms = require('./controllers/rooms');
const Occupants = require('./controllers/occupants');

app.get('/rooms/all', Rooms.getAllRooms);
app.post('/rooms/create', Rooms.createRoom);
app.get('/rooms/:name', Rooms.getRoom);
app.get('/rooms/:name/status/', Rooms.roomStatus);
app.put('/rooms/:name/update/', Rooms.updateRoom);
app.post('/rooms/:name/addOccupant', Rooms.addOccupant);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
