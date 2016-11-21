/*

  User list for onKeyUp / autocomplete

*/

import React from 'react';



export function List(props) {
  const { data, onClick } = props;
  return (
    <ul className="collection">
      {
        data.map(i => (
          <li key={i.name} id={i.name} className="collection-item" onClick={onClick}>{i.name}</li>
        ))
      }
    </ul>
  );
}
