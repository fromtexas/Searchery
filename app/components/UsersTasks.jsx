import React, {Component} from 'react'
import UserTask from 'UserTask'

class UsersTasks extends Component {
  render () {
    const {current} = this.props;
    const renderTasks = current.map((task)=>{
      return <UserTask key={task.id} {...task}/>
    })
    return (
      <div className='users-tasks row'>
        {renderTasks}
      </div>
    )
  }
}

export default UsersTasks
