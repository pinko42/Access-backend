const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportsSchema = new Schema({
  firstname: {
    type: "string",
    required: "firstname is required",
  },

  cardnumber: {
    type: "string",
    required: "cardnumber is required",
  },

  door: {
    type: "string",
    required: "door is required",
  },
  
});

const Reports = mongoose.model("reports", ReportsSchema);
module.exports = Reports;
