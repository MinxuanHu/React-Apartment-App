import React, { Component } from 'react';
import { Grid } from "react-bootstrap";


import { FormErrors } from './FormError';
import axios from 'axios';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            email: '',
            password: '',
            showText: 0,

            formErrors: { email: '', password: '', },

            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.tRef = React.createRef();
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;


        switch (fieldName) {

            case 'email':
                emailValid = value.match(/[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/);
                fieldValidationErrors.email = emailValid ? '' : "is invalid,must have '@' and '.'";
                break;
            case 'password':
                passwordValid = value.length === 10 || true;
                fieldValidationErrors.password = passwordValid ? '' : ' Length must be 10';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,

            emailValid: emailValid,
            passwordValid: passwordValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    getSuspend() {
        let number = this.number;
        let password = this.password;
        number.value = "";
        password.value = "";
    }
    // 改变显示隐藏的功能
    changeField() {
        this.state.showText
            ? this.setState({
                showText: 0
            })
            : this.setState({
                showText: 1
            })
    }



    submitHandle(e) {
        console.log(`e --> `, this)
        e.preventDefault();
        const { email, password } = this.state;
        axios.post('/user/login', { email, password }).then(res => {
            console.log(`res --> `, res)
            if (res.data.code == 200) {
                alert(res.data.msg);
                localStorage.setItem('userid', res.data.data._id)
                localStorage.setItem('user', JSON.stringify(res.data.data))
                this.tRef.current.reset();
            } else {
                alert(res.data.msg)
            }
        })
    }

    render() {
        // 加入转换按钮
        const btn = (
            <button
                style={this.props.buttonStyle}
                type="button"
                className="btn btn-primary"
                onClick={this.changeField.bind(this)}>{(this.state.showText)
                    ? this.props.hideBtnName
                    : this.props.showBtnName}
            </button>
        );

        return (

            <form className="content" ref={this.tRef} onSubmit={(e) => this.submitHandle(e)}>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <Grid fluid>
                    <h1>Resident Service</h1>
                    <h2>Already A User ? Please Login</h2>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" required className="form-control" name="email"
                            placeholder="Email"
                            onChange={this.handleUserInput} />
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label htmlFor="passwordInput">Password</label>

                        {/*显示隐藏区域块*/}
                        <br />
                        {
                            this.state.showText
                                ? <input
                                    type='text'
                                    className="form-control"
                                    placeholder="Password"
                                    name='password'
                                    style={this.props.fieldStyle}
                                    onChange={this.handleUserInput} />
                                : <input
                                    type='password'
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    style={this.props.fieldStyle}
                                    onChange={this.handleUserInput} />
                        }
                        <br />
                        {(this.props.showBtn) ? btn : null}


                    </div>
                    {
                        /* <div>
                            <label>is Company?:</label>
                            <input type="radio" name="title" id="Yes" value="Company" required="required" />Yes
                            <input type="radio" name="title" id="No" value="Tenant" required="required" />No
                        </div> */
                    }

                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Login</button>
                    &nbsp;
                    &nbsp;
                    <button type="reset" className="btn btn-primary" >Reset</button>
                    <br />
                    <br />
                    <a href='/admin/register'>Click to Register</a>

                </Grid>

            </form>

        )
    }

}
// 设置显示隐藏区域块的初始值
Login.defaultProps = {
    name: 'password',
    showBtn: true,
    showBtnName: 'Show',
    hideBtnName: 'Hide',
    buttonStyle: null,
    fieldStyle: null
}

export default Login

