import React, { Component } from 'react';
import { Grid, Alert } from "react-bootstrap";



import { FormErrors } from './FormError';
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

            email: '',
            password: '',
            rePassword: '',

            formErrors: { email: '', password: '', rePassword: '', },

            emailValid: false,
            passwordValid: false,
            rePasswordValid: false,
            formValid: false
        }

        this.tRef = React.createRef();
    }

    componentDidMount() { }


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
        let rePasswordValid = this.state.rePasswordValid;


        switch (fieldName) {

            case 'email':
                emailValid = value.match(/[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/);
                fieldValidationErrors.email = emailValid ? '' : "is invalid,must have '@' and '.'";
                break;
            case 'password':
                passwordValid = value.length === 10;
                fieldValidationErrors.password = passwordValid ? '' : ' Length must be 10';
                break;
            case 'rePassword':
                rePasswordValid = value.length === 10;
                fieldValidationErrors.rePassword = rePasswordValid ? '' : 'Length must be 10';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,

            emailValid: emailValid,
            passwordValid: passwordValid,
            rePasswordValid: rePasswordValid,

        }, this.validateForm);
    }


    validateForm() {
        this.setState({ formValid: this.state.emailValid });
    }
    // && this.state.passwordValid&& this.state.rePasswordValid

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    getSuspend() {
        let number = this.number;
        let password = this.password;
        let rePassword = this.rePassword;
        number.value = "";
        password.value = "";
        rePassword.value = "";
    }

    handleOnPasswordInput(password) {
        this.setState({ password: password });
    }
    handleOnConfirmPasswordInput(confirmPasswordInput) {
        this.setState({ confirmPassword: confirmPasswordInput });
    }

    doesPasswordMatch() {
        const { password, confirmPassword } = this.state;
        return password === confirmPassword;
    }

    validateForm1() {
        const password = this.state;
        return password.length === 10;
    }
    //     const { password } = this.state;
    // if(password){
    //     if (!this.validateForm1()){
    //         return (
    //             <div className="invalid-feedback">Length of 10!</div>
    //         );
    //     }
    // }

    confirmPasswordClassName() {
        const { confirmPassword } = this.state;

        if (confirmPassword) {
            return this.doesPasswordMatch() ? 'is-valid' : 'is-invalid';
        }
    }
    renderFeedbackMessage() {
        const { confirmPassword } = this.state;

        if (confirmPassword) {
            if (!this.doesPasswordMatch()) {
                return (
                    <div className="invalid-feedback">Not Match!</div>
                );
            }
        }

    }

    submitHandle(e) {
        console.log(`e --> `, this)
        e.preventDefault();
        const { email, password } = this.state;
        axios.post('/user/create', { email, password }).then(res => {
            console.log(`res --> `, res)
            if (res.data.code == 200) {
                alert(res.data.msg);
                this.tRef.current.reset();
            } else {
                alert(res.data.msg)
                this.tRef.current.reset();
            }
        })
    }






    render() {
        return (
            <form className="content" ref={this.tRef} onSubmit={(e) => this.submitHandle(e)}>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <Grid fluid>
                    <h1>Resident Service</h1>
                    <h2>New User ? Please Register Now</h2>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" required
                            id="email"
                            className="form-control" name="email"
                            placeholder="Email"
                            onChange={e => this.handleUserInput(e)} />
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            required
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={e => this.handleOnPasswordInput(e.target.value)}
                        />
                    </div>

                    <div className={`form-group ${this.errorClass(this.state.formErrors.rePassword)}`}>
                        <label htmlFor="confirmPasswordInput">RePassword</label>
                        <input type="password"
                            required
                            className={'form-control ${this.confirmPasswordClassName()'}
                            id="confirmPasswordInput"
                            placeholder="Repeat Password"
                            onChange={e => this.handleOnConfirmPasswordInput(e.target.value)}
                        />
                        {this.renderFeedbackMessage()}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} >Register</button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <button type="reset" className="btn btn-primary" onClick={() => this.getSuspend}>Reset</button>
                    <br />
                    <br />
                    <a href='/admin/login'>Click to Login</a>
                </Grid>

            </form>

        )
    }

}
export default Register

