import React, { Component } from 'react'
import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import { deleteTaskfromDatabase , updateTaskName , updateCheckBox } from '../database/dbOperations'

class Task extends Component  {
    state = { edited_Task : '', editMode:false}

    updateTask = event => {
        this.setState({ edited_Task : event.target.value });
    }
    
    handleKeyPress = event => {
        if(event.key === "Enter"){
			this.saveTask();
		}
    }

	editTask = () => {
		this.setState({editMode:true})
	}
	
	saveTask = () => {
        this.setState({editMode:false})
	}

	deleteTask = () => {

	}
	
	checkChange = () => {

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
						onChange = { this.updateTask }
						onKeyPress = { this.handleKeyPress }
					/> 
				</td>
				<td className='Checkbox'><input type="checkbox" id={id} checked={isCompleted} onChange={this.checkChange}/></td>
				<td className='Buttons'>
					<button className="save-button" onClick={ this.saveTask } hidden={!this.state.editMode} > Save </button>
					<button className="edit-button" onClick={ this.editTask } hidden={this.state.editMode} > Edit </button>
					<button className="delete-button" onClick={ this.deleteTask } > Delete </button>
				</td>
				<td className='Time'>{moment(time).calendar()}</td>
			</tr>
		);
	}
}

export default Task;