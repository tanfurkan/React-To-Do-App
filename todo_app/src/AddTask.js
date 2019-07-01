import React, { Component } from 'react';

class AddTask extends Component {
    state = { inputText : '' }

    onInputChange = (event) => {
        this.setState({ inputText : event.target.value })
    }

    handleKeyPress = event => {
        if(event.key === "Enter"){
            this.addTask();
        }
    }

    addTask = () => {
        console.log('Add Task',this.state.inputText)
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