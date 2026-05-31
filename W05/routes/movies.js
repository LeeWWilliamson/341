const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.getAllMovies);
router.get('/watched', moviesController.getWatchedMovies);
router.get('/unwatched', moviesController.getUnwatchedMovies);
router.get('/genre/:genre', moviesController.getMoviesByGenre);
router.get('/:id', moviesController.getMovieById);

router.post('/', moviesController.addMovie);

router.put('/:id', moviesController.updateMovie);
router.put('/:id/watched', moviesController.markWatched);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;