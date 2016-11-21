/*
  Gemini Observatory
  React Table
  6/29/16
  Alexander Self
*/

import React from 'react';

export function Table(props) {
  const { _class, id, headers, data, onClick } = props;

  return (
    <div className="card">
      <table className={_class} id={id}>
        <thead>
          <tr>
            {
              headers.map(header => (
                <th key={header.id} data-field={header.id}>
                  <span id={header.id} onClick={onClick}>{header.name}</span>&nbsp;
                  <i id={header.id} onClick={onClick} className="tiny material-icons">loop</i>
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map(i => (
              <tr key={i.name}>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.hireDate}</td>
                <td>{i.physicalDate}</td>
                <td>{i.didPhysical}</td>
                <td>{i.age}</td>
                <td><span className="chip">{i.nextPhysical}</span></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
























/* END */
