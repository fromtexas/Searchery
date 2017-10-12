import React,{Component} from 'react'


class FiltersStack extends Component {
  render () {
    const {filters} = this.props;
    const renderHiden = filters.map((item, index)=>{
      return (
        <li key={index}>{item.property}</li>
      )
    });
    return (
      <li className='filters-stack'>
        filters
        <ul className='list-unstyled'>
          {renderHiden}
        </ul>
      </li>
    )
  }
}

export default FiltersStack
