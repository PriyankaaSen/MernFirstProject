import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import {login} from '../../actions'
import {useDispatch} from 'react-redux'
import {Navigate} from 'react-router-dom';

export const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();


  const userLogin = (e)=> {

    e.preventDefault();

    const data = {
      email, password
    }
    dispatch(login(data));
}

if(auth.authenticate){
  return < Navigate to = {'/'} />

}

    return (
      <>
        <div>
        <Layout>
            <Container>
              <Row style={{marginTop:'110px'}}>
               <Col md={{span:6, offset:3}}>
                 <Form onSubmit={userLogin}>
                 <Input
                   label="Email"
                   placeholder="Email"
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
                 <Input
                   label="Password"
                   placeholder="Password"
                   type="password"
                   value={password}
                   onChange={(e) =>setPassword(e.target.value)}
                 />
                   <Button variant="primary" type="submit">
                     Submit
                   </Button>
                 </Form>
               </Col>
              </Row>
            </Container>
        </Layout>
        </div>
        </>
    )
}

export default Signin
