import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Layout from '../components/Layout/layout';

const DatatablePage = () => {
  const data = {
    
  };

  return (
    <Layout>
        <MDBDataTable
         striped
         bordered
         small
         data={data}
        />
    </Layout>
    
  );
}

export default DatatablePage;