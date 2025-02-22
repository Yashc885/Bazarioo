import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define User Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

// Define User Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
