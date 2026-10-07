const express = require('express');

const app = express();

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