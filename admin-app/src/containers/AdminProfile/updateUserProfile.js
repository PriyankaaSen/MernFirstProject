import React,{useState} from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import {  useSelector, useDispatch} from 'react-redux'
import{ userupdateinfo} from '../../actions/userProfileUpdate.action.js'
import {Link, useLocation, useParams} from 'react-router-dom'

const UpdateUserProfile = () => {
  let { id } = useParams();
const auth= useSelector(state=>state.auth);
const dispatch = useDispatch();
const [name, setUpdateName] = useState(auth.data.name);
const [email, setUpdateEmail] = useState(auth.data.email);
const [phone, setUpdatePhoneNumber] = useState(auth.data.phone);

const updateUserData =async (e) =>{
  e.preventDefault();
  const updateUserData ={
    name,
    email,
    phone
  }
  dispatch(userupdateinfo(updateUserData,id))
}
    return (
      <div>
      <Layout sidebar>
          <Container>
                <h3 className="text-center" style={{marginTop:'30px'}}>Update User Profile</h3>
            <Row style={{marginTop:'90px'}}>
             <Col md={{span:6, offset:3}}>
               <Form onSubmit={updateUserData} >
                  <Row>
                   <Col md={6}>
                      <Input
                        label="Name"
                        placeholder="Name"
                        type="text"
                         value={name} onChange={(e)=>setUpdateName(e.target.value)}
                      />
                   </Col>
                   <Col md={6}>
                       <Input
                         label="Phone"
                         placeholder="Phone"
                         type="text"
                         value={phone} onChange={(e)=>setUpdatePhoneNumber(e.target.value)}
                       />
                   </Col>
                  </Row>
                      <Input
                        label="Email"
                        placeholder="Email"
                        type="email"
                        defaultValue={auth.data.email}
                      />

                 <Button variant="primary" type="submit" style={{marginTop:'10px'}}>
                   Update Profile
                 </Button>
               </Form>
             </Col>
            </Row>

          </Container>

      </Layout>
      </div>
    )
}

export default UpdateUserProfile
