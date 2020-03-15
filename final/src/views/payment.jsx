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
import { Grid, Row, Col, Table, Form, Button } from "react-bootstrap";

import Card from "components/Card/Card";
import { iconsArray } from "variables/Variables.jsx";
import axios from "axios";

const checkStyle = {
  width: '22px',
  height: '22px'
}
class Payment extends Component {
  state = {
    datalist: [],
    total: 0,
    payid: '',
  }


  componentDidMount() {
    this.getlistdata()
  }

  getlistdata() {
    var o = { userid: localStorage.getItem('userid') }
    axios.get('/pay/get', { params: o }).then((res) => {
      console.log(`res --> `, res)
      var data = res.data.data.sort((a, b) => a.month - b.month)
      this.setState({
        datalist: data
      })
    })
  }


  checkHandle(e, item) {
    const { total, payid } = this.state;
    let checked = e.target.checked;
    let totalCanche = 0;
    let totalPayid = '';

    if (checked) {
      totalCanche = Number(total) + Number(item.price)
      totalPayid = payid + item.payid + ','
    } else {
      totalCanche = Number(total) - Number(item.price)
      totalPayid = payid.replace(item.payid + ',', '')
    }
    // totalPayid = totalPayid.substr(0, totalPayid.length - 1)
    this.setState({
      total: totalCanche,
      payid: totalPayid
    })
  }


  paycreate() {
    const { datalist, total, payid } = this.state;
    const lent = payid.split(',').filter(item => item).length;

    const o = {
      total,
      payid,
      msg: `${lent}  MONTH 'S PRICES `
    }
    var str = `?total=${o.total}&payid=${o.payid}&msg=${o.msg}`

    if (!total || !payid) {
      alert('Please select payment quantity')
      return;
    }

    window.open(`http://localhost:3001/pay/create${str}`)

  }



  render() {
    const { datalist, total, payid } = this.state;
    const lent = payid.split(',').filter(item => item).length;
    return (
      <div className="content" style={{ "minHeight": "700px", "padding": "8px 15px" }}>
        <div style={{ height: "35px", background: '#5ecfee' }}></div>

        <h3>
          Nice to meet you!  Your Total Balance is ${total} now!
        </h3>
        <div style={{ "maxHeight": "640px", "overflowY": "auto" }}>
          <Table responsive >
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Month</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody >
              {
                datalist.map((item, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input type="checkbox" onChange={(e) => this.checkHandle(e, item)} style={checkStyle} label="Check me out" />
                    </td>
                    <td>{item.month}</td>
                    <td>{item.price}</td>
                  </tr>
                })
              }

            </tbody>
          </Table>
        </div>




        <p>
          <Button type="submit" variant="primary" onClick={() => this.paycreate()} >Go to Paypal</Button>
        </p>

        {/* 
        <form style={{ textAlign: 'center' }} action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" id="sform">
          <input type="hidden" name="cmd" value="_xclick" />
          <input type="hidden" name="business" value="sb-kzn4y719359@business.example.com" />
          <input type="hidden" name="item_name" value="rent" />
          <input id='item_number' type="hidden" name="item_number" value="1" />
          <input id='amount' type="hidden" name="amount" value={total} />
          <input type="hidden" name="currency_code" value="USD" />
          <input type='hidden' name='return' value='http://localhost:3000' />
          <input type='hidden' name='notify_url' value='http://localhost:3001/pay/paysuc' />
          <input type='hidden' name='cancel_return' value='http://localhost:3000' />
          <input id='invoice' type='hidden' name='invoice' value={payid} />
          <input type='hidden' name='charset' value='utf-8' />
          <input type="hidden" name="no_shipping" value="1" />
          <input type="hidden" name="no_note" value={`${lent} MONTH 'S PRICE`} />
          <input type="hidden" name="bn" value="IC_Sample" />
          <input type='hidden' name='rm' value='2' />
        </form> 
        */}
      </div >
    );
  }
}

export default Payment;
