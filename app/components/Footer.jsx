import React,{ Component } from 'react'

const Footer = (props) => {
  return (
    <div className='footer'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6 left'>
            <h3>Searchery</h3>
            <p>This is open source app made in lerning purpose. If you have an idea how to improve it please contact with me <a href="mailto:hello@veskelen.pw" >hello@veskelen.pw</a></p>
          </div>
          <div className='col-6 right'>
            <h3>More apps</h3>
            <p><a href='https://github.com/fromtexas'>Here you can find more apps</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
