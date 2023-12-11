const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000; 
const artistRouter = require('./Routes/artist')
const patronsRouter = require('./Routes/patrons'); 
const artworkRouter = require('./Routes/artWorks'); 
const reviewRouter = require('./Routes/reviews')

const connectToDb = require('./Database/connection')
connectToDb(); 

app.use(express.json())
app.use(cors())

app.use('/patrons', patronsRouter);
app.use('/artists', artistRouter); 
app.use('/artworks', artworkRouter); 
app.use('/reviews', reviewRouter); 

app.listen(PORT, ()=>
{
    console.log("Server is running on port: ", PORT); 
})