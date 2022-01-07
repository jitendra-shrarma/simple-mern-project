const express = require("express");
const app = express();
const dbConfig = require("./connection");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.db_url;


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected");
    })
    .catch(err => {
        console.log("Cannot connect", err);
        process.exit();
    }
);


app.get("/", (req, res) => {
    res.json({ message: "working api"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});