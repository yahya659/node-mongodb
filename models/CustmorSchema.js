const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const custmorschema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  Telephone: Number,
  Age: Number,
  from: String,
  Gender: String,
},{timestamps:true});//الوقت متى تم الااضافه 
const Custmor = mongoose.model("Custmor", custmorschema);
module.exports = Custmor;
