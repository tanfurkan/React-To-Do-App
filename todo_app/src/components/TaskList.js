import React, { Component } from 'react';
import Task from './Task';
import {getDatabaseRef} from '../database/dbOperations';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = { ListofTasks : [] };
        this.dbTaskRef = getDatabaseRef(['tasks']); 
    }

    componentDidMount(){
        
        this.dbTaskRef.on('child_added', snap => {
            let task = { id: snap.key, task_name: snap.val().task_name, isCompleted: snap.val().isCompleted, time: snap.val().time};
            let ListofTasks = this.state.ListofTasks;
            ListofTasks.push(task);
            this.setState({ListofTasks});
        });

        this.dbTaskRef.on('child_removed', snap => {
            let ListofTasks = this.state.ListofTasks;
            for(var i=0; i < ListofTasks.length; i++) {
              if(ListofTasks[i].id === snap.key){
                ListofTasks.splice(i, 1);
              }
              this.setState({ ListofTasks });
            }
        });

        this.dbTaskRef.on("child_changed", snap => {
            let ListofTasks = this.state.ListofTasks;
            for(var i=0; i < ListofTasks.length; i++) {
                if(ListofTasks[i].id === snap.key){
                    let task = { id: snap.key, task_name: snap.val().task_name, isCompleted: snap.val().isCompleted, time: snap.val().time};
                    ListofTasks[i]= task;
                    this.setState({ListofTasks});
                    break;
                }
            }
        });

    }

    componentWillUnmount(){
        if(this.dbTaskRef){
            this.dbTaskRef.off();
        }
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
		);
	}
}

export default TaskList; 

