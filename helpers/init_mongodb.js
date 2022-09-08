const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(console.log);

mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose;
