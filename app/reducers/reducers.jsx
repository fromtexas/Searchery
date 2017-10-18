export const ticketsReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.task];
    case 'ADD_TASKS':
      return action.tasks;
    case 'REMOVE_TASK':
    const removedFromArr = state.filter((item)=>{
      if(action.id !== item.id) {
        return item
      }
    })
      return removedFromArr;
    case 'EDIT_TASK':
    const editedArr = state.map((task) => {
      if(task.id != action.task.id){
        return task;
      } else {
        return {
          ...task,
          name: action.task.name,
          location: action.task.location,
          info: action.task.info,
          description: action.task.description,
          city: action.task.city,
          completed: action.task.completed,
          completedAt: action.task.completedAt,
          category: action.task.category,
          reward: action.task.reward
        }
      }
    })
      return editedArr;
    default:
      return state;
  }
}

export const sortReducer = (state='createdAt', action) => {
  switch (action.type) {
    case 'START_SORT':
      return  action.sort;
    default:
      return state;
  }
}

export const errorReducer = (state='', action) => {
  switch (action.type) {
    case 'ERROR_MSG':
      return  action.msg;
  default:
      return state;
  }
}



export const serchReducer = (state='', action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      return  action.search;
    default:
      return state;
  }
}

export const loaderReducer = (state=true, action) => {
  switch (action.type) {
    case 'CHANGE_LOADER':
      return  action.isLoading;
    default:
      return state;
  }
}


const filterByState = {
  city:[{key:'city', property:'All'}],
  formatedDate:[{key:'formatedDate', property:'All'}],
  completed:[{key:'completed', property:'All'}],
  category:[{key:'category', property:'All'}]
};
export const filterByReducer = (state=filterByState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      let currentState;
      if (action.property === 'All') {
        currentState = [{key: action.key, property: 'All'}]
      } else {
        currentState = state[action.key];
        currentState = [...currentState, {key:action.key, property: action.property}];
      }
      let arrWithoutDupe = currentState.filter((item, index, self) => self.findIndex((t) => {
        return  t.property === item.property; }) === index);
      if(arrWithoutDupe.length > 1){
      arrWithoutDupe = arrWithoutDupe.filter((item) => {
          if(item.property != 'All'){
            return item;
          }
        })
      }
      let newState = {...state};
      newState[action.key] = arrWithoutDupe;
      return newState
    case 'REMOVE_FILTER':
      const filterRemoved = state[action.key].filter((item) => {
        if (item.property != action.property) {
          return item
        }
      })

      let oldState = {...state};
      let all = [{key:action.key, property:'All'}];
      oldState[action.key] = filterRemoved.length ? filterRemoved : all;
      return oldState;
    default:
      return state;
  }
}


export const authReducer = (state={}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
      uid: action.user.uid,
      email: action.user.email
      } ;
    case 'LOGOUT':
      return {
        uid: undefined,
        email: undefined
      } ;
    default:
      return state;
  }
};
