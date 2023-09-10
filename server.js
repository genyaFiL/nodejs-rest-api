import app from "./app.js";
import mongoose from "mongoose";
//genyafil
//
//bKUKyIZjdynnIAxI
const DB_HOST =
  "mongodb+srv://genyfil:bKUKyIZjdynnIAxI@cluster0.6stikgv.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
