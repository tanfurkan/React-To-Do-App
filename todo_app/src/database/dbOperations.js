import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import {firebaseConfig} from './config'
import { NotificationManager} from 'react-notifications';

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();

export const addTasktoDatabase = (nameOfTask) => {
    //moment(db_time_stamp).format('YYYY-MM-DD THH:mm:ss Z') //   2019-07-02 T11:57:16 +03:00  

    const time = moment().toISOString() // 2019-07-02T08:57:16.434Z
    const dbRef = db.ref(); 

    if(nameOfTask.length > 0){
        dbRef.child('tasks').push({
            task_name: nameOfTask,
            isCompleted: false,
            time: time
        });

        NotificationManager.success('Task Successfully added','', 3000);
        addLogtoDatabase(nameOfTask,'ADD',time)

    } else {

        NotificationManager.error('Failed to Add the Task', 'Can not be Empty', 3000)
        addLogtoDatabase('NULL','Invalid Add Attempt',time)
      //  alert("Task Description can not be empty.");
    }

    dbRef.off();
    
}

export const deleteTaskfromDatabase = (taskID,nameOfTask) => {
    const time = moment().toISOString() // 2019-07-02T08:57:16.434Z
    const dbRef = db.ref(); 

    dbRef.child('tasks').child(taskID).remove();

    NotificationManager.warning('Task Successfully deleted','', 3000);    
    addLogtoDatabase(nameOfTask,'DELETE',time);

    dbRef.off();

}

export const updateTaskName = (taskID,oldTaskName,newTaskName) => {

    const log_text = 'Task ' + oldTaskName + ' changed to ' + newTaskName;
    const time = moment().toISOString(); // 2019-07-02T08:57:16.434Z
    const dbRef = db.ref(); 

    dbRef.child('tasks').child(taskID).update({
        task_name: newTaskName,
        time : time
    });

    NotificationManager.info('Task Successfully updated','', 3000);
    addLogtoDatabase(log_text,'EDIT',time);

    dbRef.off();

}

export const updateCheckBox = (taskID,nameOfTask,completed) => {

    const log_text = completed ? 'Marked as Completed' : 'Marked as Not Completed' 
    const time = moment().toISOString(); // 2019-07-02T08:57:16.434Z
    const dbRef = db.ref(); 

    dbRef.child('tasks').child(taskID).update({
        isCompleted : completed,
        time : time
    });
    
    NotificationManager.info('Task Successfully updated','', 3000);
    addLogtoDatabase(nameOfTask,log_text,time);

    dbRef.off();

}


export const addLogtoDatabase = (nameOfTask,typeOfAction,time_stamp) => {

    const dbRef = db.ref(); 

    dbRef.child('logs').push({
        task_name: nameOfTask,
        action : typeOfAction,
        time : time_stamp
    });

    dbRef.off();

}
