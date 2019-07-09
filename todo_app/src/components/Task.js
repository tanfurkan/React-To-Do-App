import React, { Component } from 'react';
import moment from 'moment';
import { deleteTaskfromDatabase , updateTaskName , updateCheckBox } from '../database/dbOperations';

class Task extends Component  {
    state = { edited_Task : this.props.task.task_name, editMode:false, isCompleted:this.props.task.isCompleted}
    

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return     this.props.task !== nextProps.task 
                || this.state.editMode !== nextState.editMode 
                || this.state.edited_Task !== nextState.edited_Task;
    }

    updateTaskText = event => {
        this.setState({ edited_Task : event.target.value });
    }
    
    handleKeyPress = event => {
        if(event.key === 'Enter'){
			this.saveTask();
        }
        else if(event.key === 'Esc' || event.key ==='Escape'){
            this.setState({editMode:false});
        }
        event.preventDefault();
    }

	editTask = () => {
		this.setState({editMode:true});
	}
	
	saveTask = () => {
        const { id , task_name} = this.props.task;
        if(task_name !== this.state.edited_Task){
            updateTaskName(id,task_name,this.state.edited_Task.trim())
            .then( () => {} )
            .catch(error => {
                console.log(error);
            });
        }
        this.setState({editMode:false, edited_Task: this.state.edited_Task.trim()});
	}

	deleteTask = () => {
        const { id , task_name } = this.props.task;
        deleteTaskfromDatabase(id,task_name)
        .then( () => {} )
        .catch(error => {
            console.log(error);
        });
	}
	
	checkChange = () => {
        const { id , task_name, isCompleted} = this.props.task;
        updateCheckBox(id,task_name,!isCompleted)
        .then( () => {} )
        .catch(error => {
            console.log(error);
        });
        this.setState({isCompleted : !isCompleted}); 
    }

	render(){
        const { id , task_name, isCompleted, time} = this.props.task;
        if(this.state.editMode){
            window.addEventListener('keyup', this.handleKeyPress);
        }   
        else{
            window.removeEventListener('keyup', this.handleKeyPress);
        } 
        return(
			<tr key={id}>
				<td className='Name'>
					<label id={id} className = {isCompleted ? 'completed' : 'notCompleted'} hidden={this.state.editMode}> {task_name}  </label> 
					<input 
						id={id} 
						type='text' 
						hidden={!this.state.editMode} 
                        className = 'editTask-text'
                        value = {this.state.edited_Task}   
                        onChange = { this.updateTaskText }
					/> 
				</td>
				<td className='Checkbox'><input type='checkbox' id={id} checked={isCompleted} onChange={this.checkChange}/></td>
				<td className='Buttons'>
					<button className='save-button' onClick={  () => { (window.confirm('Are you sure you wish to change this task?')) ?  this.saveTask() : this.setState({editMode:false}); } } hidden={!this.state.editMode} > Save </button>
					<button className='edit-button' onClick={ this.editTask } hidden={this.state.editMode} > Edit </button>
					<button className='delete-button' onClick={ () => { if (window.confirm('Are you sure you wish to delete this task?'))  this.deleteTask(); } } > Delete </button>
				</td>
				<td className='Time'>{moment(time).calendar()}</td>
			</tr>
		);
	}
}

export default Task;