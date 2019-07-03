import React, { Component } from 'react'
import AddTask from './AddTask'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class App extends Component {
    render(){
        return (
            <div>
                <h2>React-Firebase To Do App</h2>
                <AddTask />
                <NotificationContainer/> 
            </div>
        );
    }
}
export default App;
