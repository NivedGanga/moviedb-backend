const { addMovie, getMovies, searchMovies } = require("../controller/movie.controller")
const router = require("express").Router()
//addmovies
//router.post("/", addMovie)

// for search a movie by its name
router.post("/", searchMovies)

//for get list of movies
router.get("/", getMovies)

module.exports = router;