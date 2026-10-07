const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
console.log("MongoDB connection error:", error);
})


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

let students = [
    {
        id: 1,
        name: "Saev Worapong",
        course: "BSIT",
        age: 23
    }
];

app.get ("/students", (req, res) => {
    res.json(students);
});