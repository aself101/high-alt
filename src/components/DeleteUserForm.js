


import React from 'react';
import { TextInput, Button } from './input';


export function DeleteUser(props) {
  const { onSubmit, onClick, onKeyUp } = props;
  return (
      <form onSubmit={onSubmit}>
        <div className="row">
          <TextInput _class={"input-field"} id={"userDelete"} label={"Name"} onKeyUp={onKeyUp} />
        </div>
        <div className="row">
          <Button  _class={"btn waves-effect waves-light"}
            iconCls={"material-icons right"}
            icon={"delete"}
            id={"deleteUserData"}
            type={"submit"}
            msg={"Delete"}
            onClick={onClick}
          />
        </div>
      </form>
  );
}













/* END */
