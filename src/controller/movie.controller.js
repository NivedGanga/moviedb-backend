const { addMovieService, getAllMoviesService, searchMovie } = require("../service/movie.service")

module.exports = {
    //controller for adding list of movies
    addMovie: (req, res) => {
        const body = req.body;
        addMovieService(body, (error, results) => {
            if (error) {
                console.log(error)
                return res.status(500).json({

                    message: "Db connection error"
                })
            } else {
                return res.status(200).json({

                    data: results
                })
            }
        })
    },
    //controller for get list of movies
    getMovies: (req, res) => {
        //access page for doing pagination
        let page = req.query.page
        //is there is no page given in the query then setting page as 0
        if (!page) {
            page = 0
        }
        getAllMoviesService(page, (error, results) => {
            //handling error
            if (error) {
                console.log(error)
                return res.status(500).json({
                    message: "Db connection error"
                })
            } else {
                //if the retrieving movie data from database, sending these as responce with status code 200
                return res.status(200).json({
                    data: results
                })
            }
        })
    },
    //controller for seaching movie by its name
    searchMovies: (req, res) => {
        //accessing the query params
        let name = req.query.name
        searchMovie(name, (error, results) => {
            if (error) {
                //handling error
                console.log(error)
                return res.status(500).json({

                    message: "Db connection error"
                })
            } else {
                //if the searching is done, list of movies are sending as response with status code 200
                return res.status(201).json({

                    data: results
                })
            }
        })
    },
}