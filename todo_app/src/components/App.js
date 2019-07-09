import React, { Component } from 'react';
import {NotificationContainer} from 'react-notifications';
import Spinner from 'react-spinkit';
import AddTask from './AddTask';
import TaskList from './TaskList';
import LogList from './LogList';
import {auth} from '../database/dbOperations';
import 'react-notifications/lib/notifications.css';

class App extends Component {
    state = { login : false};

    componentDidMount(){
        auth.signInAnonymously()
        .then( () => {
            this.setState({userReady:true});
            console.log('Logged in as Anonymous!');
            console.log('Your ID:',auth.currentUser.uid);
            this.setState( { login:true});
        }).catch( error => {
            console.log(error.code);
            console.log(error.message);
        });

        auth.onAuthStateChanged( () => {
            console.log('AuthState has changed.');
        });

        auth.onIdTokenChanged( () => {
            console.log('IdToken has changed.');
        });
    }

    componentWillUnmount(){
        console.log(auth.signOutAnonymously());
        console.log('Signed Out');
    }

    render(){
        return (
            <div>
                <h2>React-Firebase To Do App</h2>
                {this.state.login ? (
                    <AddTask />
                )
                :(
                    <div className='spinner'>
                        <Spinner name="circle" />
                    </div>
                )}
                <TaskList /> 
                <LogList />
                <NotificationContainer/>
            </div>
        );
    }
}
export default App;
