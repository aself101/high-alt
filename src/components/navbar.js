/*
  Navbar at head of project
*/
import React from 'react';

function Navbar (props) {
  const { logo, app } = props;
  return (
    <header>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="http://www.gemini.edu" className="brand-logo">{logo}</a>
            <ul className="right hide-on-med-and-down">
              <li><i className="material-icons">verified_user</i></li>
              <li>&nbsp;&nbsp;&nbsp;{app}&nbsp;&nbsp;&nbsp;</li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
