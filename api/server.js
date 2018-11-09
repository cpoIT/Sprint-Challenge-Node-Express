const express = require('express');

const actionModel = require('../data/helpers/actionModel.js');
const projectModels = require('../data/helpers/projectModel.js');
// const mappers = require('../data/helpers/mappers.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('&#128075;	&#127993; &#128104')
})


// GET actionModel
server.get('/actionModel', (req, res) => {
  actionModel.get()
    .then(item => {
      console.log(item)
      return res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({
        message: "Cannot retrieve ITEM",
        error: err })
    })
})

/*
{
    "id": 1,
    "project_id": 1,
    "description": "Fork and Clone Repository",
    "notes": "Repo URL: https://github.com/LambdaSchool/Sprint-Challenge-Node-Express",
    "completed": false
}
*/

server.get('/actionModel/:id', (req, res) => {
  const { id } = req.params
  actionModel.get(id)
    .then(item => {
      return res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({
        message: "Cannot retrieve ITEM",
        error: err })
    })
})


// GET projectModels
server.get('/projectModels', (req, res) => {

  projectModels.get()
    .then(item => {
      return res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({
        message: "Cannot retrieve ITEM",
        error: err })
    })
})

module.exports = server;

/* 

// GET MAPPERS
server.get('/mappers', (req, res) => {
  mappers.get()
    .then(item => {
      return res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({
        message: "Cannot retrieve ITEM",
        error: err })
    })
})

*/