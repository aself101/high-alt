/*

  Modal for ediing deleting records

*/

import React from 'react';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      hireDate: '',
      birthDate: '',
      physicalDate: '',
      didPhysical: ''
    };
  }
  render() {
    return (
      <div id={this.props.guid} className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Modal</h4>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
        </div>
      </div>
    );
  }
}

export default Modal;
