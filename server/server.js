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


app.get ("/students", (req, res) => {
    res.json(students);
});



//create
app.post("/students", async(req, res) =>{
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

//read all
app.post ("/students", async(req, res) =>{
    const students = await Student.find()
    res.json(students)
})

//read one
app.get("/students/:id", async(req, res) => {
    const student = await Student.findById(req.params.id)
    res.json(student)
})

//update
app.put("/students/:id", async(req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(student)
})

//delete
app.delete("/students/:id", async(req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    res.json(student)
})