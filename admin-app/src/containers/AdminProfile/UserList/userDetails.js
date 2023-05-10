import React from "react";
import Layout from "../../../components/Layout";
import {Card,Button} from "react-bootstrap";
import { IoIosMail,IoMdCall,IoIosCloudUpload,IoIosTrash} from 'react-icons/io'
import cardImg from '../../../assets/img/userProfile.png'

const UserDetails = () => {
  return (
    <Layout sidebar>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" style={{ height:'180px', width: "180px" }} src={cardImg} />
        <Card.Body>
          <Card.Title><h3>Admin@gmail.com</h3></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><IoIosMail /> admin@gmail.com</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted"><IoMdCall /> PhoneNumber</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div>
          <button className= "btn btn-info" ><IoIosCloudUpload /></button>&nbsp;
          <button className= "btn btn-danger" ><IoIosTrash /></button>
          </div>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default UserDetails;
