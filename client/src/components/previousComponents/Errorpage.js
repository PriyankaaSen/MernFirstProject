import React from 'react'
import {NavLink} from 'react-router-dom';
const Errorpage = () => {
    return (
        <>
            <div id="notfound">
              <div className="notfound">
                <div className="notfound-404">
                  <h1>404</h1>
                </div>
                <p className="mb-5">
                  <NavLink to="/">Back to Homepage </NavLink>
                </p>
              </div>
            </div>
        </>
    )
}

export default Errorpage
