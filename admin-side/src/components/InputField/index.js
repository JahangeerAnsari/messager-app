import React from 'react'
import { Form} from 'react-bootstrap';
/**
* @author
* @function InputField
**/

const InputField = (props) => {
  return(
     <Form>
       <React.Fragment>
          <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>{props.Label}</Form.Label>
    <Form.Control 
    type={props.type} 
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange} />
  </Form.Group>
   
     </React.Fragment>
     </Form>
   )

 }

export default InputField