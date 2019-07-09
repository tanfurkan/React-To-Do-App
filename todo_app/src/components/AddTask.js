import React, { Component } from 'react';
import { addTasktoDatabase } from '../database/dbOperations';
import { Button } from 'react-bootstrap';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state= { inputText : '' };
    }
    
    onInputChange = (event) => {
        this.setState({ inputText : event.target.value });
    }

    handleKeyPress = event => {
        if(event.key === 'Enter'){
            this.addTask();
        }
    }

    addTask = () => {
        addTasktoDatabase(this.state.inputText.trim())
        .then( () => {
            this.setState({inputText : ''});
        })
        .catch(error => {
            console.log(error);
        });
        
    }

    render(){
        return(
            <div>
                <input 
                    type='text'
                    placeholder = 'Add Task to the List'
                    className = 'addTask-text'
                    onChange = { this.onInputChange }
                    onKeyPress = { this.handleKeyPress }
                    value = { this.state.inputText }
                />
                <Button size='lg' variant='success' onClick = { this.addTask }  className = 'addTask-button' > Add Task </Button>             
            </div>
        );
    }
}


export default AddTask;