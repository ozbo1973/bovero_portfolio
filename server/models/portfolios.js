const mongoose = require("mongoose");

const stringOpts = maxlength => ({
  type: String,
  required: true,
  maxlength: maxlength
});
const portfolioSchema = new mongoose.Schema({
  userId: stringOpts(512),
  title: stringOpts(256),
  company: stringOpts(256),
  location: stringOpts(128),
  position: stringOpts(128),
  description: stringOpts(2048),
  startDate: { type: Date, required: true },
  endDate: Date
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
