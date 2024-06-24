// server.js
require("dotenv").config()
const express = require("express")
const cors = require('cors');
const connectDatabase = require('./config/database.config');

// Database connection
connectDatabase();

const app = express()

// Use CORS middleware
app.use(cors());

// Routes
const mainRouter = require('./routes');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Static files
app.use(express.static("public"));

// Use routes
app.use("/", mainRouter);

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})
