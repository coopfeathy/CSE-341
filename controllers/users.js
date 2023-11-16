const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  const result = await mongodb.getDb().collection('contacts').find();
  result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//Create User
const createUser = async (req, res) => {
  const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  };
  const response = await mongodb.getDb().collection('contacts').insertOne(newUser);
  if (response.acknowledged > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Error creating contact');
  }
  
}; 


//update user
const updateUser = async (req, res) => {

  const userId = new ObjectId(req.params.id);
  const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  };
  const response = await mongodb.getDb().collection('contacts').replaceOne({_id: userId}, newUser);
  if (response.modifiedCount > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Error updating contact');
  }

};

//delete user
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
      const response = await mongodb.getDb().collection('contacts').deleteOne({_id: userId});
      if (response.deletedCount > 0) {
          res.status(204).send();
      } else {
          res.status(404).json('Contact not found');
      }
  } catch (error) {
      res.status(500).json('Error deleting contact ' + error.message);
  }
};

module.exports = {getAll, getSingle, createUser, updateUser, deleteUser};