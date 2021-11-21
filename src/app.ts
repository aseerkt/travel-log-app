import express from 'express';

// Header Middleware
import morgan from 'morgan'; // logger the requests and response
import helmet from 'helmet'; // protects some headers from exposure
import cors from 'cors'; // access to our server from external server - Cross Origin Resource Sharing Header

// Middlewares
// import trim from './middlewares/trim';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';

// Routes
import usersRoutes from './api/usersRoutes';
import logsRoutes from './api/logsRoutes';
import { PROD } from './constants';
import path from 'path';

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!PROD)
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  );
// app.use(trim);

app.use('/api/users', usersRoutes);
app.use('/api/logs', logsRoutes);

if (PROD) {
  app.use(express.static('client/build'));
  app.get('*', (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
