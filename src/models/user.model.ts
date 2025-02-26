import { Schema, model } from 'mongoose';
import {isEmail} from "validator";
import { IUser } from '../Interfaces/db.interface';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,

    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const User = model('user', userSchema);

export default User;
