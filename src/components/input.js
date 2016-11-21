/*
  Standard form input
*/
import React from 'react';

export function TextInput(props) {
    const { _class, _text, id, label, onKeyUp } = props;

    return (
      <div className={_class}>
        <label for={id}>{label}</label>
        <input id={id} type="text" className={_text} onKeyUp={onKeyUp} />
      </div>
    );
}

export function TextInput2(props) {
    const { _class, _text, id, label, onKeyUp } = props;

    return (
      <div>
        <label for={id}>{label}</label>
        <input id={id} type="text" onKeyUp={onKeyUp} />
      </div>
    );
}

export function DatePicker(props) {
    const { _class, id, label } = props;

    let onClick = () => {
      $('#'+id).pickadate({
        selectYears: 150,
        format: 'yyyy-mm-dd'
      });
    };

    return (
      <div className={_class}>
        <label for={id}>{label}</label>
        <input id={id} type="text" className="datepicker" onClick={onClick} />
      </div>
    );
}

export function Switch(props) {
    const { _class, id, label } = props;

    let onClick = () => {
      switch (document.getElementById(id).value) {
        case 'on':
          document.getElementById(id).value = 'Yes';
          break;
        case 'Yes':
          document.getElementById(id).value = 'No';
          break;
        case 'No':
          document.getElementById(id).value = 'Yes';
          break;
        default:
          break;
      }
    };

    return (
      <div className={_class}>
        <label>Completed Physical</label><br /><br />
        <label>
          <span>No</span>
          <input id={id} type="checkbox" onClick={onClick} />
          <span className="lever"></span>
          <span>Yes</span>
        </label>
      </div>
    );
}

export function Button(props) {
    const { _class, iconCls, icon, id, type, msg, onClick } = props;

    return (
      <button className={_class} type={type} id={id} onClick={onClick}>{msg}
        <i className={iconCls}>{icon}</i>
      </button>
    );
}





























/* END */
