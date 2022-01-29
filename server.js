require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const decodeIDToken = require('./middlewares/authenticateToken');
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(decodeIDToken);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/portal",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const path = require("path");

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});