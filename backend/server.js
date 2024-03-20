require("dotenv").config()
const express = require("express")
const app = express()

const { getDatabase } = require('./controllers/database.controller');

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json

app.post("/databases", getDatabase);

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})