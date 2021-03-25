import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  let randomLimit = 5;

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if (tasks.length == randomLimit) {
      alert('Excedeu o limite de tasks permitidas, se quiser criar mais, exclua uma existente');
      return;
    }

    let idRandom = Math.ceil(Math.random() * randomLimit);    

    while (tasks.findIndex(task => task.id === idRandom) >= 0) {
      idRandom = Math.ceil(Math.random() * randomLimit);
    }        

    if (newTaskTitle === '') {      
      return;
    }

    let newTask: Task = {
      id: idRandom,
      title: newTaskTitle,
      isComplete: false,
    }    

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    let updateCompleted = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(updateCompleted);
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const taskIndex = tasks.filter(task => task.id !== id);    

    setTasks(taskIndex);
    
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}