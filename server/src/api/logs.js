const { Router } = require('express');

const LogEntry = require('../models/logEntry');

const router = Router();

router.get('/', async (req,res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  }
  catch(error){
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try{
    const newLog = new LogEntry(req.body);
    const createdEntry = await newLog.save();
    res.json(createdEntry);
  }
  catch(error){
    console.log(error.name);
    if(error.name === 'ValidationError'){
      res.status(422); // Unprocessable Entity
    }
    next(error);
  }
})

module.exports = router;