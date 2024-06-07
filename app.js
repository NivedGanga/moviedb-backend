const express = require('express')
require('dotenv').config()
const movieRouter = require("./src/routes/movie.router")
const cors = require('cors');
//creating app
const app = express()
app.use(cors({
    origin: true,
    credentials: true, 
}));
app.use(express.json())

const port = process.env.PORT || 10000

//routes
app.use("/movie", movieRouter)

app.listen(port, () => {
    console.log(`Server started at post: ${port}`)
})