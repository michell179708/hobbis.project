const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
     // #swagger.tags = ['GetallHobbies']
    const result = await mongodb.getDb().db().collection('hobbies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  const getSingle = async (req, res) => {
     // #swagger.tags = ['GetOneHobbie']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('hobbies').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  const createHobbie = async (req, res) => {
     // #swagger.tags = ['CreateNewHobbie']
    const contact = {
      name: req.body.name,
      description: req.body.description,
      benefit: req.body.benefit
    };
    const response = await mongodb.getDb().db().collection('hobbies').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  };

  module.exports = {
    getAll,
    getSingle,
    createHobbie
  };