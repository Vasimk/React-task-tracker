import { useState, useEffect } from "react";
// import { Router ,Route } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import About from "./components/About";

const App = ()=> {

  const [showAddTask,setAddTask] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    const getTasks = async ()=>{
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  },[])

  // fetch all
   const fetchTasks = async ()=>{
      const res = await fetch(' http://localhost:5000/tasks')
      const data = await res.json()
      return data;
    }

    // fetch 
   const fetchTask = async (id)=>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data;
    }

//Delete task
const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method:'DELETE'
    })

    setTasks(tasks.filter((task)=> task.id !== id))
} 

// toggle reminder
const toggleReminder = async (id) => {
  const taskTotoggle = await fetchTask(id);
  const updTask = {...taskTotoggle,reminder:!taskTotoggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method:'PUT',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
    })
    const data = await res.json()

  setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder:data.reminder} : task
  ))
}

// add task
const addTask = async (task)=>{ 
    const res = await fetch(`http://localhost:5000/tasks`,
      {
        method:'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks,data])

  // const id = Math.floor(Math.random()*10000) +1;
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
}

  return (
    <Router>
    <div className="container">
      <Header title='Task tracker' onAdd={() => setAddTask(!showAddTask)} showAdd={showAddTask} />
      <Route path='/' exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Data'}
        </>
      )} />
     <Route path='/about' component={About}/>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
