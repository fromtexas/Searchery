import axios from 'axios'


export const noDupe = (arr, key) => {
  var newArr = arr.map((item) => item[key].toLowerCase());
  var arrWithoutDupe = Array.from(new Set(newArr));
  return arrWithoutDupe
}

export const getPlace = (input) => {

  const encodedLocation = input.trim().replace(/\s+/g, '-').toLowerCase();
  const places = 'https://api.teleport.org/api/urban_areas/';
  const requestUrl = `${places}slug:${encodedLocation}/images/`;

  return axios.get(requestUrl).then((res) => {
      return res.data;
    }, (err) => {
      return null
    }
    ).catch((error) => {
      throw new Error(error);
    })
}



const searchTasks = (tasks, searchText) => {
 return  tasks.filter((item) => {
    if((item.name.toLowerCase()).indexOf(searchText) != -1){
        return item;
      }
  })
}





const sortArr = (tasks, sortVal) => {
  return tasks.sort((a, b) => (b[sortVal]).toString().localeCompare((a[sortVal]).toString()))
}




const filterBy = (tasks) => {
  return (filtValArr) => {
    let tasksArr = [];
    filtValArr.forEach((filtVal) => {
      let filtered = tasks.filter((task) => {
        if(task[filtVal.key].toLowerCase() === filtVal.property.toLowerCase() || filtVal.property === 'All'){
          return task
        }
      });
      tasksArr = [...tasksArr, ...filtered]
    });
    return tasksArr;
  }
};



export const composeFilter = (tasks, searchText, city, category, formatedDate,  completed, sortVal) => {
  let rerender = searchTasks(tasks, searchText);
  rerender = sortArr(rerender, sortVal);
  rerender = filterBy(rerender)(completed);
  rerender = filterBy(rerender)(formatedDate);
  rerender = filterBy(rerender)(category);
  rerender = filterBy(rerender)(city);

  return rerender
}
