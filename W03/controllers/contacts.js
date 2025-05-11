const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();

  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });

  result
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving contact', error: error.message });
    });
};

module.exports = { getAll, getSingle };
