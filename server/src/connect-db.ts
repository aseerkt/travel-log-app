import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Connected to DB: ${conn.connection.host}`.yellow.bold);
  } catch (err) {
    console.log(`DB Connection Failed: ${err.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
