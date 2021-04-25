import mongoose, { Document } from 'mongoose';
import User, { IUser } from './User';

// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating - scale of 1-10
// * Image - Text - URL
// * Start Date - DateTIme
// * End Date - DateTIme
// * Longitude - Number
// * Latitude - Number
// * Created At - DateTime
// * Updated At - DateTime

interface ILogEntry extends Document {
  title: string;
  description: string;
  comments: string;
  rating: number;
  latitude: number;
  longitude: number;
  visitDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new mongoose.Schema<ILogEntry>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model<ILogEntry>('LogEntry', logEntrySchema);

export default LogEntry;
