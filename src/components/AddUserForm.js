/*
  Form to Add users

*/

import React from 'react';
import { TextInput, TextInput2, DatePicker, Switch, Button } from './input';

export function AddUser(props) {
  const { onSubmit, onClick } = props;
  return (
    <div className="card card-large">
      <form onSubmit={onSubmit}>
        <TextInput id={"userName"} label={"Name"} />
        <TextInput id={"email"} label={"Email"} />
        <DatePicker id={"hireDate"} label={"Date of Hire"} />
        <DatePicker id={"birthDate"} label={"Birthdate"} />
        <DatePicker id={"physicalDate"} label={"Date of Physical"} />
        <div className="row">
          <Switch _class={"switch"} id={"didPhysical"} label={"Completed Physical"} />
        </div>
        <div className="row">
          <Button  _class={"btn waves-effect waves-light"}
            iconCls={"material-icons right"}
            icon={"send"}
            id={"addUserData"}
            type={"submit"}
            msg={"Add User"}
            onClick={onClick}
          />
        </div>
      </form>
    </div>
  );
}
