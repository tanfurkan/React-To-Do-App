import React, { Component } from 'react'
import Log from './Log'
import { db, auth} from '../database/dbOperations'


class LogList extends Component {
    state = { ListofLogs : [], dbLogRef : db.ref() };

    componentDidMount(){
        const  userLog = this.state.dbLogRef.child('logs').child(auth.currentUser.uid)
        userLog.on('value', snap => {
            const allLogs = snap.val();
            let ListofLogs = [];
            if(allLogs){
                snap.forEach(child => {
                    let log = { id: child.key, task_name: child.val().task_name, action: child.val().action, time:child.val().time}
                    ListofLogs.unshift(log);   
                  }) 
            }
            this.setState({ListofLogs})
        })

    }

    componentWillUnmount(){
        this.state.dbLogRef.off()
    }

    render(){
		return(
        	<div> 
				<h3>Event Logs</h3>
				<hr />
				<table>
					<thead>
						<tr>
							<th>Task Name</th>
							<th>Action</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{this.state.ListofLogs.length > 0 ? (
							this.state.ListofLogs.map(log => (
                                <Log key={log.id} log={log} />
							))
						) : (
							<tr>
								<td colSpan={3}>No Log Found</td>
							</tr>
						)}
					</tbody>
				</table> 
          	</div>
    	)

  	}




}


export default LogList;