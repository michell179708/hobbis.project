const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//this works for auth 
const {authSchema}= require('../helpers/validate_schema');

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
    const hobby = {
      name: req.body.name,
      description: req.body.description,
      benefit: req.body.benefit
    };

   
    const response = await mongodb.getDb().db().collection('hobbies').insertOne(hobby);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the hobby.');
    }
  };

  const updateHobbie = async (req, res) => {
    // #swagger.tags = ['UpdatHobbie']
    const userId = new ObjectId(req.params.id);
    const newInfo = {
      name: req.body.name,
      description: req.body.description,
      benefit: req.body.benefit,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("hobbies")
      .replaceOne({ _id: userId }, newInfo);
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the hobby."
        );
    }
  };

  const deleteHobbie = async (req, res) => {
    // #swagger.tags = ['DeleteContact']
    const userIdDelete = new ObjectId (req.params.id);
    const response = await mongodb
    .getDb()
    .db()
    .collection("hobbies")
    .deleteOne({ _id: userIdDelete}, true);
    console.log('HobbieDelete');
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the hobby."
        );
    }
  };
  
  


  module.exports = {
    getAll,
    getSingle,
    createHobbie,
    updateHobbie,
    deleteHobbie
    
  };