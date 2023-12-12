const express = require('express');
const ArtWork = require('../Models/ArtWork');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const artworks = await ArtWork.find();
		res.status(200).send(artworks);
	}
	catch (error) {
		res.status(500).send({ error: error });
	}
})

router.get('/:id', async (req, res) => {
	const { id } = req.params; 
	try {
		const artwork = await ArtWork.findById(id);
		res.status(200).send(artwork);
	}
	catch (error) {
		res.status(500).send({ error: error });
	}
})

module.exports = router; 