/*!
=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================
* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from "axios";











class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.tRef = React.createRef();

        this.state = {
            email: "",
            password: "",
            id: "",
        }
    }


    componentDidMount() {
        this.getInfo()
    }


    getInfo() {
        var id = localStorage.getItem('userid')
        axios.get('/user/getAll', { params: { id } }).then(res => {
            console.log(`res --> `, res)
            this.setState({
                email: res.data.data[0].email,
                password: res.data.data[0].password,
                id: res.data.data[0]._id,
            })
        })
    }


    submitHandle(e) {
        e.preventDefault();

        // this.tRef.current.reset();
        console.log(`this.tRef.current --> `, this.tRef.current.name)

        var obj = {
            email: this.tRef.current.email.value,
            password: this.tRef.current.password.value,
            id: this.tRef.current.id.value,
        }
        axios.post('/user/edit', obj).then(res => {
            if (res.data.code == 200) {
                alert(res.data.msg);
                window.location.reload();
            } else {
                alert(res.data.msg)
            }
        })
    }





    render() {
        const { email, password, id } = this.state;
        console.log(`{ email, password, id } --> `, { email, password, id })
        return (
            <div className="content" style={{ minHeight: '827px' }}>
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Edit Profile"
                                content={
                                    <form ref={this.tRef} onSubmit={(e) => this.submitHandle(e)}>
                                        <br />
                                        <FormInputs
                                            ncols={["col-md-4"]}
                                            properties={[
                                                {
                                                    required: true,
                                                    label: "Email",
                                                    type: "email",
                                                    name: "email",
                                                    bsClass: "form-control",
                                                    placeholder: "Email",
                                                    value: email,
                                                    onChange: (e) => { this.setState({ email: e.target.value }) }
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-4"]}
                                            properties={[
                                                {
                                                    required: true,
                                                    label: "New password",
                                                    type: "password",
                                                    name: "password",
                                                    bsClass: "form-control",
                                                    placeholder: "New Password",
                                                    value: password,
                                                    onChange: (e) => {
                                                        this.setState({ password: e.target.value })
                                                    }
                                                },
                                            ]}
                                        />

                                        <input type="hidden" name="id" value={id}
                                            onChange={() => ``}
                                        />

                                        <br />
                                        <Button bsStyle="info" fill type="submit">
                                            Update Profile
                                        </Button>
                                        <div className="clearfix" />
                                    </form>
                                }
                            />
                        </Col>
                        {/*      <Col md={4}>*/}
                        {/*          <UserCard*/}
                        {/*              bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"*/}
                        {/*              avatar={avatar}*/}
                        {/*              name="Mike Andrew"*/}
                        {/*              userName="michael24"*/}
                        {/*              description={*/}
                        {/*                  <span>*/}
                        {/*  "Lamborghini Mercy*/}
                        {/*  <br />*/}
                        {/*  Your chick she so thirsty*/}
                        {/*  <br />*/}
                        {/*  I'm in that two seat Lambo"*/}
                        {/*</span>*/}
                        {/*              }*/}
                        {/*              socials={*/}
                        {/*                  <div>*/}
                        {/*                      <Button simple>*/}
                        {/*                          <i className="fa fa-facebook-square" />*/}
                        {/*                      </Button>*/}
                        {/*                      <Button simple>*/}
                        {/*                          <i className="fa fa-twitter" />*/}
                        {/*                      </Button>*/}
                        {/*                      <Button simple>*/}
                        {/*                          <i className="fa fa-google-plus-square" />*/}
                        {/*                      </Button>*/}
                        {/*                  </div>*/}
                        {/*              }*/}
                        {/*          />*/}
                        {/*      </Col>*/}
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default UserProfile;
