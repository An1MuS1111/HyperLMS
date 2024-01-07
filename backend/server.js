const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose');
const app = express()



require('dotenv').config();


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => console.log('Mongodb database connection extablished successfully'));


const usersRouter = require('./routes/users')
const teamsRouter = require('./routes/teams')
const reviewsRouter = require('./routes/reviews')
const assessmentsRouter = require('./routes/assessments')
app.use('/users', usersRouter)
app.use('/teams', teamsRouter)
app.use('/reviews', reviewsRouter)
app.use('/assessments', assessmentsRouter)

PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})