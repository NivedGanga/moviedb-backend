const pool = require("../config/database");

module.exports = {
    //add list of movie data to the database
    addMovieService: (movieList, callback) => {
        //check whether the input data is valid or not
        if (!Array.isArray(movieList) || movieList.length === 0) {
            return callback(new Error('Invalid input data'));
        }

        try {
            let moviesProcessed = 0;
            //insert each value given in the request body
            for (const movie of movieList) {
                if (!movie.title || !movie.year) {
                    console.error('Invalid movie data:', movie);
                    continue;
                }
                const query = `
                    INSERT INTO movies (title, year, genre, banner_image)
                    VALUES (?, ?, ?, ?)
                `;

                const values = [
                    movie.title,
                    movie.year,
                    movie.genre,
                    movie.banner_image
                ];
                //executing the query and handling errors
                pool.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error('Database error:', error);
                        return callback(error);
                    }

                    moviesProcessed++;
                    if (moviesProcessed === movieList.length) {
                        return callback(null, 'Movies added successfully');
                    }
                });
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return callback(error);
        }
    },
    //get list of movie data stored in the database
    getAllMoviesService: (page, callback) => {
        try {
            query = `SELECT * FROM movies `
            //retrieves movie data list of length 30 starting from the next row of previously sent list
            pool.query(query, page * 30, (error, results, fields) => {
                if (error) {
                    console.error('Database error:', error);
                    return callback(error);
                }
                return callback(null, results)
            })
        } catch (error) {
            console.error('Error occurred:', error);
            return callback(error);
        }
    },
    searchMovie: (name, callback) => {
        try {
            //get first 50 movie data is there is no query params mentioned in the request
            //or get the movies data matching the param
            let query
            if (!name) {
                query = `SELECT * FROM movies LIMIT 50 OFFSET 0`
            } else {
                query = `SELECT * FROM movies WHERE title LIKE ?`;
            }

            pool.query(query, [`%${name}%`], (error, results, fields) => {
                if (error) {
                    console.error('Database error:', error);
                    return callback(error);
                }
                console.log(results)
                return callback(null, results)
            })
        } catch (error) {
            console.error('Error occurred:', error);
            return callback(error);
        }
    }
};
