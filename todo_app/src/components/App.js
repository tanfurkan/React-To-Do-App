import React, { Component } from 'react'
import AddTask from './AddTask'

class App extends Component {
    render(){
        return (
            <div>
                <h2>React-Firebase To Do App</h2>
                <AddTask />
            </div>
        );
    }
}
export default App;
