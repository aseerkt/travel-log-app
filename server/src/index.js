const express = require('express');
// Header Middleware
const morgan = require('morgan'); // logger the requests and response
const helmet = require('helmet'); // protects some headers from exposure
const cors = require('cors'); // access to our server from external server - Cross Origin Resource Sharing Header

const middlewares = require('./middlewares');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000' // only request coming from this can access our backend server at port 1337
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
