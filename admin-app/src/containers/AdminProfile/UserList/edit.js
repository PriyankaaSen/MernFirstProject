import React, {useState} from 'react'
import Layout from "../../../components/Layout";
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../../components/UI/Input'
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {signup} from '../../../actions'
import {useDispatch} from 'react-redux'



const UserEdit = (props) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const userSignup = (e) => {

      e.preventDefault();
    const user = {name, phone, email, password, cpassword }

    dispatch(signup(user))
  }

  if(auth.authenticate){
    return < Navigate to = {'/'} />
  }

  if(user.loading){
    return <p>Loading...!</p>
  }

    return (

        <Layout>
        <Container>

          <Row style={{marginTop:'110px'}}>
          <Row><h1>edit</h1></Row>
           <Col md={{span:6, offset:3}}>
             <Form onSubmit={userSignup}>
                <Row>
                 <Col md={6}>
                    <Input
                      label="Name"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                 </Col>
                 <Col md={6}>
                     <Input
                       label="Phone"
                       placeholder="Phone"
                       type="text"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                     />
                 </Col>
                </Row>
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      type="password"
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
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

export default UserEdit
