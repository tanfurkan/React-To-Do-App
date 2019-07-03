import React, { Component } from 'react'
import Task from './Task'
import {db} from '../database/dbOperations'

class TaskList extends Component {
    state = { ListofTasks : [], dbTaskRef : db.ref().child('tasks') };

    componentDidMount(){
        this.state.dbTaskRef.on('child_added', snap => {
            let task = { id: snap.key, task_name: snap.val().task_name, isCompleted: snap.val().isCompleted, time: snap.val().time }
            let ListofTasks = this.state.ListofTasks;
            ListofTasks.push(task);
            this.setState({ListofTasks})
        })
    }

    componentWillUnmount(){
        this.state.dbTaskRef.off()
    }

	render(){

		return(
			<div> 
				<h3>Task List</h3>
				<hr />
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Completed</th>
						<th>Actions</th>
						<th>Last Edit</th>
					</tr>
					</thead>
					<tbody>
					{this.state.ListofTasks.length > 0 ? (
						this.state.ListofTasks.map(task => ( 
							<Task key={task.id} task={task} />
						))
					) : (
						<tr>
							<td colSpan={4}>No Task Found</td>
						</tr>
					)}
					</tbody>
				</table> 
			</div>
		)
	}
}

export default TaskList; 

