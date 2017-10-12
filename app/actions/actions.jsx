import firebase, {firebaseRef} from 'firebaseConf'
import moment from 'moment'

export const startAddTask = (taskVal) => {
  return (dispatch, getState) => {
    //var uid = getState().auth.uid;
    const createdAt = moment().unix();
    const formatedDate = moment.unix(createdAt).format('MMMM, YYYY');
    const task =
      {
        ...taskVal,
        completed: 'Not completed',
        createdAt,
        completedAt: null,
        formatedDate
       };
    const taskRef = firebaseRef.child(`tasks`).push(task);
    return taskRef.then(() => {
      dispatch(addTask({
        ...task,
        id: taskRef.key
      }))
    })
  }
};

export const startGetTasks = () => {
  return (dispatch, getState) => {
      //var uid = getState().auth.uid;
      const taskRef = firebaseRef.child(`tasks`);
      return taskRef.once('value').then((snapshot) => {
        const tasksVal = snapshot.val() || {};
        let tasks = [];
        const tasksKeys = Object.keys(tasksVal);
        tasksKeys.forEach((id) => {
          tasks.push({
            id,
            ...tasksVal[id]
          });
        });
        dispatch(addTasks(tasks))
      })
  }
};

//requre to think about this shit. also need more tests
//countoffset should be more presize
//FUCKEN SHIT BELLOW
// export const startGetTasks = () => {
//   return (dispatch, getState) => {
//
//       let tasksFromStore = getState().tickets.length;
//       const taskRef = firebaseRef.child(`tasks`);
//
//       return taskRef.once('value').then((snapshot) => {
//         const tasksVal = snapshot.val() || {};
//         let tasks = [];
//         const tasksKeys = Object.keys(tasksVal);
//         tasksKeys.forEach((id) => {
//           tasks.push({
//             id,
//             ...tasksVal[id]
//           });
//         });
//         if (tasksFromStore < tasks.length) {
//           let taskOffset = tasks.length - tasksFromStore;
//           if (taskOffset >= 5) {
//             taskOffset = 5;
//           }
//           tasks = tasks.slice(tasksFromStore, (taskOffset + tasksFromStore));
//
//           console.log(taskOffset);
//           dispatch(addTasks(tasks));
//         }
//       })
//   }
// };














export const startSort = (sort) => ({
  type: 'START_SORT',
  sort
});




export const startEditTask = (task) => {
  return (dispatch, getState) => {
    var taskRef = firebaseRef.child(`tasks/${task.id}`);

    return taskRef.update(task).then(()=>{
      dispatch(editTask(task))
    })
  }
}

export const startCreatingUser = (userObj) => {
  return (dispatch, getState) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.pass).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  }
}


export const startLogin = (userObj) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.pass).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  }
}

export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then((res) => {
      console.log('logout');
    }, (err) => {
      console.log(err);
    })
  }
}

export const removeTask = (id) => {
  return {
    type: 'REMOVE_TASK',
    id
  }
};

export const startRemovingTask = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const taskRef = firebaseRef.child(`tasks/${id}`);
    return taskRef.once('value').then((snapshot) => {
      const tasksVal = snapshot.val() || {};
      if(uid === tasksVal.uid) {
        return taskRef.remove().then(() => {
          dispatch(removeTask(id))
        })
      }
    })

  }
};

export const login = (user) => {
  return {
    type: 'LOGIN',
    user
  }
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
};


export const addTasks = (tasks) => {
  return {
    type:'ADD_TASKS',
    tasks
  }
}


export var addTask = (task) => {
  return {
    type:'ADD_TASK',
    task
  };
}

export var getSearch = (search) => {
  return {
    type: 'GET_SEARCH',
    search
  }
}

export const filterBy = (key, property) => {
  return {
    type: 'UPDATE_LIST',
    key,
    property
  }
}

export const removeFilter = (key, property) => {
  return {
    type: 'REMOVE_FILTER',
    key,
    property
  }
}

export const editTask = (task) => {
  return {
    type: 'EDIT_TASK',
    task
  }
}

export const changeLoader = (isLoading) => {
  return {
    type: 'CHANGE_LOADER',
    isLoading
  }
}
