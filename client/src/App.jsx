import {useState, useEffect} from 'react';
import axios from 'axios';

const intialForm = {
  name: "",
  course: "",
  age: ""
}

function App () {
const [form, setForm] = useState(intialForm);
const [isEditing, setIsEditing] = useState(false);
const [editForm, setEditForm] = useState(intialForm);
const [students, setStudents] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/students')
  .then((response) => {
    setStudents(response.data)
  });
}, []);

const handleChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    });
  }

const handleChangeEdit =(e) => {
  setEditForm({
    ...editForm, [e.target.name]: e.target.value
  });
}

const handleSubmit = (e) => {
  e.preventDefault()

  try{
    fetch("http://localhost:5000/students", {
      method: "POST",
      HEADERS: {"Content-Type": "Application/json"},
      body: JSON.stringify({...form, age: Number(form.age)})
    })
    setForm(intialForm)
    const additional = students.map((student)  => s._id, i==d)
    setStudents(additional)
  }catch (error){
    console.log(error)
  }
}

const handleEdit = (student) =>{
  setIsEditing(true)
  setEditForm(student)
}

const handleSubmitEdit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:5000/students/${editForm._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...editForm, age: Number(editForm.age)})
    });

    const updated = await response.json();
    setStudents((prev) =>
      prev.map((student) =>
        student._id === editForm._id ? updated : student
      )
    );
    setIsEditing(false);
    setEditForm(intialForm);
  } catch (error) {
    console.log(error);
  }
}

const handleDelete = async(id)=> {
  fetch(`http://localhost:5000/students/${id}`, {
    method: "DELETE"
  })
  const remaining = students.filter((student) => student._id !== id)
  setStudents(remaining)
}


  return (
    <div>
      <h1>Student Management System</h1>
      <h2>Add Student</h2>

      <form onsubmit = {handleSubmit}>
        <h1>Student Management System</h1>

          <h2>Add Student</h2>
          <input type="text" required name="name" onChange={handleChange} value={form.name} />

          <br></br>

          <input type="text" required name="course" onChange={handleChange} value={form.course} />

          <br></br>

          <input type="number" required name="age" onChange={handleChange} value={form.age} />

          <br></br>

          <button type="submit">Add Student</button>
      </form>

    <br></br>
    <p>Name: </p>
    <p>Course: </p>
    <p>Age: </p>

    <p>No student yet.</p>
    </div>
  );
}

export default App;