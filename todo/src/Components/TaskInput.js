import React from 'react';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      input: '',
    };
  }

  // check input and addTask function call from props
  addTask = () => {
    const { input } = this.state;
    if (input) {
      this.props.addTask(input);
      this.setState({input: ''})
    }
  }

  // check press Enter for ADD btn
  handleEnter = e => {
    if (e.key === 'Enter') this.addTask();
  };

  // for change input value
  inputChange = e => {
    this.setState({input: e.target.value});
  }

  render() {
    const { input } = this.state;
    return (
      <div className="task-input">
        <input
          onKeyPress={this.handleEnter}
          onChange={this.inputChange}
          value={input}>
        </input>
        <button onClick={this.addTask}>ADD</button>
      </div>
    );
  }
}

export default TaskInput;
