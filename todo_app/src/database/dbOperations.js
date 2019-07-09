import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import moment from 'moment';
import firebaseConfig from './config';
import { NotificationManager} from 'react-notifications';

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const auth = firebase.auth();
const MAX_INPUT_LENGTH = 150;

export const addTasktoDatabase = (nameOfTask) => {
    //moment(db_time_stamp).format('YYYY-MM-DD THH:mm:ss Z') //   2019-07-02 T11:57:16 +03:00  
    return new Promise ( (resolve,reject) => { 

        const time = moment().toISOString(); // 2019-07-02T08:57:16.434Z
        const dbRef = db.ref(); 

        if(!dbRef){reject(Error('addTasktoDatabase failed. Can not get dbRef'));}

        if(nameOfTask.length < 1){

            addLogtoDatabase('NULL','Invalid Add Attempt',time)
            .then( response => {
                reject('addTasktoDatabase Failed Invaild Taskname --> ' + response);
            })
            .catch( error => {
                reject(Error('addTasktoDatabase failed --> ' + error.message));
            });
            NotificationManager.error('Failed to Add the Task', 'Can not be Empty', 3000);

        } else if(nameOfTask.length < MAX_INPUT_LENGTH){

            dbRef.child('tasks').push({
                task_name: nameOfTask,
                isCompleted: false,
                time: time
            }, error => {
                if(error){
                    reject(Error('addTasktoDatabase push failed --> '+error.message));
                }
                else{
                    addLogtoDatabase(nameOfTask,'ADD',time)
                    .then( response => {
                        resolve('addTasktoDatabase Succeed -->'+response);
                        NotificationManager.success('Task Successfully added','', 3000);
                    })
                    .catch( error => {
                        reject(Error('addTasktoDatabase failed -->'+ error.message));
                    });
                }
            });
        } else {
            NotificationManager.error('Task name is too long ','MAX:'+MAX_INPUT_LENGTH,3000);
            reject('Task name is too long.');
        }

        dbRef.off();
    });
};

export const deleteTaskfromDatabase = (taskID,nameOfTask) => {

    return new Promise ( (resolve,reject) => { 

        const time = moment().toISOString(); // 2019-07-02T08:57:16.434Z
        const dbRef = db.ref();

        if(dbRef){
            dbRef.child('tasks').child(taskID).remove()   
            .then( () => {
                addLogtoDatabase(nameOfTask,'DELETE',time)
                .then( response => {                                
                    resolve('deleteTaskfromDatabase Succeed -->'+response);
                    NotificationManager.warning('Task Successfully deleted','', 3000);                    
                })
                .catch( error => {
                    reject(Error('deleteTaskfromDatabase failed -->'+error.message));
                });

            })
            .catch( error => {
                reject(Error('deleteTaskfromDatabase failed --> ' + error.message));
            });
        }
        else{
            reject(Error('deleteTaskfromDatabase failed. Can not get dbRef'));
        }

        dbRef.off();
    });
};

export const updateTaskName = (taskID,oldTaskName,newTaskName) => {

    return new Promise ( (resolve,reject) => { 

        const log_text = 'Task ' + oldTaskName + ' changed to ' + newTaskName;
        const time = moment().toISOString(); // 2019-07-02T08:57:16.434Z
        const dbRef = db.ref(); 

        if(dbRef){
            if(newTaskName.length < 1){
                addLogtoDatabase('NULL','Invalid updateTask Attempt',time)
                .then( response => {
                    reject('updateTaskName Failed Invaild Taskname --> ' + response);
                })
                .catch( error => {
                    reject(Error('updateTaskName failed --> ' + error.message));
                });
                NotificationManager.error('Task name is not change.','',3000);
            }
            else if(newTaskName.length < MAX_INPUT_LENGTH){
                dbRef.child('tasks').child(taskID).update({
                    task_name: newTaskName,
                    time : time
                }, error => {
                    if(error){
                        reject(Error('TaskName update failed.' + error));
                    }
                    else{
                        addLogtoDatabase(log_text,'EDIT',time)
                        .then( response => {                                
                            resolve('updateTaskName Succeed -->' + response);
                            NotificationManager.info('Task Successfully updated','', 3000);                    
                        })
                        .catch( error => {
                            reject(Error('updateTaskName failed -->' + error.message));
                        });
                    }
                });
            }
            else{
                NotificationManager.error('Task name is too long.','MAX:'+MAX_INPUT_LENGTH,3000);
                reject('New task name is too long.'); 
            }
        }
        else{
            reject(Error('updateTaskName failed. Can not get dbRef'));
        }

        dbRef.off();
    });

};

export const updateCheckBox = (taskID,nameOfTask,completed) => {

    return new Promise ( (resolve,reject) => { 

        const log_text = completed ? 'Marked as Completed' : 'Marked as Not Completed'; 
        const time = moment().toISOString(); // 2019-07-02T08:57:16.434Z
        const dbRef = db.ref(); 
    
        if(dbRef){
            dbRef.child('tasks').child(taskID).update({
                isCompleted : completed,
                time : time
            }, error => {
                if(error){
                    reject(Error('Checkbox update failed' + error));
                }
                else {
                    addLogtoDatabase(nameOfTask,log_text,time)
                    .then( response => {                                
                        resolve('updateTaskName Succeed -->' + response);
                        NotificationManager.info('Task Successfully updated','', 3000);                    
                    })
                    .catch( error => {
                        reject(Error('updateCheckBox failed -->' + error.message));
                    });
                }
            });
        }
        else{
            reject(Error('updateCheckBox failed. Can not get dbRef'));
        }

        dbRef.off();
    });
};


export const addLogtoDatabase = (nameOfTask,typeOfAction,time_stamp) => {

    return new Promise ( (resolve,reject) => { 

        const currentUserID = auth.currentUser.uid;
        const dbRef = db.ref();

        if(dbRef){
            dbRef.child('logs').child(currentUserID).push({
                task_name: nameOfTask,
                action : typeOfAction,
                time : time_stamp
            }, error => {
                if(error){
                    reject('addLogtoDatabase failed.' + error.message);
                }
                else{
                    resolve('Log Successfully added');
                }
            });
        }
        else{
            reject(Error('addLogtoDatabase failed. Can not get dbRef'));
        }

        dbRef.off();
    });
};


export const getDatabaseRef = (childList) => {

    let location = '/';
    childList.forEach(child => {
        location = location + '/' + child;
    });

    const dbRef = db.ref(location);
    if(dbRef){
        return dbRef;
    }
    throw(Error('Can not get dbRef'));
};
