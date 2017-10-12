import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startCreatingUser, startLogin} from 'actions'

class Registration extends Component {
  handleConfirm (e) {
    e.preventDefault();
    const {email, pass, confirmPass, regForm} = this.refs;

    if(email.value){
      console.log('email is valid');
      if(pass.value){
        if(pass.value === confirmPass.value){
          this.props.dispatch(startCreatingUser({email: email.value, pass: pass.value}));
          console.log('succes');
          regForm.reset()
        }else {
          console.log('pass is not confirmed');
          confirmPass.focus()
        }
      }else {
        console.log('pass is empty');
        pass.focus()
      }
    }else{
      console.log('wrong email');
      email.focus()
    }

  }

  handleLogin (e) {
    e.preventDefault();
    const {email, pass, regForm} = this.refs;
    if(email.value && pass.value){
      this.props.dispatch(startLogin({email: email.value, pass: pass.value}))
      console.log('loggining');
    }else{
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
    return (
      <div className='registration'>
        <div className="screen">
            <div className="login">
                <div className="card mb-3" >
                  <div className="card-header">Registration</div>
                  <div className="card-body">
                    <form ref='regForm' onSubmit={selectAction()}>
                      <div className="form-group">
                        <label>Email address</label>
                        <input ref='email' type="email" className="form-control" placeholder="Enter email"/>
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
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

export default connect()(Registration)
