const state={
city:[{key:'city', property:'moskva'},{key:'city', property:'piter'}],
date:[{key:'formatedDate', property:'sep, 2017'}],
status:[{key:'completed', property:'completed'}],
category:[{key:'category', property:'pets'}]
};

const tasks = [
  {city:'moskva',formatedDate: 'sep, 2017',completed: 'completed',category:'pets'},
  {city:'piter',formatedDate: 'sep, 2018',completed: 'completed',category:'pets'},
];

const filterBy = (tasks) => {
  return (filtValArr) => {
    let tasksArr = [];
    filtValArr.forEach((filtVal) => {
      let filtered = tasks.filter((task) => {
        if(task[filtVal.key] === filtVal.property || filtVal.property === 'All'){
          return task
        }
      });
      tasksArr = [...tasksArr, ...filtered]
    });
    return tasksArr;
  }
};

arr = arr.filter((item, index, self) => self.findIndex((t) => {
  return t.place === item.place && t.property === item.property; }) === index)

const firstStep = filterBy(tasks)(state.city);
const secondStep = filterBy(firstStep)(state.date);



// if action.property === 'All'
let currentState = state[action.key];
if(action.property === 'All'){
  currentState = [{key: action.key, property: 'All'}]
}
let newState = {...state};
newState[action.key] = currentState;





//infinite scroll
//i should create counterOffser variable and increase it's value each time i load more tasks

//simplest way to create preloader is create var isLoading in store and change it
