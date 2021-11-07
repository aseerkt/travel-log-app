import express from 'express';

// Header Middleware
import morgan from 'morgan'; // logger the requests and response
import helmet from 'helmet'; // protects some headers from exposure
import cors from 'cors'; // access to our server from external server - Cross Origin Resource Sharing Header

// Middlewares
import trim from './middlewares/trim';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';

// Routes
import usersRoutes from './api/usersRoutes';
import logsRoutes from './api/logsRoutes';

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN!,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.json({
    message: 'Welcome to Travel Logs API!',
  });
});

app.use(trim);

app.use('/api/users', usersRoutes);
app.use('/api/logs', logsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
