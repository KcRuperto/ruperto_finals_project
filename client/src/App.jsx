import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/students";
const initialForm = { name: "", course: "", age: "" };

function App() {
  const [form, setForm] = useState(initialForm);
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // READ
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE, depending on editingId
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...form, age: Number(form.age) };

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, data);
      } else {
        await axios.post(API, data);
      }
      setForm(initialForm);
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // Load a student into the form
  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      course: student.course,
      age: student.age,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" required name="name" value={form.name} onChange={handleChange} />
        <br />

        <label>Course: </label>
        <input type="text" required name="course" value={form.course} onChange={handleChange} />
        <br />

        <label>Age: </label>
        <input type="number" required name="age" value={form.age} onChange={handleChange} />
        <br />

        <button type="submit">{editingId ? "Update Student" : "Add Student"}</button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        )}
      </form>

      <br />

      {students.length === 0 ? (
        <p>No student yet.</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;