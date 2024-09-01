import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  location: String,
  phone: String,
  email: String,
  password: String,
  photo: String,
  accountExpiration: String,

  role: {
    type: String,
    enum: ["master-admin", "admin", "user"],
    default: "user", // Default role for new users
  },
});

const User = model("User", userSchema);

// Create an index on the 'location' field and handle the promise
User.collection.createIndex({ location: 1 })
  .then(() => {
    console.log("Index created successfully");
  })
  .catch((error) => {
    console.error("Error creating index:", error);
  });

export default User;
