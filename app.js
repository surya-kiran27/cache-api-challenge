// external dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// internal dependencies
const getEnvironment = require("./utils/getEnvironment");
const indexRoutes = require("./src/v1/routes/index");
const cacheRoutes = require("./src/v1/routes/cache");

// load environment variables
dotenv.config({
  path: getEnvironment(),
});

//connect to mongo database
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, () => {
  console.info("connection to database established");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
  process.exit(0);
});

// server
const app = express();

// app config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handle routes
app.get("/", indexRoutes);
app.get("/cache", cacheRoutes);

//server init
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
