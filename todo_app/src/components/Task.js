import React, { Component } from 'react';
import moment from 'moment';
import { deleteTaskfromDatabase , updateTaskName , updateCheckBox } from '../database/dbOperations';

class Task extends Component  {
    state = { edited_Task : '', editMode:false, isCompleted:this.props.task.isCompleted}
    
    
    shouldComponentUpdate(newProps,nextState) {
        const checkbox = this.props.task.isCompleted !== nextState.isCompleted ;
        const edit_save = this.state.editMode !== nextState.editMode ;
        return checkbox || edit_save ;
    }

    updateTaskText = event => {
        this.setState({ edited_Task : event.target.value });
    }
    
    handleKeyPress = event => {
        if(event.key === "Enter"){
			this.saveTask();
		}
    }

	editTask = () => {
		this.setState({editMode:true});
	}
	
	saveTask = () => {
        const { id , task_name} = this.props.task;
        updateTaskName(id,task_name,this.state.edited_Task);
        this.setState({editMode:false});
	}

	deleteTask = () => {
        const { id , task_name } = this.props.task;
        deleteTaskfromDatabase(id,task_name);
	}
	
	checkChange = () => {
        const { id , task_name, isCompleted} = this.props.task;
        updateCheckBox(id,task_name,!isCompleted);
        this.setState({isCompleted : !isCompleted}); 
    }

	render(){
        const { id , task_name, isCompleted, time} = this.props.task;
           
        return(
			<tr key={id}>
				<td className='Name'>
					<label id={id} className = {isCompleted ? "completed" : "notCompleted"} hidden={this.state.editMode}> {task_name}  </label> 
					<input 
						id={id} 
						ref='editedText'
						type="text" 
						hidden={!this.state.editMode} 
						placeholder={task_name} 
						className = "editTask-text"   
						onChange = { this.updateTaskText }
						onKeyPress = { this.handleKeyPress }
					/> 
				</td>
				<td className='Checkbox'><input type="checkbox" id={id} checked={isCompleted} onChange={this.checkChange}/></td>
				<td className='Buttons'>
					<button className="save-button" onClick={  () => { (window.confirm('Are you sure you wish to change this task?')) ?  this.saveTask() : this.setState({editMode:false}); } } hidden={!this.state.editMode} > Save </button>
					<button className="edit-button" onClick={ this.editTask } hidden={this.state.editMode} > Edit </button>
					<button className="delete-button" onClick={ () => { if (window.confirm('Are you sure you wish to delete this task?'))  this.deleteTask(); } } > Delete </button>
				</td>
				<td className='Time'>{moment(time).calendar()}</td>
			</tr>
		);
	}
}

export default Task;