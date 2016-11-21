/*
  Footer for Safety altitude app
*/
import React from 'react';


function Footer(props) {
  const { list } = props;
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">High Altitude Training</h5>
            <p className="grey-text text-lighten-4">Safety Department</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Internal Links</h5>
            <ul>
              {
                list.map(l => (
                  <li key={l.href}>
                    <a className="grey-text text-lighten-3" href={l.href} target="_blank">
                      {l.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2016 Gemini
        </div>
      </div>
    </footer>
  )
}

export default Footer;
