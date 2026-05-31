const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
  const result = await mongodb.getDb().db().collection('movies').find();
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving movies', error: error.message });
    });
};

const getMovieById = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('movies').find({ _id: movieId });
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving movie', error: error.message });
    });
};

const getWatchedMovies = async (req, res) => {
  const result = await mongodb.getDb().db().collection('movies').find({ watched: true });
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving watched movies', error: error.message });
    });
};

const getUnwatchedMovies = async (req, res) => {
  const result = await mongodb.getDb().db().collection('movies').find({ watched: false });
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving unwatched movies', error: error.message });
    });
};

const getMoviesByGenre = async (req, res) => {
  const result = await mongodb.getDb().db().collection('movies').find({ genre: req.params.genre });
  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving movies by genre', error: error.message });
    });
};

const addMovie = async (req, res) => {
  const { title, director, genre, year, rating } = req.body;
  if (!title || !director || !genre || !year || !rating) {
    return res.status(400).json({ message: 'All fields are required: title, director, genre, year, rating' });
  }
  const movie = {
    title,
    director,
    genre,
    year,
    rating,
    watched: false,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding the movie.');
  }
};

const updateMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const { title, director, genre, year, rating } = req.body;
  if (!title || !director || !genre || !year || !rating) {
    return res.status(400).json({ message: 'All fields are required: title, director, genre, year, rating' });
  }
  const movie = {
    title,
    director,
    genre,
    year,
    rating,
    watched: req.body.watched ?? false,
    dateAdded: req.body.dateAdded
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('movies')
    .replaceOne({ _id: movieId }, movie);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
  }
};

const markWatched = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('movies')
    .updateOne({ _id: movieId }, { $set: { watched: true } });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while marking the movie as watched.');
  }
};

const deleteMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: movieId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getWatchedMovies,
  getUnwatchedMovies,
  getMoviesByGenre,
  addMovie,
  updateMovie,
  markWatched,
  deleteMovie
};