require("dotenv").config()
const express = require("express")
const app = express()

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_KEY });

app.use(express.static("public"))
app.use(express.json()) // for parsing application/json

app.post("/databases", async (req, res) => {
    const databaseId = process.env.NOTION_DATABASE_ID;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})