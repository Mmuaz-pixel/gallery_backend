const express = require('express')
const ArtWork = require('../Models/ArtWork');
const Workshops = require('../Models/Workshops');
const Artists = require('../Models/Artists')
const router = express.Router()

router.post('/register', async (req, res) => {
	const { username } = req.body;
	let user = await Artists.findOne({ username: username });

	if (user) {
		req.artist = {
			id: user.id,
			type: 'artist'
		}
		res.status(200).send("logged in successfull")
	}

	try {
		user = await Artists.create({ username: username, followers: [], workshops: [], artworks: [] })

	}
	catch (error) {
		res.status(500).send("Server error occured");
	}

	res.status(201).send("Artist created successfully");
})

router.get('/name/:id', async(req, res)=> 
{	try 
	{
		const { id } = req.params; 
		const artist = await Artists.findById(id); 
		res.send(artist); 
	}
	catch (error)
	{
		res.status(500).send("Server error")
	}
})

router.get('/artworks/:username', async (req, res) => {
	const { username } = req.params;
	if (!username) res.status(404).send("Id not found");
	const artist = await Artists.findOne({username: username})
	const artWorks = await ArtWork.find({ artist: artist.id });
	res.json(artWorks);
})

router.post('/addArtwork', async (req, res) => {
	const { title, year, category, medium, description, poster, username } = req.body;
	if (!username) res.status(404).send("Id not found");
	const artist = await Artists.findOne({username: username})
	const {id} = artist

	try {
		const existingArtwork = await ArtWork.findOne({ title });

		if (existingArtwork) {
			return res.status(400).json({ error: 'Artwork with this title already exists.' });
		}
		else 
		{
			const newArtwork = await ArtWork.create({
				title: title, artist: id, year: year, category: category, medium: medium, description: description, poster: poster
			});
			console.log(newArtwork)
			artist.artworks.push(newArtwork.id); 
			await artist.save(); 
			res.status(201).json({ message: 'Artwork added successfully', artwork: newArtwork });
		}

	} catch (error) {
		console.error('Error adding artwork:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/addWorkshop', async (req, res) => {
	const { title, description, username } = req.body;
	if (!username) res.status(404).send("Id not found");
	const artist = await Artists.findOne({username: username});
	const {id} = artist;
	if (!title) {
		res.status(400).send("Title not specified")
	}
	try {
		const workshop = Workshops.create({ title: title, artist: id, description: description });
		res.status(201).send("Workshop added")
	}
	catch (error) {
		res.status(500).send("Some error occured");
	}

})

router.get('/workshops/:id', async(req, res)=> 
{
	const { id } = req.params;
	const workshops = await Workshops.find({artist: id})
	res.status(200).send(workshops); 
})

module.exports = router; 