/*
  Form to Edit users

*/

import React from 'react';
import { TextInput, DatePicker, Switch, Button } from './input';
import { List } from './list';

export function EditUser(props) {
  const { onSubmit, onClick } = props;
  return (
    <form onSubmit={onSubmit}>
      <TextInput id={"editEmail"} label={"Email"} />
      <DatePicker id={"editHireDate"} label={"Date of Hire"} />
      <DatePicker id={"editBirthDate"} label={"Birthdate"} />
      <DatePicker id={"editPhysicalDate"} label={"Date of Physical"} />
      <TextInput  id={"editDidPhysical"} label={"Completed Physical"} />
      <div className="row">
        <Button  _class={"btn waves-effect waves-light"}
          iconCls={"material-icons right"}
          icon={"send"}
          id={"editUserData"}
          type={"submit"}
          msg={"Edit User"}
          onClick={onClick}
        />
      </div>
    </form>
  );
}
