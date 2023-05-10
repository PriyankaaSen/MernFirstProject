import React from "react";
import serviceData from "./serviceData";
import { Link } from "react-router-dom";

const Service = () => {
  const services = serviceData.map(service => {
    return (
      <div key={service.id}>
        <h3>
          <Link to={`/service/${service.id}`}>{service.name}</Link>
        </h3>
        <hr />
      </div>
    );
  });

  return (
    <>
      <h1>Service Page</h1>
      {services}
    </>
  );
};

export default Service;
