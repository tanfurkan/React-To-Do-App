import React, { Component } from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {auth} from '../database/dbOperations'

class App extends Component {
    
    componentDidMount(){
        auth.signInAnonymously()
        .then( () => {
        console.log('Logged in as Anonymous!')
        console.log('Your ID:',auth.currentUser.uid)

        }).catch( error => {
        console.log(error.code);
        console.log(error.message);
        });

        auth.onAuthStateChanged( () => {
            console.log('AuthState has changed.')
        })

        auth.onIdTokenChanged( () => {
            console.log('IdToken has changed.')
        })
    }

    componentWillUnmount(){
        console.log(auth.signOutAnonymously())
        console.log('Signed Out')
    }

    render(){
        return (
            <div>
                <h2>React-Firebase To Do App</h2>
                <AddTask />
                <TaskList /> 
                <NotificationContainer/>
            </div>
        );
    }
}
export default App;
