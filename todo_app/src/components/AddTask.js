import React, { Component } from 'react'
import { addTasktoDatabase } from '../database/dbOperations'

class AddTask extends Component {
    state = { inputText : '' }

    shouldComponentUpdate(newProps) {
        return this.props.target !== newProps.target;
    }

    onInputChange = (event) => {
        this.setState({ inputText : event.target.value })
    }

    handleKeyPress = event => {
        if(event.key === "Enter"){
            this.addTask();
        }
    }

    addTask = () => {
        addTasktoDatabase(this.state.inputText);
        this.setState({inputText : ''});
        this.refs.taskInput.value = '';
    }

    render(){
        return(
            <div>
                <input 
                    type='text'
                    placeholder = "Add Task to the List"
                    className = "addTask-text"
                    onChange = { this.onInputChange }
                    onKeyPress = { this.handleKeyPress }
                    ref = 'taskInput'
                />
                <button onClick = { this.addTask }  className = "addTask-button" > Add Task </button>             
            </div>
        );
    }
}


export default AddTask;