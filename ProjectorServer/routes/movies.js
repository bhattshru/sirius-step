var express = require('express'),
     router = express.Router(),
     moviesController = require('../controllers/moviesController');

 router.get('/all', moviesController.getAllMovies);
        
 module.exports = router;
