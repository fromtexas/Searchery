import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startCreatingUser, startLogin} from 'actions'

class Registration extends Component {
    
  check (txt, key) {
    const node = document.createElement('LABEL');
    node.className = 'warning';
    const textNode = document.createTextNode(txt);      
    node.appendChild(textNode); 
    this.refs[key].parentElement.appendChild(node);  
  }
    
  remove (key) {
    const warn = this.refs[key].parentElement.querySelector('.warning');
        if (warn){
            warn.remove()
            }
  }
  
  bold (e) {
      const nodes = this.refs.links.querySelectorAll('a');
      if (e.target && e.target.nodeName == 'A') {
          [...nodes].forEach((item) => {
            item.style.fontWeight = 600;
          });
          e.target.style.fontWeight = 700;
      }
  }
    
  handleConfirm (e) {
    e.preventDefault();
    const {email, pass, confirmPass, regForm} = this.refs;

    if(email.value){
      this.remove('email');
      console.log('email is valid');
      if(pass.value){
        this.remove('pass');
        if(pass.value === confirmPass.value){
          this.remove('confirmPass');
          this.props.dispatch(startCreatingUser({email: email.value, pass: pass.value}));
          console.log('succes');
          regForm.reset()
        }else {
          this.check('Password is not confirmed!', 'confirmPass')
          console.log('pass is not confirmed');
          confirmPass.focus()
        }
      }else {
        this.check('Password is empty!', 'pass')
        console.log('pass is empty');
        pass.focus()
      }
    }else{
      this.check('Wrong email!', 'email')
      console.log('wrong email');
      email.focus()
    }

  }

  handleLogin (e) {
    e.preventDefault();
    const {email, pass, regForm} = this.refs;
    if(email.value && pass.value){
      this.remove('email');
      this.props.dispatch(startLogin({email: email.value, pass: pass.value}))
      console.log('loggining');
    }else{
      this.check('Email or pass is empty!', 'email')
      console.log('email or pass is empty');
    }

  }
  render () {
    const routePath = () => {
      if(this.props.route.path === 'registration'){
        return (
          <div className="form-group">
            <label>Confirm password</label>
            <input ref='confirmPass' type="password" className="form-control" placeholder="Password"/>
          </div>
        )
      }
    };
    const selectAction = () => {
      if(this.props.route.path === 'registration'){
        return this.handleConfirm.bind(this)
      } else {
        return this.handleLogin.bind(this)
      }
    };
    const error = () => {
        if (this.props.error) {
            return <label>{this.props.error}</label>
        }
    };
    return (
      <div className='registration'>
       <div className='filter'></div>
        <div className="screen">
            <div className="login">
                <div className="card mb-3" >
                  <div ref='links' onClick={this.bold.bind(this)} className="card-header">
                  <a href='#/registration'>Registration</a>
                  <a href='#/login'>Login</a>
                  <a href='#'>Main</a>
                  </div>
                  <div className="card-body">
                    <form ref='regForm' onSubmit={selectAction()}>
                      <div className="form-group">
                        <label>Email address</label>
                        <input ref='email' type="email" className="form-control" placeholder="Enter email"/>
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        {error()}
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input ref='pass' type="password" className="form-control" placeholder="Password"/>
                      </div>
                      {routePath()}
                      <button type="submit" className="btn">Submit</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default connect(({error}) => {
    return {
        error
    }
})(Registration)
