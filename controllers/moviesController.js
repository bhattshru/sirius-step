var dbService= require("../services/dbService"),
STATUS_CODE = require("../constants/statusCodes").STATUS_CODE;

 exports.getAllMovies = function(req, res, next) {
   try {
     // Get the documents collection
     var db=dbService.database;
     var moviesCollection = db.collection("movies");
     moviesCollection.find().toArray().then(result=>{
             res.json({
               isSuccess: true,
               data: result
             });
     }).catch(err=>{
       console.log(err);
       res.json({
         isSuccess: false,
         error: STATUS_CODE.DB_ERROR
       });
     });
   } catch (err) {
     res.json({
       isSuccess: false,
       error: STATUS_CODE.SERVER_ERROR
     });
   }
 };

 exports.addNewMovie = function(req, res, next) {
   try {
      var movie = req.body;
      if (!movie.name || !movie.releaseYear || !movie.language ||
          !movie.rating || isNaN(movie.releaseYear) || !movie.thumbnailUrl ||
          !movie.posterUrl || !movie.plot || !movie.cast || isNaN(movie.rating)) {
          res.json({
            isSuccess: false,
            error: STATUS_CODE.INSUFFICIENT_PARAMS
          });
        } else {
          var db=dbService.database;
          console.log(movie);
          var moviesCollection = db.collection("movies");

          moviesCollection.insert(movie).then(save_data=>{
            return res.json({
              "isSuccess": true
            });
          }).catch(err=>{
            return res.json({
              isSuccess: false,
              error: STATUS_CODE.DB_ERROR
            });
          });
        }
      } catch (err) {
        res.json({
          isSuccess: false,
          error: STATUS_CODE.SERVER_ERROR
        });
      }
  };

  exports.getMovieDetails = function(req, res, next) {
    try {
      console.log(req.params.movieName);
      var db=dbService.database;
      var moviesCollection = db.collection("movies");
      moviesCollection.find({ name: req.params.movieName }).toArray().then(result=>{
        if (result.length > 0) {
          res.json({
            isSuccess: true,
            data: result[0]
          });
        } else {
          res.json({
            isSuccess: false,
            error: STATUS_CODE.MOVIE_NOT_FOUND
          });
        }
      }).catch(err=>{
        console.log(err);
        res.json({
          isSuccess: false,
          error: STATUS_CODE.DB_ERROR
        });
      });
    } catch (err) {
      res.json({
        isSuccess: false,
        error: STATUS_CODE.SERVER_ERROR
      });
    }
  };
