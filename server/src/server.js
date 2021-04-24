require('colors');
const express = require('express');
const mongoose = require('mongoose');
// Header Middleware
const morgan = require('morgan'); // logger the requests and response
const helmet = require('helmet'); // protects some headers from exposure
const cors = require('cors'); // access to our server from external server - Cross Origin Resource Sharing Header

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

// Connect to DB

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(`DB Connection Failed: ${err.message}`.red);
      process.exit(1);
    }
    console.log(`Connected to DB`.yellow.bold);
  }
);

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // only request coming from this can access our backend server
  })
);
app.use(express.json()); // express json body parser // req.body

app.get('/', (_, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`.blue.bold);
});
