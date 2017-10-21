import React,{Component} from 'react'
import {connect} from 'react-redux'

import ActiveFilter from 'ActiveFilter'


class ActiveFiltersList extends Component {
  render () {
    const {filterBy} = this.props;
    let filterArr = [];
    const filterKeys = Object.keys(filterBy);


    filterKeys.forEach((objKey) => {
      filterArr = [...filterArr, ...filterBy[objKey]]
    });
    filterArr = filterArr.filter((item) => {
      if(item.property != 'All'){
        return item
      }
    })
    //don't use index as key
    const renderFilters = filterArr.map((filter, index)=>{
      return <ActiveFilter key={index} propKey={filter.key} property={filter.property}/>
    })

    const or = () => {
      if (filterArr.length < 4) {
        return renderFilters
      } else {
        return (
          <li className='filters-stack'>
            filters
            <ul className='list-unstyled'>
              {renderFilters}
            </ul>
          </li>
        )
      }
    }

    return (
      <ul className='filters-list list-inline'>
        {or()}
      </ul>
    )
  }
 }

 export default connect(({filterBy})=>{
   return {
     filterBy
   }
 })(ActiveFiltersList)
