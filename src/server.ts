import 'colors';
import 'dotenv/config';

import app from './app';
import connectDB from './connect-db';

// Connect to DB
connectDB();

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`.blue.bold);
});
