import React, {Component} from 'react'
import moment from 'moment'

class Log extends Component {
    shouldComponentUpdate(newProps) {
        return this.props.target !== newProps.target;
    }

	render(){
        const { id, task_name, action, time} = this.props.log

        return(
            <tr key={id}>
                <td className='log_task'> {task_name} </td>
                <td className='log_action'> {action} </td>
                <td className='log_time'> {moment(time).calendar()} </td>
            </tr>
		);
	}
}

export default Log;