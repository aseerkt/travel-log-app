const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const requiredNumber = {
  type: Number,
  required: true,
}

const logEntrySchema = new Schema({
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
  latitude: requiredNumber,
  logitude: requiredNumber,
  visitDate: {
    required: true,
    type: Date,
  }
},{
  timestamps: true,
});

const logEntry = mongoose.model('logEntry', logEntrySchema);

module.exports = logEntry;