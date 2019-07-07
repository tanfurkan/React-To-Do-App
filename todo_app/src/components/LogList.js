import React, { Component } from 'react';
import Log from './Log';
import { db, auth} from '../database/dbOperations';


class LogList extends Component {
    constructor(props){
        super(props);
        this.state = { ListofLogs : [], userLogin : false }; 
        this.dbLogRef = db.ref();
    }
    
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.setState( { userLogin : true });
                const userLog = this.dbLogRef.child('logs').child(auth.currentUser.uid);
                userLog.on('value', snap => {
                    const allLogs = snap.val();
                    let ListofLogs = [];
                    if(allLogs){
                        snap.forEach(child => {
                            let log = { id: child.key, task_name: child.val().task_name, action: child.val().action, time:child.val().time};
                            ListofLogs.unshift(log);
                          }); 
                    }
                    this.setState({ListofLogs});
                });
            }
        });
    }

    componentWillUnmount(){
        this.state.dbLogRef.off();
    }

    render(){
        let returnLogList = null; 
        if(!this.state.userLogin){
            returnLogList = (	
                <tr>
                    <td colSpan={3}>No User Found</td>
                </tr>);
        }
        else{
            if(this.state.ListofLogs.length < 1){
                returnLogList = (	
                    <tr>
                        <td colSpan={3}>No Log Found</td>
                    </tr>);
            }
            else if(this.state.userLogin && this.state.ListofLogs.length>0){
                returnLogList = ( this.state.ListofLogs.map(log => (
                    <Log key={log.id} log={log} />
                )));
            }
            else{
                returnLogList =(	
                <tr>
                    <td colSpan={3}>Unexpected Condition</td>
                </tr>);
            }

        }
        
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
                        {returnLogList}
					</tbody>
				</table> 
          	</div>
    	);

  	}




}


export default LogList;