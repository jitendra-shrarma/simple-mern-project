const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {origin: "http://localhost:3000"};
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());                         // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    }
);

require("./app/routes/user.routes")(app);

app.get("/", (req, res) => {
    res.json({ message: "User RestAPI."});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});