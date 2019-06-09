import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        success: false
    }

    handleInputEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handleInputPassword = (event) => {
        this.setState({ password: event.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/');
        }
    }

    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log In</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    <button type="submit">Log in</button>
                    <div className="error">
                        {
                            user.login ?
                                <div>{user.login.message}</div>
                            : null
                        }
                    </div>
                    

                </form>
            </div>
        )
    }
}

function mapStateToProsp(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProsp)(Login);
