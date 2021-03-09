import React from 'react';
import Task from './Components/Task.js';
import TaskInput from './Components/TaskInput.js';

//for use cookie
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);


    const { cookies } = props;

    //if no cookies
    if(!cookies.get('todo-tasks')) {
      cookies.set(
        'todo-tasks',
        [{ id: 0, title: "Task", done: false }, ],
        { path: '/', maxAge: 86400}
      )
    }


    // initial state
    // get cookies
    this.state = {
      tasks: cookies.get('todo-tasks')
    }
  }

  // addTask to state
  addTask(task) {
    this.setState({ tasks: [
      ...this.state.tasks,
      {
        id: this.state.tasks.length !== 0 ? this.state.tasks.length + 1 : 0,
        title: task,
        done: false,
      }
    ]})
  }

  // done task
  doneTask (id) {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let {tasks} = state;
      tasks[index].done = true;
      return tasks;
    })
  }

  // delete task from state
  deleteTask (id) {
    this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
  }


  //set cookies
  componentDidUpdate(prevProps) {
    const { cookies } = this.props;

    if(this.props === prevProps) {
      cookies.set('todo-tasks', this.state.tasks, { path: '/' , maxAge: 86400});
    }
  }

  render () {
    const { tasks } = this.state;

    // sorting completed and active tasks
    const activeTasks = tasks.filter(task => !task.done);
    const doneTasks = tasks.filter(task => task.done);

    return (
      <div>
      <h1 className="todo">TODO APP</h1>
      <div className="App">
        <TaskInput addTask={v => this.addTask(v)}></TaskInput>
        <div className="tasks">
        { tasks.length === 0
          ?
          <p style={{textAlign: "center", fontSize: "18px", fontWeight: "500"}}>No tasks</p>
          :
          [...activeTasks, ...doneTasks].map(task => (
            <Task
              doneTask={() => this.doneTask(task.id)}
              deleteTask={() => this.deleteTask(task.id)}
              task={task}
              key={task.id}
            >
            </Task>
          ))
        }
        </div>
      </div>
      </div>
    )
  }
}

export default withCookies(App);
