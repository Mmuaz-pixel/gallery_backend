const express = require('express')
const Patrons = require('../Models/Patrons')
const ArtWork = require('../Models/ArtWork');
const router = express.Router()

router.post('/register', async (req, res) => {
	const { username, password } = req.body;
	let user = await Patrons.findOne({ username: username });

	if (user) {
		res.send(400).send("Username already exists");
	}

	try {
		user = await Patrons.create({ username: username, password: password, followingArtists: [], likedArtworks: [] })
	}

	catch (error) {
		res.status(500).send("Server error occured");
	}

	res.status(201).send(user);
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	let user = await Patrons.findOne({ username: username });
	if (user && user.password == password) {
		res.status(200).send(user);
	}
	else {
		res.status(401).send("Invalid credentials")
	}

})

router.get('/following/:username', async (req, res) => {
	const { username } = req.params;
	let user = await Patrons.findOne({ username: username });

	if (user) {
		res.send(user.followingArtists);
	}
	else {
		res.status(500).send("Some error occured")
	}

})

router.post('/addArtist', async (req, res) => {
	const { username, artistId } = req.body;

	try {
		const patron = await Patrons.findOne({ username: username });

		if (!patron) {
			return res.status(404).send('Patron not found');
		}

		if (patron.followingArtists.includes(artistId)) {
			return res.status(400).send('Artist already in following list');
		}
		else {
			patron.followingArtists.push(artistId);
			await patron.save();
			res.status(200).send('Artist added to following list successfully');
		}

	} catch (error) {
		console.error(error);
		res.status(500).send('Server error occurred');
	}
});

// Remove artist from followingArtists array
router.post('/removeArtist', async (req, res) => {
	const { username, artistId } = req.body;

	try {
		const patron = await Patrons.findOne({ username: username });

		if (!patron) {
			return res.status(404).send('Patron not found');
		}

		const artistIndex = patron.followingArtists.indexOf(artistId);

		if (artistIndex === -1) {
			return res.status(400).send('Artist not found in following list');
		}

		patron.followingArtists.splice(artistIndex, 1);
		await patron.save();

		res.status(200).send('Artist removed from following list successfully');
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error occurred');
	}
});

router.put('/addLike', async (req, res) => {
	const { username, artworkId } = req.body;
	console.log(req.body);

	try {
		const patron = await Patrons.findOne({ username: username });

		if (!patron) {
			return res.status(404).send('Patron not found');
		}

		// Check if artworkId is already in likedArtworks array
		if (patron.likedArtworks.includes(artworkId)) {
			return res.status(400).send('Artwork already liked by the patron');
		}

		patron.likedArtworks.push(artworkId);
		await patron.save();

		const artWork = await ArtWork.findById(artworkId);

		if (!artWork) {
			return res.status(404).send('Artwork not found');
		}

		artWork.likes += 1; // Increment the likes
		await artWork.save();

		return res.status(200).send('Artist added to following list successfully');
	} catch (error) {
		return res.status(500).send(error);
	}

})

module.exports = router; 