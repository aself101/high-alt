/*

  Tabs for navigating Add, Edit, Delete

*/

import React from 'react';


export function Tabs(props) {
  const { _class } = props;
  return (
      <ul className="tabs tab-text">
        <li className="tab col s3"><a className="tab-text" href="#_add">Add</a></li>
        <li className="tab col s3"><a className="tab-text" href="#_update">Update</a></li>
        <li className="tab col s3"><a className="tab-text" href="#_delete">Delete</a></li>
        <div className="indicator"></div>
      </ul>
  );
}
