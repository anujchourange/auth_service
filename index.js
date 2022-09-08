const express = require("express");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_mongodb");

const AuthRoute = require("./routes/Auth");
const UserRoute = require("./routes/User");

const app = express();

app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/", UserRoute);
app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
