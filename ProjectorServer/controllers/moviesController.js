var movies = require("./movieData");

 exports.getAllMovies = function(req, res, next) {
   return res.json(movies);
 };

 