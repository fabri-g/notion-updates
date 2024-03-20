// server.js
require("dotenv").config()
const express = require("express")
const connectDatabase = require('./config/database.config'); 

connectDatabase();

const app = express()

const { getDatabase, getSavedDatabase } = require('./controllers/database.controller');
const { getProjectUpdateReport } = require('./controllers/gptController');

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json

app.post("/databases", getDatabase);
app.get("/databases/:databaseId", getSavedDatabase);
app.post("/gpt-analysis", getProjectUpdateReport);

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})