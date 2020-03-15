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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { thArray1, tdArray1 } from "variables/Variables.jsx";
import axios from 'axios';


import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import SubmitRequest from "../components/RequestForm/submitrequest";
import { Button, CardText, Form, FormGroup, Label } from "reactstrap";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {

      priority: '',
      permission: '',
      content: '',

      list: []

    }

    this.tRef = React.createRef();
  }


  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }



  componentDidMount() {
    this.getListData();
  }


  getListData() {
    axios.get('/repair').then(res => {
      this.setState({
        list: res.data.data
      })
    })

  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }




  submitHandle(e) {
    e.preventDefault();
    const { priority, permission, content } = this.state;

    var o = {
      priority, permission, content,
      userid: localStorage.getItem('userid'),
      useremail: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '',
    }

    if (o.content === undefined || o.content === '' || o.content.trim() == '') {
      alert('DETAIL DESCRIPTION cannot be empty');
      return;
    }

    if (o.permission === undefined || o.permission === '') {
      alert('PRIORITY cannot be empty');
      return;
    }

    if (o.permission === undefined || o.permission === '') {
      alert('PERMISSION  cannot be empty');
      return;
    }

    axios.post('/repair/create', o).then(res => {
      console.log(`res --> `, res)
      if (res.data.code == 200) {
        alert(res.data.msg);
        this.tRef.current.reset();
        this.getListData();
      } else {
        alert(res.data.msg)
        this.tRef.current.reset();
      }
    })
  }








  render() {
    const { list } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          {/*<Row>*/}
          {/*  <Col lg={6} sm={6} >*/}
          {/*    <a href="#historycard">*/}
          {/*      <StatsCard*/}
          {/*        title="Request History"*/}
          {/*        bigIcon={<i className="pe-7s-clock pe-xs text-danger" />}*/}
          {/*        statsText=""*/}
          {/*        statsValue="show requests"*/}
          {/*        statsIcon=""*/}
          {/*        statsIconText=""*/}
          {/*      />*/}
          {/*    </a>*/}
          {/*  </Col>*/}
          {/*  <Col lg={6} sm={6}>*/}
          {/*    <a href="#submitrequest">*/}
          {/*      <StatsCard*/}
          {/*        title="Complaints?"*/}
          {/*        bigIcon={<i className="pe-7s-mail text-success" />}*/}
          {/*        statsText=""*/}
          {/*        statsValue="Submit Request"*/}
          {/*        statsIcon=""*/}
          {/*        statsIconText=""*/}
          {/*      />*/}
          {/*    </a>*/}
          {/*  </Col>*/}
          {/*  /!*<Col lg={3} sm={6}>*!/*/}
          {/*  /!*  <StatsCard*!/*/}
          {/*  /!*    bigIcon={<i className="pe-7s-graph1 text-danger" />}*!/*/}
          {/*  /!*    statsText="Errors"*!/*/}
          {/*  /!*    statsValue="23"*!/*/}
          {/*  /!*    statsIcon={<i className="fa fa-clock-o" />}*!/*/}
          {/*  /!*    statsIconText="In the last hour"*!/*/}
          {/*  /!*  />*!/*/}
          {/*  /!*</Col>*!/*/}
          {/*  /!*<Col lg={3} sm={6}>*!/*/}
          {/*  /!*  <StatsCard*!/*/}
          {/*  /!*    bigIcon={<i className="fa fa-twitter text-info" />}*!/*/}
          {/*  /!*    statsText="Followers"*!/*/}
          {/*  /!*    statsValue="+45"*!/*/}
          {/*  /!*    statsIcon={<i className="fa fa-refresh" />}*!/*/}
          {/*  /!*    statsIconText="Updated now"*!/*/}
          {/*  /!*  />*!/*/}
          {/*  /!*</Col>*!/*/}
          {/*</Row>*/}
          <Row>
            <Col md={12} id="submitrequest">
              <Card
                statsIcon=""
                id="chartHours"
                title="Please enter all fields to create a request"
                category=""
                stats=""
                content={
                  <div>
                    <form className="request-form" ref={this.tRef} onSubmit={(e) => this.submitHandle(e)}>

                      <FormGroup>
                        <div className="mt-5">

                          <Label className="description">Detail Description*</Label>&nbsp;&nbsp;&nbsp;

                          <div>
                            <textarea name="content"
                              required
                              className="mt--5 desc form-control" rows="0" cols="0"
                              placeholder="Please enter detailed description of the issue"
                              onChange={(e) => this.handleUserInput(e)}
                            ></textarea>
                          </div>

                        </div>
                      </FormGroup>
                      <hr className="pr-20 ml-0" width="70%" />
                      <FormGroup>
                        <Label>Priority*</Label>&nbsp;&nbsp;&nbsp;
                        <select placeholder="Low" name="priority" required
                          className="form-control"
                          onChange={(e) => this.handleUserInput(e)}
                        >
                          <option value=""  >Select an option</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </FormGroup>
                      <hr className="pr-20 ml-0" width="70%" />
                      <FormGroup>
                        <Label>Permission to enter the property*</Label>&nbsp;&nbsp;&nbsp;
                        <select placeholder="Low" name="permission" required
                          className="form-control"
                          onChange={(e) => this.handleUserInput(e)}
                        >
                          <option value=""  >Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </FormGroup>
                      <hr className="pr-20 ml-0" width="70%" />

                      {/*    

                      <FormGroup>
                        <Label>Attachments</Label>&nbsp;&nbsp;&nbsp;
                        <Button className="btn-primary p-0">Choose File</Button>
                      </FormGroup>

                      */}



                      <Button className="btn-info">Submit</Button>

                    </form>

                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(legendSales)}</div>
              // }
              />
            </Col>
            {/*  <Col md={4}>*/}
            {/*    <Card*/}
            {/*      statsIcon="fa fa-clock-o"*/}
            {/*      title="Email Statistics"*/}
            {/*      category="Last Campaign Performance"*/}
            {/*  stats="Campaign sent 2 days ago"*/}
            {/*  content={*/}
            {/*  <div*/}
            {/*      id="chartPreferences"*/}
            {/*      className="ct-chart ct-perfect-fourth"*/}
            {/*  >*/}
            {/*    <ChartistGraph data={dataPie} type="Pie" />*/}
          </Row>
          <Row>
            <Col md={12} id="historycard">
              <Card
                title="Pending Requests"
                category="from all the properties maintained"
                ctTableFullWidth
                ctTableResponsive
                style="text-align:center"
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Applicant</th>
                        <th>DETAIL DESCRIPTION</th>
                        <th>PRIORITY</th>
                        <th>PERMISSION </th>
                        <th>ACTION </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{prop.useremail}</td>
                            <td>{prop.content}</td>
                            <td>{prop.priority}</td>
                            <td>{prop.permission}</td>
                            {/*<td>*/}
                            {/*  <button>Mark as Complete</button>*/}
                            {/*</td>*/}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

          </Row>

          <Row>
            {/*<Col md={6}>*/}
            {/*  <Card*/}
            {/*    id="chartActivity"*/}
            {/*    title="2014 Sales"*/}
            {/*    category="All products including Taxes"*/}
            {/*    stats="Data information certified"*/}
            {/*    statsIcon="fa fa-check"*/}
            {/*    content={*/}
            {/*      <div className="ct-chart">*/}
            {/*        <ChartistGraph*/}
            {/*          data={dataBar}*/}
            {/*          type="Bar"*/}
            {/*          options={optionsBar}*/}
            {/*          responsiveOptions={responsiveBar}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    }*/}
            {/*    legend={*/}
            {/*      <div className="legend">{this.createLegend(legendBar)}</div>*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Col>*/}

            {/*<Col md={6}>*/}
            {/*  <Card*/}
            {/*    title="Tasks"*/}
            {/*    category="Backend development"*/}
            {/*    stats="Updated 3 minutes ago"*/}
            {/*    statsIcon="fa fa-history"*/}
            {/*    content={*/}
            {/*      <div className="table-full-width">*/}
            {/*        <table className="table">*/}
            {/*          <Tasks />*/}
            {/*        </table>*/}
            {/*      </div>*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Col>*/}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
