import useState from 'react';


const [student,setStudents] = useState([]);

useState(() => {
  axios.get('http://localhost:5000/students')
  .then((response) => {
    setStudents(response.data)
  });
})

const handleSubmit = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const course = e.target.course.value;
  const age = e.target.age.value;

  axios.post('http://localhost:5000/students', {
    name,
    course,
    age
  })
  .then((response) => {
    setStudents([...student, response.data]);
  });
}


function App () {
  return (
    <div>
      <form onsubmit = {handleSubmit}>
        <h1>Student Management System</h1>

          <h2>Add Student</h2>

          <input 
          placeholder="Name"
          type="text"
          />

          <br></br>

          <input placeholder="Course"
            type="text"
            />

          <br></br>

          <input 
          placeholder="Age"
          type="number"
          />
      </form>

    <br></br>

    <button type="submit" onClick={handleSubmit}>Add Student</button>

    <h2>Student Lists: </h2>
    <p>{student}</p>

    <p>No student yet.</p>
    </div>
  );
}

export default App;