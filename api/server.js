const express = require('express');

const tooLongAction = require('../middleware/tooLongAction.js');
const tooLongProject = require('../middleware/tooLongProject.js');
const idCheck = require('../middleware/idCheck.js');

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
  return actionModel.get()
    .then(steps => {
      return res.status(200).json(steps)
    })
    .catch(err => {
      res.status(500).json({
        message: "Currently, we are having server issues. Our best Lambda's programmers are working on it.",
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
  return actionModel.get(id)
    .then(step => {
      console.log(step)
      return step 
      ? res.status(200).json(step)
      : res.status(404).json({ "errorMessage": `Cannot find ${id}`});
    })
    .catch(err => {
      res.status(500).json({
        message: "Currently, we are having server issues. Our best Lambda's programmers are working on it.",
        error: err })
    })
})

server.post('/actionModel', idCheck, tooLongAction, async (req, res) => {
  console.log(req.body)
  try {
  const userData = req.body;
  console.log('userData', userData)
  const fullTask = await actionModel.insert(userData)
  console.log('fullTask', fullTask)
  res.status(201).json(fullTask)
  } catch (error) {
    let message = "Currently, we are having server issues. Our best Lambda's programmers are working on it.";
    res.status(500).json({ message, error });
    }
})

server.put('/actionModel/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  console.log(id)
  console.log(changes)
  actionModel.update(id, changes)
    .then(task =>    {
      console.log('TASK', task)
      if (task) {
        res.status(200).json({ message: `Updated Task: { id: ${task.id}, project_id: ${task.project_id}, description: ${task.description}, notes: ${task.notes}, completed: ${task.completed} }`})
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Currently, we are having server issues. Our best Lambda's programmers are working on it." });
    });
  });

server.delete('/actionModel/:id', (req, res) => {
  actionModel.remove(req.params.id)
    .then(count => {
      !count
      ? res.status(404).json({ error: "There is no task with that id." })
      : res.status(200).json(`${count} task(s) deleted`);
    })
    .catch(err => {
      res.status(500).json({ message: "Currently, we are having server issues. Our best Lambda's programmers are working on it." });
    });
});


// GET projectModels
server.get('/projectModels', (req, res) => {

  projectModels.get()
    .then(item => {
      console.log(item)
      return res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({
        message: "Currently, we are having server issues. Our best Lambda's programmers are working on it.",
        error: err })
    })
})

server.get('/projectModels/:id', (req, res) => {
  const { id } = req.params
  return projectModels.get(id)
    .then(step => {
      return step.id
      ? res.status(200).json(step)
      : res.status(404).json({ "errorMessage": `Cannot find ${id}`});
    })
    .catch(err => {
      res.status(500).json({
        message: "Currently, we are having server issues. Our best Lambda's programmers are working on it.",
        error: err })
    })
})

server.post('/projectModels', tooLongProject, async (req, res) => {
  console.log('-------------------------')
  console.log(req.body)
  console.log(req.params)
  try {
  const projectData = req.body;
  const fullTask = await projectModels.insert(projectData)
  res.status(201).json(fullTask)
  } catch (error) {
    let message = 'error creating the task';
    res.status(500).json({ message, error });
    }
})

// [
//     {
//         "id": 1,
//         "name": "Complete Node.js and Express Challenge",
//         "description": "Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!",
//         "completed": false
//     }
// ]

server.put('/projectModels/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projectModels.update(id, changes)
    .then(task =>    {
      if (task) {
        res.status(200).json({ message: `Updated Task: { id: ${task.id}, name: ${task.name}, description: ${task.description}, completed: ${task.completed} }`})
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Currently, we are having server issues. Our best Lambda's programmers are working on it.", error: err });
    });
  });

server.delete('/projectModels/:id', (req, res) => {
  projectModels.remove(req.params.id)
    .then(count => {
      res.status(200).json(`${count} task(s) deleted`);
    })
    .catch(err => {
      res.status(500).json({ message: "Currently, we are having server issues. Our best Lambda's programmers are working on it.", error: err });
    });
});


module.exports = server;
