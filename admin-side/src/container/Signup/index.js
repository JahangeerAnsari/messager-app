import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import InputField from '../../components/InputField';
import { registeration } from '../../actions/user.action';
import { useDispatch,useSelector  } from 'react-redux';
import { useHistory ,Redirect } from 'react-router-dom';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

  // signup

  // let set the state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  })
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
   const history = useHistory() 
  const auth = useSelector(state => state.auth);
  
  const singupFormSubmit = (e) => {
    e.preventDefault();
    //   action will call
    const user = {
      firstName,
      lastName,
      email,
      password
    }
    dispatch(registeration(user))
    .then((res) => {
      console.log("=====>", res)
      const { message } = res.data;
      if (res.status === 201) {
        console.log(" message", message);
        setAlert({ ...alert, message });
        setShowAlert(true)
        setTimeout(() =>{
          history.push('/signin');  
       },1000)
       
      }
  
      if(res.status === 200){
        setAlert({ ...alert, message , variant:"warning"});
        setShowAlert(true)
        
      }


    }).catch(function (error) {
      const { response } = error
      if (response) {
        const { status, data } = response;
        console.log("===>", data);
        console.log("===>", status); 
        const {error} = data;
          if(status === 400){
          setAlert({ ...alert, message:error , variant:"danger"});
          setShowAlert(true)
        }
        
      }
    });

  }

  //  if user is signup move to signin page
 // redirect
 if(auth.authenticate){
   return <Redirect to={`/`}/>
} 
  

  
  return (
    <Layout>
      <Container style={{ paddingTop: '50px' }}>
        {showAlert && <Alert variant={alert.variant} onClose={() => setShowAlert(false)} dismissible>
          {alert.message}
        </Alert>
        }
        <Row>
          <Col md={{ span: '6', offset: '3' }}>
            <Form onSubmit={singupFormSubmit} >
              <Row>
                <Col>
                  <InputField
                    Label="FistName"
                    type="text"
                    value={firstName}
                    placeholder="Enter first Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <InputField
                    Label="LastName"
                    type="text"
                    value={lastName}
                    placeholder="Enter last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />

                </Col>

              </Row>

              <InputField
                Label="Email"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}

              />
              <InputField
                Label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Signup