const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('combined'));

// ZOOS ENDPOINTS

//GET ALL
server.get('/api/zoos', (req, res)=> {
  db('zoos')
      .then(zoos=> {
          if (zoos === 0) {
            res.status(404).json({message: "The information you've requested does not exist"});
          } else { 
            res.status(200).json(zoos);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "The information you've requested cannot be retrieved from the database"});
      })
});

//GET BY ID
server.get('/api/zoos/:id', async (req, res)=> {
  try {
      const {id} = req.params;
      const zoo = await db('zoos')
      .where({id})
      .first()
      if (!zoo) {
          res.status(404).json({message: "The information you've requested does not exist"});
      } else {
          res.status(200).json(zoo);
      }
  } catch (error) {
      res.status(500).json({message: "The information you've requested cannot be retrieved from the database"});
  }
});

//ADD NEW
server.post('/api/zoos', (req, res)=> {
  const zoo = req.body;
  db.insert(zoo)
      .into('zoos')
      .then(ids=> {
          if (!zoo) {
            res.status(400).json({message: "Please include the requested information"})
          } else {
            res.status(201).json(ids);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "This information could not be added to the database"});
      })
});

//UPDATE EXISTING
server.put('/api/zoos/:id', (req, res)=> {
  const {id} = req.params;
  const changes = req.body;
  db('zoos')
      .where({id})
      .update(changes)
      .then(count => {
          if (! count || count < 1) {
              res.status(404).json({message: "The information you've requested does not exist"});
          } else {
              res.status(200).json(count);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "This information could not be saved to the database"});
      })
});

//DELETE
server.delete('/api/zoos/:id', (req, res)=> {
  const {id} = req.params;
  db('zoos')
      .where({id})
      .del()
      .then(count=> { 
          if (!count || count < 1) {
            res.status(404).json({message: "The information you've requested does not exist"});
          } else {
            res.status(200).json(count);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "The information could not be removed from the database"});
      })
});

//BEARS ENDPOINTS

//GET ALL
server.get('/api/bears', (req, res)=> {
  db('bears')
    .then(bears=> {
      if (bears === 0) {
        res.status(404).json({message: "There is no information to display"});
      } else {
        res.status(200).json(bears);
      }
    })
    .catch(err=> {
      res.status(500).json({error: "This information could not be retrieved from the database"});
    })
});

//GET BY ID
server.get('/api/bears/:id', async (req, res)=> {
  try {
      const {id} = req.params;
      const bear = await db('bears')
      .where({id})
      .first()
      if (!bear) {
          res.status(404).json({message: "The information you've requested does not exist"});
      } else {
          res.status(200).json(bear);
      }
  } catch (error) {
      res.status(500).json({message: "The information you've requested cannot be retrieved from the database"});
  }
});


//ADD NEW
server.post('/api/bears', (req, res)=> {
  const bear = req.body;
  db.insert(bear)
      .into('bears')
      .then(ids=> {
          if (!bear) {
            res.status(400).json({message: "Please include the requested information"})
          } else {
            res.status(201).json(ids);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "This information could not be added to the database"});
      })
});

//UPDATE EXISTING
server.put('/api/bears/:id', (req, res)=> {
  const {id} = req.params;
  const changes = req.body;
  db('bears')
      .where({id})
      .update(changes)
      .then(count => {
          if (! count || count < 1) {
              res.status(404).json({message: "The information you've requested does not exist"});
          } else {
              res.status(200).json(count);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "This information could not be saved to the database"});
      })
});


//DELETE
server.delete('/api/bears/:id', (req, res)=> {
  const {id} = req.params;
  db('bears')
      .where({id})
      .del()
      .then(count=> { 
          if (!count || count < 1) {
            res.status(404).json({message: "The information you've requested does not exist"});
          } else {
            res.status(200).json(count);
          }
      })
      .catch(err=> {
          res.status(500).json({error: "The information could not be removed from the database"});
      })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
