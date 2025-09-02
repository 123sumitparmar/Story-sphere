import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema with email validation, hashed password, and unique constraints
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Trim whitespace from name
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address' ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Password must be at least 6 characters long'], // Ensure password length
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields automatically
  }
);

// Password hashing middleware before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Method to compare password when logging in
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

const User = mongoose.model('User', userSchema);

export default User;

