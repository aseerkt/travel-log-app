const { Router } = require('express');

const LogEntry = require('../models/logEntry');

const router = Router();

router
  .route('/')
  .get(async (_req, res, next) => {
    try {
      const entries = await LogEntry.find();
      return res.json(entries);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newLog = new LogEntry(req.body);
      const createdEntry = await newLog.save();
      return res.json(createdEntry);
    } catch (error) {
      console.log(error.name);
      if (error.name === 'ValidationError') {
        res.status(422); // Unprocessable Entity
      }
      next(error);
    }
  });

module.exports = router;
