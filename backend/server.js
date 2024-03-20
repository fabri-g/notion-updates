// server.js
require("dotenv").config()
const express = require("express")
const connectDatabase = require('./config/database.config'); 

// Database connection
connectDatabase();

const app = express()

// Routes
const databaseRoutes = require('./routes/databaseRoutes');
const gptRoutes = require('./routes/gptRoutes');

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json

// Use routes
app.use("/databases", databaseRoutes);
app.use("/gpt", gptRoutes);

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})