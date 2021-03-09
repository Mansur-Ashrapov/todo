import React from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const Task = props => {

  // universal btn
  const ActionBtn = () =>
  <div  className="action-btn">
    {props.task.done
      ? <p onClick={props.deleteTask}> <AiOutlineClose /> </p>
      : <p onClick={props.doneTask}> <AiOutlineCheck /> </p>
    }
  </div>

  // change className if this task done 
  const clasName = 'task ' + (props.task.done ? 'task-done' : '')

  return (
    <div className={clasName}>
      <p> {props.task.title} </p>
      <ActionBtn />
    </div>
  )
}

export default Task;
