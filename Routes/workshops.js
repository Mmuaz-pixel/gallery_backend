const express = require('express')

const Workshops = require('../Models/Workshops');
const Patrons = require('../Models/Patrons');
const router = express.Router(); 

router.get('/:id', async(req, re)=> 
{
	try 
	{
		const {id} = req.params; 
		const workshops = await Workshops.find({artist: id}); 
		res.send(workshops)
	}
	catch(error)
	{
		res.status(500).send(error); 
	}
})

router.post('/addWorkshop', async(req, res)=> 
{
	const {title, artist, description } = req.body; 
	try 
	{
		const workshop = await Workshops.create({title: title, artist: artist, description: description})

		res.send(workshop); 
	}
	catch(error)
	{
		res.status(500).send(error); 
	}
})

router.post('/subscribe/:id', async(req, res)=> 
{
	const {id} = req.params; 
	const {patronId} = req.body;
 	try 
	{	
		const patron = await Patrons.findById(patronId);
		if(!patron.subscribedWorkshops.includes(id))
		{
			patron.subscribedWorkshops.push(id);
			await patron.save();  
		} 
		else 
		{
			res.status(400).send({message: "Already subscribed"})
		}
	}
	catch(error)
	{
		res.status(500).send("Internal server error"); 
	}
})


module.exports = router