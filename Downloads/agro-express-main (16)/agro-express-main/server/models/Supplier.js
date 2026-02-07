import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref: "User"
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  
  supplierPerson: {
    type: String,
    required: true,
    enum: ["Kedar", "Rupesh", "Ramesh", "Jayesh", "Rameshwar", "Suresh"],
  },

  contactNumber: {
    type: String,
    required: true,
  },

  vehical: {
    type: String,
    required: true,
    enum: ["truck", "train", "bus"],
  },

  vehicalRegNumber: {
    type: String,
    required: true,
    enum: ["112", "227", "225", "229", "3000", "2929", "247", "657"],
  },

  from: {
    type: String,
    required: true,
    enum: ["mumbai", "pune", "nagpur", "rahuri"],
  },

  to: {
    type: String,
    required: true,
    enum: ["mumbai", "pune", "nagpur", "rahuri"],
  },
 
},{timestamps:true});

const Supplier = model("Supplier", supplierSchema);

export default Supplier;