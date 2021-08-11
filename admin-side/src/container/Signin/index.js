import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import InputField from '../../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { isUserLogin, login } from '../../actions/auth.action';


/**
* @author
* @function Signin
**/

const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  })
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const history = useHistory();


  const siginForm = (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    dispatch(login(user))
      .then((res) => {
        console.log("=====> response ", res)
        const { message } = res.data;

        if (res.status === 200) {
          console.log(" res.status", res.status);

          console.log(" message", message);

          setAlert({ ...alert, message, variant: "success" });
          setShowAlert(true)
          setTimeout(() => {
            history.push('/');
          }, 1000)

        }


      }).catch(function (error) {
        const { response } = error
        console.log("response error", response)
        if (response) {
          const { status, data } = response;
          console.log("===>", data);
          console.log("===>", status);
          const { error } = data;
          if (status === 400) {

            setAlert({ ...alert, message: error, variant: "danger" });

            setShowAlert(true)
          }

        }
      });

  }

  // if(auth.authenticate){
  //   return <Redirect to={`/`}/>
  // }

  return (
    <Layout>
      <Container style={{ paddingTop: '50px' }}>
        {showAlert && <Alert variant={alert.variant} onClose={() => setShowAlert(false)} dismissible>
          {alert.message}
        </Alert>
        }
        <Row>
          <Col md={{ span: '6', offset: '3' }}>
            <Form onSubmit={siginForm} >
              <InputField
                Label="Email"
                type="email"
                placeholder="Enter email"
                value={email}
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

export default Signin