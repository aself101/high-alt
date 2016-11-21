/*
  Main Application
  Alexander Self
  6/28/16
*/

import React from 'react';
import { TextInput, Button } from './components/input';
import { Table } from './components/table';
import { TableHeaders, uuid } from './components/data';
import { Pagination } from './components/pagination';
import { Tabs } from './components/tabs';
import { reset, computeAge, computeNextPhysical, setValue } from './helpers';
import { AddUser } from './components/AddUserForm';
import { DeleteUser } from './components/DeleteUserForm';
import { EditUser } from './components/EditUserForm';
import { List } from './components/list';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    // New methods require binding to the class if using React.Component
    this.addUser = this.addUser.bind(this);
    this.onClick = this.onClick.bind(this);
    this.ajax = this.ajax.bind(this);
    this.stopSubmit = this.stopSubmit.bind(this);
    this.pullUsers = this.pullUsers.bind(this);
    this.autoCompletion = this.autoCompletion.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onKeyUpDelete = this.onKeyUpDelete.bind(this);
    this.onKeyUpEdit = this.onKeyUpEdit.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.editUser = this.editUser.bind(this);
    this.paginationOnClick = this.paginationOnClick.bind(this);
    this.shiftOnClick = this.shiftOnClick.bind(this);

    this.state = {
      userName: null,
      hireDate: null,
      physicalDate: null,
      didPhysical: null,
      uuid: '',
      birthDate: '',
      age: 0,
      nextPhysical: '',
      email: '',
      tableData: [],
      sortCount: 0,
      dUsers: [],
      eUsers: [],
      user: 'Edit User',
      column: 'name',
      curPag: 'pag0',
      prevPag: '',
      maxCount: 0,
      pagList: []
    };
  }
  componentDidMount() {
    this.pullUsers();
  }
  // General purpose ajax call
  // If flag 1: Set state; else do nothing
  // Flag 2: After delete, reset data table
  // Flag 3: Fill user data for edit
  ajax(type, id, state, flag) {
    $.ajax({
      type: type,
      url: 'php/view.php?'+id,
      dataType: 'json',
      cache: false,
      data: {data: state, sortCount: this.state.sortCount},
      success: function(data) {
        switch (flag) {
          case 1: // Pull users and sort columns
            this.setState({tableData: data[0]});
            this.setState({maxCount: data[1][0].totalPageRecords}, () => {
              let arr = [];
              for (let i = 0; i < this.state.maxCount; i++) {
                let opt = { id: "pag"+i, num: i+1 };
                arr.push(opt);
              }
              this.setState({pagList: arr}, () => {
                $('#'+this.state.curPag).addClass('_active');
              });
            });

            if (this.state.sortCount === 1) {
              this.setState({sortCount: 0});
            } else {
              this.setState({sortCount: 1});
            }
            break;
          case 2: // Delete user
            this.setState({tableData: data});
            document.getElementById('userDelete').value = '';
            break;
          case 3: // Pull users to delete; onKeyUp
            this.setState({dUsers: data});
            break;
          case 4: // Pull users to edit; onKeyUp
            this.setState({eUsers: data});
            break;
          case 5: // Sets user data in edit form
            document.getElementById('editHireDate').value = data[0].hireDate;
            document.getElementById('editPhysicalDate').value = data[0].physicalDate;
            document.getElementById('editBirthDate').value = data[0].birthDate;
            document.getElementById('editDidPhysical').value = data[0].didPhysical;
            document.getElementById('editEmail').value = data[0].email;
            break;
          case 6:
            this.setState({tableData: data});
            //console.log(data);
            break;
          case 7:
            if (data === 0) {
              let user = this.state.userName;
              let msg = `<span><b>User: </b>${user} exists. Please try again.</span>`;
              Materialize.toast(msg, 4000, 'userFail');
              return;
            } else {
              let user = this.state.userName;
              let msg = `<span><b>Added: </b>${user}</span>`;
              Materialize.toast(msg, 4000, 'userSuccess');
            }
          case 8: // Always TEST case
            console.log(data);
          default:
            break;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }
    });
  }
  // Submits a new user
  addUser() {
    if (document.getElementById("userName").value === '' || document.getElementById("userName").value === null) {
      return;
    }
    // Computes the age of the user directly
    let age = computeAge("birthDate");
    let next = computeNextPhysical(age, "physicalDate");
    let user = document.getElementById("userName").value;

    if (document.getElementById("didPhysical").value === 'on') {
      this.setState({
        userName: document.getElementById("userName").value,
        hireDate: document.getElementById("hireDate").value,
        physicalDate: document.getElementById("physicalDate").value,
        birthDate: document.getElementById("birthDate").value,
        email: document.getElementById("email").value,
        didPhysical: 'No',
        nextPhysical: next,
        age: age,
        uuid: uuid()
      }, () => {
        // Reset form info; post new user; pull all users for real time addition
        reset();
        this.ajax('POST', '', this.state, 7);
        this.pullUsers();
      });
    } else {
      this.setState({
        userName: document.getElementById("userName").value,
        hireDate: document.getElementById("hireDate").value,
        physicalDate: document.getElementById("physicalDate").value,
        birthDate: document.getElementById("birthDate").value,
        email: document.getElementById("email").value,
        didPhysical: document.getElementById("didPhysical").value,
        nextPhysical: next,
        age: age,
        uuid: uuid()
      }, () => {
        // Reset form info; post new user; pull all users for real time addition
        reset();
        this.ajax('POST', '', this.state, 7);
        this.pullUsers();
      });
    }
  }
  // Edit user data
  editUser() {
    if (this.state.user === 'Edit User') return;

    let age = computeAge('editBirthDate');
    let next = computeNextPhysical(age, 'editPhysicalDate');
    let msg = `<span><b>Edited: </b>${this.state.user}</span>`;
    let data = [];

    this.setState({
      userName: this.state.user,
      hireDate: document.getElementById('editHireDate').value,
      physicalDate: document.getElementById('editPhysicalDate').value,
      birthDate: document.getElementById('editBirthDate').value,
      email: document.getElementById('editEmail').value,
      didPhysical: document.getElementById('editDidPhysical').value,
      nextPhysical: next,
      age: age
    }, () => {
      for (var key in this.state) {
        if (key === 'userName' || key === 'hireDate' || key === 'physicalDate' ||
            key === 'birthDate' || key === 'didPhysical' || key === 'nextPhysical' ||
            key === 'email' || key === 'age') {
              data.push({[key]: this.state[key]});
        }
      }
      // Submit new data for update, pull users for real time update
      this.ajax('GET', 'updateUser', data, 0);
      this.pullUsers();
      // Remove values from form and notify user
      document.getElementById('editEmail').value = '';
      document.getElementById('editHireDate').value = '';
      document.getElementById('editPhysicalDate').value = '';
      document.getElementById('editBirthDate').value = '';
      document.getElementById('editDidPhysical').value = '';
      Materialize.toast(msg, 4000, 'userSuccess');
      this.setState({user: 'Edit User'});
    });
  }
  // Deletes a user and notifys
  deleteUser(cb) {
    let user = document.getElementById('userDelete').value;
    let msg = `<span><b>Deleted: </b>${user}</span>`;

    this.ajax('GET', 'deleteUser', user, 2);
    Materialize.toast(msg, 4000, 'userSuccess');
  }
  // Pulls all user information and sets the state for the table
  pullUsers() {
    this.ajax('GET', 'users', '', 1);
  }
  // Allows the user to sort the tabe by any column
  sortByColumn(e) {
    let el = document.getElementById(e.target.id);
    let _id = el.id.split('_')[1];

    this.setState({column: _id}, () => {
      //console.log(this.state.column);
    });

    this.ajax('GET', 'sortColumn', _id, 1);
  }
  // Pulls records for the table, so it may be reduced to the particular user
  autoCompletion(e) {
    let search = document.getElementById("userSearch").value;
    this.ajax('GET', 'userSearch', search, 1);
  }
  // Applications onKeyUp: Grabs names from server
  onKeyUpDelete() {
    let user = document.getElementById("userDelete").value;
    this.ajax('GET', 'pullAllUsers', user, 3);
  }
  // Pulls all users from db to select for update
  onKeyUpEdit() {
    let user = document.getElementById('userEdit').value;
    // Add activator

    // Clear data from edit form if there is no value in the Edit Name field
    if (user === '' || user === null) {
      this.setState({user: 'Edit User'});
      document.getElementById('editHireDate').value = '';
      document.getElementById('editPhysicalDate').value = '';
      document.getElementById('editBirthDate').value = '';
      document.getElementById('editDidPhysical').value = '';
    }
    this.ajax('GET', 'pullUsersForEdit', user, 4);
  }
  // Sets user data in the edit form
  setUserData(e) {
    let toEdit = e.target.id;
    document.getElementById('userEdit').value = toEdit;
    this.setState({user: toEdit}, () => {
      let c = {
        display: 'block',
        transform: 'translateY(-100%)'
      };
      $('#activator-click').addClass('activator');
      $('.card-reveal').css(c);
    });
    this.ajax('GET', 'pullEditInfo', toEdit, 5);
  }
  // Stops the form from submitting and refreshing the page
  stopSubmit(evt) {
    evt.preventDefault();
    return false;
  }
  /********************************************************************************/
  // GENERAL ONCLICK TEST FUNCTION
  onClick(e) {
    return;
  }
  /********************************************************************************/
  // Highlights the table page the user is on
  // Maintains the state of current and previous pagination states
  paginationOnClick(e) {
    let el = e.target.id;
    let val = parseInt(el.split('pag')[1]);
    //console.log(val);
    if (el !== this.state.curPag) {
      $('#'+this.state.curPag).removeClass('_active');
      this.setState({prevPag: this.state.curPag});
      this.setState({curPag: el}, () => {
        $('#'+this.state.curPag).addClass('_active');
      });
    }

    const obj = {
      pagNum: val,
      column: this.state.column,
      sortType: this.state.sortCount
    };
    this.ajax('GET', 'pagOnClick', obj, 6);
  }
  // Shift the pagination left or right depending on arrow click
  shiftOnClick(e) {
    let el = e.target.id;
    let curState = parseInt(this.state.curPag.split('pag')[1]);
    let prevState = parseInt(this.state.prevPag.split('pag')[1]);
    let newNum = 0;
    let newState;
    switch (el) {
      case "shiftLeft":
        // Parse out number and subtract it as the shift is going in the left direction
        newNum = parseInt(this.state.curPag.split('pag')[1]) - 1;
        if (newNum < 0) return;
        newState = 'pag' + newNum;
        // Set the previous page state to the old one
        this.setState({prevPag: this.state.curPag});
        // Set new state to the shifted down state; add/remove classes
        this.setState({curPag: newState}, () => {
          $('#'+this.state.curPag).addClass('_active');
          $('#'+this.state.prevPag).removeClass('_active');

          const obj = {
            pagNum: newNum,
            column: this.state.column,
            sortType: this.state.sortCount
          };
          this.ajax('GET', 'pagOnClick', obj, 6);
        });
        break;
      case "shiftRight":
        // Parse out number and add it as the shift is going in the right direction
        newNum = parseInt(this.state.curPag.split('pag')[1]) + 1;
        if (newNum >= this.state.maxCount) return;
        newState = 'pag' + newNum;
        // Set the previous page state to the old one
        this.setState({prevPag: this.state.curPag});
        // Set new state to the shifted down state; add/remove classes
        this.setState({curPag: newState}, () => {
          $('#'+this.state.curPag).addClass('_active');
          $('#'+this.state.prevPag).removeClass('_active');

          const obj = {
            pagNum: newNum,
            column: this.state.column,
            sortType: this.state.sortCount
          };
          this.ajax('GET', 'pagOnClick', obj, 6);
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
        <div className="row">
          <div className="col s12 m4 l3">
            <div className="row">
            {/********************************** TABS ************************************/}
              <Tabs />
              {/******************************** CREATE **********************************/}
              <div id="_add">
                  <AddUser onSubmit={this.stopSubmit} onClick={this.addUser} />
              </div>
              {/******************************** UPDATE **********************************/}
              <div id="_update">
                <div className="card card-large">
                  <span id="activator-click" className="card-title grey-text text-darken-4"></span>
                  <div className="card-content">
                    <div className="row">
                      <TextInput _class={"input-field"} id={"userEdit"} label={"Name"} onKeyUp={this.onKeyUpEdit} />
                    </div>
                    <div className="row">
                      <List data={this.state.eUsers} onClick={this.setUserData} />
                    </div>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{this.state.user}<i className="material-icons right">close</i></span>
                    <EditUser onSubmit={this.stopSubmit} onClick={this.editUser} />
                  </div>
                </div>
              </div>
              {/******************************** DELETE **********************************/}
              <div id="_delete">
                <div className="card card-large">
                  <DeleteUser onSubmit={this.stopSubmit} onClick={this.deleteUser} onKeyUp={this.onKeyUpDelete} />
                  <List data={this.state.dUsers} onClick={setValue} />
                </div>
              </div>
              {/**************************************************************************/}
            </div>
            <div id="error-dismiss"></div>
          </div>

          <div className="col s12 m8 l9">
            <div className="row">
              <div className="col s6 m4 10">
                <TextInput _class={"input-field"} id={"userSearch"} label={"User Search"} onKeyUp={this.autoCompletion} />
              </div>
            </div>

            <Table _class={"bordered highlight centered z-depth-2"}
              id={"userDisplay"}
              headers={TableHeaders}
              data={this.state.tableData}
              onClick={this.sortByColumn.bind(this)}
            />
            <Pagination _class={"pagination"}
              onClick={this.paginationOnClick}
              shiftOnClick={this.shiftOnClick}
              list={this.state.pagList}
            />
          </div>
      </div>
    );
  }
}






























/* END */
