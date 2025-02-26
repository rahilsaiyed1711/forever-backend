import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import { IAdmin } from '../Interfaces/db.interface';

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Enter a valid mail"]
    },
    password: {
      type: String,
      required: true,
      minlength:[6,"password minimum length is 6"]
    }
  },
  { timestamps: true }
);

const Admin = model<IAdmin>('admin',adminSchema);
export default Admin;


