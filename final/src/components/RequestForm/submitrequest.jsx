import React from 'react'
import {Button, CardText, Form, FormGroup, Label} from "reactstrap";

const SubmitRequest=()=>{
    return(
        <Form className="request-form">
            <h2><span className="mb-5">Submit Request</span></h2>
            <FormGroup>
                <div className="mt-5">

                    <Label className="description">Detail Description*</Label>&nbsp;&nbsp;&nbsp;

                    <div>
                        <textarea className="mt--5 desc" rows="0" cols="0" placeholder="Please enter detailed description of the issue"></textarea>
                    </div>
                    <CardText></CardText>
                </div>
            </FormGroup>
            <hr className="pr-20 ml-0" width="70%"/>
            <FormGroup>
                <Label>Priority*</Label>&nbsp;&nbsp;&nbsp;
                <select placeholder="Low" name="Priority" required>
                    <option value="select" selected disabled>Select an option</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </FormGroup>
            <hr className="pr-20 ml-0" width="70%"/>
            <FormGroup>
                <Label>Permission to enter the property*</Label>&nbsp;&nbsp;&nbsp;
                <select placeholder="Low" name="Priority" required>
                    <option value="select" selected disabled>Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </FormGroup>
            <hr className="pr-20 ml-0" width="70%"/>
            <FormGroup>
                <Label>Attachments</Label>&nbsp;&nbsp;&nbsp;
                <Button className="btn-primary p-0">Choose File</Button>
            </FormGroup>
            <Button className="btn-info">Submit</Button>

        </Form>
    )
}

export default SubmitRequest;