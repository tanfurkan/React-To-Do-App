import React, { Component } from 'react';
import Log from './Log';
import {auth, getDatabaseRef} from '../database/dbOperations';


class LogList extends Component {
    constructor(props){
        super(props);
        this.state = { ListofLogs : [], userLogin : false }; 
        this.dbRef = null;
    }
    
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.setState( { userLogin : true });
                try{
                    this.dbRef = getDatabaseRef(['logs',auth.currentUser.uid]);
                    this.dbRef.on('child_added', snap => {
                        let log = { id: snap.key, task_name: snap.val().task_name, action: snap.val().action, time:snap.val().time};
                        let ListofLogs = this.state.ListofLogs;
                        ListofLogs.unshift(log);
                        this.setState({ListofLogs});
                    });
                }catch(error){
                    console.log(error.message);
                }

            }
        });
    }

    componentWillUnmount(){
        if(this.dbRef){
            this.dbRef.off();
        }
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