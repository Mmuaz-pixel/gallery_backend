const express = require('express')
const Reviews = require('../Models/Reviews')
const router = express.Router();

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const reviews = await Reviews.find({ artwork: id });
		return res.send(reviews);
	}

	catch (error) {
		res.status(500).send(error);
	}
})

router.post('/addreview/:id', async (req, res) => {
	const { id } = req.params;
	const { patronId, content } = req.body;
	try {
		const review = await Reviews.create({ artwork: id, patron: patronId, content: content });
		return res.send(review);
	}

	catch (error) {
		res.status(500).send(error);
	}
})

module.exports = router