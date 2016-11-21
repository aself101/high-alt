import React from 'react';


export function Pagination(props) {
  const { _class, id, onClick, shiftOnClick, list } = props;
  return (
    <div className="card">
      <ul className={_class}>
        <li className="waves-effect"><i id="shiftLeft" onClick={shiftOnClick} className="material-icons">chevron_left</i></li>
          {
            list.map(l => (
              <li key={l.id} value={l.num} className="waves-effect" id={l.id} onClick={onClick}>{l.num}</li>
            ))
          }
        <li className="waves-effect"><i id="shiftRight" onClick={shiftOnClick} className="material-icons">chevron_right</i></li>
      </ul>
    </div>
  );
}
