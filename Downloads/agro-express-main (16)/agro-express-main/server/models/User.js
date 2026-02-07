import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    role:{
      type:String,
      required:true,
      default:"user"
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      unique: true,
      required: true,
    },

    address: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
