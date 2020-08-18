const express = require('express');
const mongoose = require('mongoose');
// Header Middleware
const morgan = require('morgan'); // logger the requests and response
const helmet = require('helmet'); // protects some headers from exposure
const cors = require('cors'); // access to our server from external server - Cross Origin Resource Sharing Header

require('dotenv').config();
const middlewares = require('./middlewares');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN // only request coming from this can access our backend server at port 1337
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port =  process.env.PORT || 1337;

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`);
});
