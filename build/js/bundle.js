(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./components/input');

var _table = require('./components/table');

var _data = require('./components/data');

var _pagination = require('./components/pagination');

var _tabs = require('./components/tabs');

var _helpers = require('./helpers');

var _AddUserForm = require('./components/AddUserForm');

var _DeleteUserForm = require('./components/DeleteUserForm');

var _EditUserForm = require('./components/EditUserForm');

var _list = require('./components/list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Main Application
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Alexander Self
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 6/28/16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    // New methods require binding to the class if using React.Component
    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.addUser = _this.addUser.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.ajax = _this.ajax.bind(_this);
    _this.stopSubmit = _this.stopSubmit.bind(_this);
    _this.pullUsers = _this.pullUsers.bind(_this);
    _this.autoCompletion = _this.autoCompletion.bind(_this);
    _this.deleteUser = _this.deleteUser.bind(_this);
    _this.onKeyUpDelete = _this.onKeyUpDelete.bind(_this);
    _this.onKeyUpEdit = _this.onKeyUpEdit.bind(_this);
    _this.setUserData = _this.setUserData.bind(_this);
    _this.editUser = _this.editUser.bind(_this);
    _this.paginationOnClick = _this.paginationOnClick.bind(_this);
    _this.shiftOnClick = _this.shiftOnClick.bind(_this);

    _this.state = {
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
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pullUsers();
      /* TO BE CHANGED ONCE A DEFINED RECORD COUNT IS PULLED
         DETERMINES HOW MANY PAGES THE TABLE WILL HAVE
      */
    }
    // General purpose ajax call
    // If flag 1: Set state; else do nothing
    // Flag 2: After delete, reset data table
    // Flag 3: Fill user data for edit

  }, {
    key: 'ajax',
    value: function ajax(type, id, state, flag) {
      $.ajax({
        type: type,
        url: 'php/view.php?' + id,
        dataType: 'json',
        cache: false,
        data: { data: state, sortCount: this.state.sortCount },
        success: function (data) {
          var _this2 = this;

          switch (flag) {
            case 1:
              // Pull users and sort columns
              this.setState({ tableData: data[0] });
              this.setState({ maxCount: data[1][0].totalPageRecords }, function () {
                var arr = [];
                for (var i = 0; i < _this2.state.maxCount; i++) {
                  var opt = { id: "pag" + i, num: i + 1 };
                  arr.push(opt);
                }
                _this2.setState({ pagList: arr }, function () {
                  $('#' + _this2.state.curPag).addClass('_active');
                });
              });

              if (this.state.sortCount === 1) {
                this.setState({ sortCount: 0 });
              } else {
                this.setState({ sortCount: 1 });
              }
              break;
            case 2:
              // Delete user
              this.setState({ tableData: data });
              document.getElementById('userDelete').value = '';
              break;
            case 3:
              // Pull users to delete; onKeyUp
              this.setState({ dUsers: data });
              break;
            case 4:
              // Pull users to edit; onKeyUp
              this.setState({ eUsers: data });
              break;
            case 5:
              // Sets user data in edit form
              document.getElementById('editHireDate').value = data[0].hireDate;
              document.getElementById('editPhysicalDate').value = data[0].physicalDate;
              document.getElementById('editBirthDate').value = data[0].birthDate;
              document.getElementById('editDidPhysical').value = data[0].didPhysical;
              document.getElementById('editEmail').value = data[0].email;
              break;
            case 6:
              this.setState({ tableData: data });
              //console.log(data);
              break;
            case 7:
              if (data === 0) {
                var user = this.state.userName;
                var msg = '<span><b>User: </b>' + user + ' exists. Please try again.</span>';
                Materialize.toast(msg, 4000, 'userFail');
                return;
              } else {
                var _user = this.state.userName;
                var _msg = '<span><b>Added: </b>' + _user + '</span>';
                Materialize.toast(_msg, 4000, 'userSuccess');
              }
            case 8:
              // Always TEST case
              console.log(data);
            default:
              break;
          }
        }.bind(this),
        error: function error(xhr, status, err) {
          console.error(xhr, status, err.toString());
        }
      });
    }
    // Submits a new user

  }, {
    key: 'addUser',
    value: function addUser() {
      var _this3 = this;

      if (document.getElementById("userName").value === '' || document.getElementById("userName").value === null) {
        return;
      }
      // Computes the age of the user directly
      var age = (0, _helpers.computeAge)("birthDate");
      var next = (0, _helpers.computeNextPhysical)(age, "physicalDate");
      var user = document.getElementById("userName").value;

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
          uuid: (0, _data.uuid)()
        }, function () {
          // Reset form info; post new user; pull all users for real time addition
          (0, _helpers.reset)();
          _this3.ajax('POST', '', _this3.state, 7);
          _this3.pullUsers();
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
          uuid: (0, _data.uuid)()
        }, function () {
          // Reset form info; post new user; pull all users for real time addition
          (0, _helpers.reset)();
          _this3.ajax('POST', '', _this3.state, 7);
          _this3.pullUsers();
        });
      }
    }
    // Edit user data

  }, {
    key: 'editUser',
    value: function editUser() {
      var _this4 = this;

      if (this.state.user === 'Edit User') return;

      var age = (0, _helpers.computeAge)('editBirthDate');
      var next = (0, _helpers.computeNextPhysical)(age, 'editPhysicalDate');
      var msg = '<span><b>Edited: </b>' + this.state.user + '</span>';
      var data = [];

      this.setState({
        userName: this.state.user,
        hireDate: document.getElementById('editHireDate').value,
        physicalDate: document.getElementById('editPhysicalDate').value,
        birthDate: document.getElementById('editBirthDate').value,
        email: document.getElementById('editEmail').value,
        didPhysical: document.getElementById('editDidPhysical').value,
        nextPhysical: next,
        age: age
      }, function () {
        for (var key in _this4.state) {
          if (key === 'userName' || key === 'hireDate' || key === 'physicalDate' || key === 'birthDate' || key === 'didPhysical' || key === 'nextPhysical' || key === 'email' || key === 'age') {
            data.push(_defineProperty({}, key, _this4.state[key]));
          }
        }
        // Submit new data for update, pull users for real time update
        _this4.ajax('GET', 'updateUser', data, 0);
        _this4.pullUsers();
        // Remove values from form and notify user
        document.getElementById('editEmail').value = '';
        document.getElementById('editHireDate').value = '';
        document.getElementById('editPhysicalDate').value = '';
        document.getElementById('editBirthDate').value = '';
        document.getElementById('editDidPhysical').value = '';
        Materialize.toast(msg, 4000, 'userSuccess');
        _this4.setState({ user: 'Edit User' });
      });
    }
    // Deletes a user and notifys

  }, {
    key: 'deleteUser',
    value: function deleteUser(cb) {
      var user = document.getElementById('userDelete').value;
      var msg = '<span><b>Deleted: </b>' + user + '</span>';

      this.ajax('GET', 'deleteUser', user, 2);
      Materialize.toast(msg, 4000, 'userSuccess');
    }
    // Pulls all user information and sets the state for the table

  }, {
    key: 'pullUsers',
    value: function pullUsers() {
      this.ajax('GET', 'users', '', 1);
    }
    // Allows the user to sort the tabe by any column

  }, {
    key: 'sortByColumn',
    value: function sortByColumn(e) {
      var el = document.getElementById(e.target.id);
      var _id = el.id.split('_')[1];

      this.setState({ column: _id }, function () {
        //console.log(this.state.column);
      });

      this.ajax('GET', 'sortColumn', _id, 1);
    }
    // Pulls records for the table, so it may be reduced to the particular user

  }, {
    key: 'autoCompletion',
    value: function autoCompletion(e) {
      var search = document.getElementById("userSearch").value;
      this.ajax('GET', 'userSearch', search, 1);
    }
    // Applications onKeyUp: Grabs names from server

  }, {
    key: 'onKeyUpDelete',
    value: function onKeyUpDelete() {
      var user = document.getElementById("userDelete").value;
      this.ajax('GET', 'pullAllUsers', user, 3);
    }
    // Pulls all users from db to select for update

  }, {
    key: 'onKeyUpEdit',
    value: function onKeyUpEdit() {
      var user = document.getElementById('userEdit').value;
      // Add activator

      // Clear data from edit form if there is no value in the Edit Name field
      if (user === '' || user === null) {
        this.setState({ user: 'Edit User' });
        document.getElementById('editHireDate').value = '';
        document.getElementById('editPhysicalDate').value = '';
        document.getElementById('editBirthDate').value = '';
        document.getElementById('editDidPhysical').value = '';
      }
      this.ajax('GET', 'pullUsersForEdit', user, 4);
    }
    // Sets user data in the edit form

  }, {
    key: 'setUserData',
    value: function setUserData(e) {
      var toEdit = e.target.id;
      document.getElementById('userEdit').value = toEdit;
      this.setState({ user: toEdit }, function () {
        var c = {
          display: 'block',
          transform: 'translateY(-100%)'
        };
        $('#activator-click').addClass('activator');
        $('.card-reveal').css(c);
      });
      this.ajax('GET', 'pullEditInfo', toEdit, 5);
    }
    // Stops the form from submitting and refreshing the page

  }, {
    key: 'stopSubmit',
    value: function stopSubmit(evt) {
      evt.preventDefault();
      return false;
    }
    /********************************************************************************/
    // GENERAL ONCLICK TEST FUNCTION

  }, {
    key: 'onClick',
    value: function onClick(e) {
      return;
    }
    /********************************************************************************/
    // Highlights the table page the user is on
    // Maintains the state of current and previous pagination states

  }, {
    key: 'paginationOnClick',
    value: function paginationOnClick(e) {
      var _this5 = this;

      var el = e.target.id;
      var val = parseInt(el.split('pag')[1]);
      //console.log(val);
      if (el !== this.state.curPag) {
        $('#' + this.state.curPag).removeClass('_active');
        this.setState({ prevPag: this.state.curPag });
        this.setState({ curPag: el }, function () {
          $('#' + _this5.state.curPag).addClass('_active');
        });
      }

      var obj = {
        pagNum: val,
        column: this.state.column,
        sortType: this.state.sortCount
      };
      this.ajax('GET', 'pagOnClick', obj, 6);
    }
    // Shift the pagination left or right depending on arrow click

  }, {
    key: 'shiftOnClick',
    value: function shiftOnClick(e) {
      var _this6 = this;

      var el = e.target.id;
      var curState = parseInt(this.state.curPag.split('pag')[1]);
      var prevState = parseInt(this.state.prevPag.split('pag')[1]);
      var newNum = 0;
      var newState = void 0;
      switch (el) {
        case "shiftLeft":
          // Parse out number and subtract it as the shift is going in the left direction
          newNum = parseInt(this.state.curPag.split('pag')[1]) - 1;
          if (newNum < 0) return;
          newState = 'pag' + newNum;
          // Set the previous page state to the old one
          this.setState({ prevPag: this.state.curPag });
          // Set new state to the shifted down state; add/remove classes
          this.setState({ curPag: newState }, function () {
            $('#' + _this6.state.curPag).addClass('_active');
            $('#' + _this6.state.prevPag).removeClass('_active');

            var obj = {
              pagNum: newNum,
              column: _this6.state.column,
              sortType: _this6.state.sortCount
            };
            _this6.ajax('GET', 'pagOnClick', obj, 6);
          });
          break;
        case "shiftRight":
          // Parse out number and add it as the shift is going in the right direction
          newNum = parseInt(this.state.curPag.split('pag')[1]) + 1;
          if (newNum >= this.state.maxCount) return;
          newState = 'pag' + newNum;
          // Set the previous page state to the old one
          this.setState({ prevPag: this.state.curPag });
          // Set new state to the shifted down state; add/remove classes
          this.setState({ curPag: newState }, function () {
            $('#' + _this6.state.curPag).addClass('_active');
            $('#' + _this6.state.prevPag).removeClass('_active');

            var obj = {
              pagNum: newNum,
              column: _this6.state.column,
              sortType: _this6.state.sortCount
            };
            _this6.ajax('GET', 'pagOnClick', obj, 6);
          });
          break;
        default:
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m4 l3' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(_tabs.Tabs, null),
            _react2.default.createElement(
              'div',
              { id: '_add' },
              _react2.default.createElement(_AddUserForm.AddUser, { onSubmit: this.stopSubmit, onClick: this.addUser })
            ),
            _react2.default.createElement(
              'div',
              { id: '_update' },
              _react2.default.createElement(
                'div',
                { className: 'card card-large' },
                _react2.default.createElement('span', { id: 'activator-click', className: 'card-title grey-text text-darken-4' }),
                _react2.default.createElement(
                  'div',
                  { className: 'card-content' },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(_input.TextInput, { _class: "input-field", id: "userEdit", label: "Name", onKeyUp: this.onKeyUpEdit })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(_list.List, { data: this.state.eUsers, onClick: this.setUserData })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'card-reveal' },
                  _react2.default.createElement(
                    'span',
                    { className: 'card-title grey-text text-darken-4' },
                    this.state.user,
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons right' },
                      'close'
                    )
                  ),
                  _react2.default.createElement(_EditUserForm.EditUser, { onSubmit: this.stopSubmit, onClick: this.editUser })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { id: '_delete' },
              _react2.default.createElement(
                'div',
                { className: 'card card-large' },
                _react2.default.createElement(_DeleteUserForm.DeleteUser, { onSubmit: this.stopSubmit, onClick: this.deleteUser, onKeyUp: this.onKeyUpDelete }),
                _react2.default.createElement(_list.List, { data: this.state.dUsers, onClick: _helpers.setValue })
              )
            )
          ),
          _react2.default.createElement('div', { id: 'error-dismiss' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s12 m8 l9' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col s6 m4 10' },
              _react2.default.createElement(_input.TextInput, { _class: "input-field", id: "userSearch", label: "User Search", onKeyUp: this.autoCompletion })
            )
          ),
          _react2.default.createElement(_table.Table, { _class: "bordered highlight centered z-depth-2",
            id: "userDisplay",
            headers: _data.TableHeaders,
            data: this.state.tableData,
            onClick: this.sortByColumn.bind(this)
          }),
          _react2.default.createElement(_pagination.Pagination, { _class: "pagination",
            onClick: this.paginationOnClick,
            shiftOnClick: this.shiftOnClick,
            list: this.state.pagList
          })
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

/* END */


exports.default = App;

},{"./components/AddUserForm":2,"./components/DeleteUserForm":3,"./components/EditUserForm":4,"./components/data":5,"./components/input":7,"./components/list":8,"./components/pagination":10,"./components/table":11,"./components/tabs":12,"./helpers":13,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddUser = AddUser;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Form to Add users

*/

function AddUser(props) {
  var onSubmit = props.onSubmit,
      onClick = props.onClick;

  return _react2.default.createElement(
    'div',
    { className: 'card card-large' },
    _react2.default.createElement(
      'form',
      { onSubmit: onSubmit },
      _react2.default.createElement(_input.TextInput, { id: "userName", label: "Name" }),
      _react2.default.createElement(_input.TextInput, { id: "email", label: "Email" }),
      _react2.default.createElement(_input.DatePicker, { id: "hireDate", label: "Date of Hire" }),
      _react2.default.createElement(_input.DatePicker, { id: "birthDate", label: "Birthdate" }),
      _react2.default.createElement(_input.DatePicker, { id: "physicalDate", label: "Date of Physical" }),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(_input.Switch, { _class: "switch", id: "didPhysical", label: "Completed Physical" })
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(_input.Button, { _class: "btn waves-effect waves-light",
          iconCls: "material-icons right",
          icon: "send",
          id: "addUserData",
          type: "submit",
          msg: "Add User",
          onClick: onClick
        })
      )
    )
  );
}

},{"./input":7,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUser = DeleteUser;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeleteUser(props) {
  var onSubmit = props.onSubmit,
      onClick = props.onClick,
      onKeyUp = props.onKeyUp;

  return _react2.default.createElement(
    'form',
    { onSubmit: onSubmit },
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(_input.TextInput, { _class: "input-field", id: "userDelete", label: "Name", onKeyUp: onKeyUp })
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(_input.Button, { _class: "btn waves-effect waves-light",
        iconCls: "material-icons right",
        icon: "delete",
        id: "deleteUserData",
        type: "submit",
        msg: "Delete",
        onClick: onClick
      })
    )
  );
}

/* END */

},{"./input":7,"react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditUser = EditUser;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

var _list = require('./list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EditUser(props) {
  var onSubmit = props.onSubmit,
      onClick = props.onClick;

  return _react2.default.createElement(
    'form',
    { onSubmit: onSubmit },
    _react2.default.createElement(_input.TextInput, { id: "editEmail", label: "Email" }),
    _react2.default.createElement(_input.DatePicker, { id: "editHireDate", label: "Date of Hire" }),
    _react2.default.createElement(_input.DatePicker, { id: "editBirthDate", label: "Birthdate" }),
    _react2.default.createElement(_input.DatePicker, { id: "editPhysicalDate", label: "Date of Physical" }),
    _react2.default.createElement(_input.TextInput, { id: "editDidPhysical", label: "Completed Physical" }),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(_input.Button, { _class: "btn waves-effect waves-light",
        iconCls: "material-icons right",
        icon: "send",
        id: "editUserData",
        type: "submit",
        msg: "Edit User",
        onClick: onClick
      })
    )
  );
} /*
    Form to Edit users
  
  */

},{"./input":7,"./list":8,"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  Difference static data lists for different parts of the application

*/

var uuid = exports.uuid = function uuid() {
  return Math.random().toString(12).slice(2);
};
var randomDate = function randomDate() {
  return Math.floor(Math.random() * (2016 - 2003)) + 2003;
};
var randomAge = function randomAge() {
  return Math.floor(Math.random() * (75 - 18) + 18);
};

var Links = exports.Links = [{ href: 'http://internal.gemini.edu/index.php?q=development', name: 'Development' }, { href: 'http://internal.gemini.edu/?q=sciops', name: 'Science' }, { href: 'http://internal.gemini.edu/index.php?q=general', name: 'Administration' }, { href: 'http://internal.gemini.edu/index.php?q=safety', name: 'Safety' }, { href: 'http://internal.gemini.edu/its/', name: 'ITS' }];

var TableHeaders = exports.TableHeaders = [{ name: 'Name', id: '_name' }, { name: 'Email', id: '_email' }, { name: 'Date of Hire', id: '_hireDate' }, { name: 'Date of Physical', id: '_physicalDate' }, { name: 'Completed Physical', id: '_didPhysical' }, { name: 'Age', id: '_age' }, { name: 'Next Physical', id: '_nextPhysical' }];

var DummyData = exports.DummyData = [{ name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() }, { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() }];

var Months = exports.Months = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12
};

/* END */

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer(props) {
  var list = props.list;

  return _react2.default.createElement(
    "footer",
    { className: "page-footer" },
    _react2.default.createElement(
      "div",
      { className: "container" },
      _react2.default.createElement(
        "div",
        { className: "row" },
        _react2.default.createElement(
          "div",
          { className: "col l6 s12" },
          _react2.default.createElement(
            "h5",
            { className: "white-text" },
            "High Altitude Training"
          ),
          _react2.default.createElement(
            "p",
            { className: "grey-text text-lighten-4" },
            "Safety Department"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "col l4 offset-l2 s12" },
          _react2.default.createElement(
            "h5",
            { className: "white-text" },
            "Internal Links"
          ),
          _react2.default.createElement(
            "ul",
            null,
            list.map(function (l) {
              return _react2.default.createElement(
                "li",
                { key: l.href },
                _react2.default.createElement(
                  "a",
                  { className: "grey-text text-lighten-3", href: l.href, target: "_blank" },
                  l.name
                )
              );
            })
          )
        )
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "footer-copyright" },
      _react2.default.createElement(
        "div",
        { className: "container" },
        "\xA9 2016 Gemini"
      )
    )
  );
} /*
    Footer for Safety altitude app
  */
exports.default = Footer;

},{"react":"react"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = TextInput;
exports.TextInput2 = TextInput2;
exports.DatePicker = DatePicker;
exports.Switch = Switch;
exports.Button = Button;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextInput(props) {
  var _class = props._class,
      _text = props._text,
      id = props.id,
      label = props.label,
      onKeyUp = props.onKeyUp;


  return _react2.default.createElement(
    "div",
    { className: _class },
    _react2.default.createElement(
      "label",
      { "for": id },
      label
    ),
    _react2.default.createElement("input", { id: id, type: "text", className: _text, onKeyUp: onKeyUp })
  );
} /*
    Standard form input
  */
function TextInput2(props) {
  var _class = props._class,
      _text = props._text,
      id = props.id,
      label = props.label,
      onKeyUp = props.onKeyUp;


  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "label",
      { "for": id },
      label
    ),
    _react2.default.createElement("input", { id: id, type: "text", onKeyUp: onKeyUp })
  );
}

function DatePicker(props) {
  var _class = props._class,
      id = props.id,
      label = props.label;


  var onClick = function onClick() {
    $('#' + id).pickadate({
      selectYears: 150,
      format: 'yyyy-mm-dd'
    });
  };

  return _react2.default.createElement(
    "div",
    { className: _class },
    _react2.default.createElement(
      "label",
      { "for": id },
      label
    ),
    _react2.default.createElement("input", { id: id, type: "text", className: "datepicker", onClick: onClick })
  );
}

function Switch(props) {
  var _class = props._class,
      id = props.id,
      label = props.label;


  var onClick = function onClick() {
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

  return _react2.default.createElement(
    "div",
    { className: _class },
    _react2.default.createElement(
      "label",
      null,
      "Completed Physical"
    ),
    _react2.default.createElement("br", null),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "label",
      null,
      _react2.default.createElement(
        "span",
        null,
        "No"
      ),
      _react2.default.createElement("input", { id: id, type: "checkbox", onClick: onClick }),
      _react2.default.createElement("span", { className: "lever" }),
      _react2.default.createElement(
        "span",
        null,
        "Yes"
      )
    )
  );
}

function Button(props) {
  var _class = props._class,
      iconCls = props.iconCls,
      icon = props.icon,
      id = props.id,
      type = props.type,
      msg = props.msg,
      onClick = props.onClick;


  return _react2.default.createElement(
    "button",
    { className: _class, type: type, id: id, onClick: onClick },
    msg,
    _react2.default.createElement(
      "i",
      { className: iconCls },
      icon
    )
  );
}

/* END */

},{"react":"react"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = List;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function List(props) {
  var data = props.data,
      onClick = props.onClick;

  return _react2.default.createElement(
    "ul",
    { className: "collection" },
    data.map(function (i) {
      return _react2.default.createElement(
        "li",
        { key: i.name, id: i.name, className: "collection-item", onClick: onClick },
        i.name
      );
    })
  );
} /*
  
    User list for onKeyUp / autocomplete
  
  */

},{"react":"react"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Navbar(props) {
  var logo = props.logo,
      app = props.app;

  return _react2.default.createElement(
    "header",
    null,
    _react2.default.createElement(
      "div",
      { className: "navbar-fixed" },
      _react2.default.createElement(
        "nav",
        null,
        _react2.default.createElement(
          "div",
          { className: "nav-wrapper" },
          _react2.default.createElement(
            "a",
            { href: "http://www.gemini.edu", className: "brand-logo" },
            logo
          ),
          _react2.default.createElement(
            "ul",
            { className: "right hide-on-med-and-down" },
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                "i",
                { className: "material-icons" },
                "verified_user"
              )
            ),
            _react2.default.createElement(
              "li",
              null,
              "\xA0\xA0\xA0",
              app,
              "\xA0\xA0\xA0"
            )
          )
        )
      )
    )
  );
} /*
    Navbar at head of project
  */
exports.default = Navbar;

},{"react":"react"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = Pagination;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Pagination(props) {
  var _class = props._class,
      id = props.id,
      onClick = props.onClick,
      shiftOnClick = props.shiftOnClick,
      list = props.list;

  return _react2.default.createElement(
    "div",
    { className: "card" },
    _react2.default.createElement(
      "ul",
      { className: _class },
      _react2.default.createElement(
        "li",
        { className: "waves-effect" },
        _react2.default.createElement(
          "i",
          { id: "shiftLeft", onClick: shiftOnClick, className: "material-icons" },
          "chevron_left"
        )
      ),
      list.map(function (l) {
        return _react2.default.createElement(
          "li",
          { key: l.id, value: l.num, className: "waves-effect", id: l.id, onClick: onClick },
          l.num
        );
      }),
      _react2.default.createElement(
        "li",
        { className: "waves-effect" },
        _react2.default.createElement(
          "i",
          { id: "shiftRight", onClick: shiftOnClick, className: "material-icons" },
          "chevron_right"
        )
      )
    )
  );
}

},{"react":"react"}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = Table;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Table(props) {
  var _class = props._class,
      id = props.id,
      headers = props.headers,
      data = props.data,
      onClick = props.onClick;


  return _react2.default.createElement(
    "div",
    { className: "card" },
    _react2.default.createElement(
      "table",
      { className: _class, id: id },
      _react2.default.createElement(
        "thead",
        null,
        _react2.default.createElement(
          "tr",
          null,
          headers.map(function (header) {
            return _react2.default.createElement(
              "th",
              { key: header.id, "data-field": header.id },
              _react2.default.createElement(
                "span",
                { id: header.id, onClick: onClick },
                header.name
              ),
              "\xA0",
              _react2.default.createElement(
                "i",
                { id: header.id, onClick: onClick, className: "tiny material-icons" },
                "loop"
              )
            );
          })
        )
      ),
      _react2.default.createElement(
        "tbody",
        null,
        data.map(function (i) {
          return _react2.default.createElement(
            "tr",
            { key: i.name },
            _react2.default.createElement(
              "td",
              null,
              i.name
            ),
            _react2.default.createElement(
              "td",
              null,
              i.email
            ),
            _react2.default.createElement(
              "td",
              null,
              i.hireDate
            ),
            _react2.default.createElement(
              "td",
              null,
              i.physicalDate
            ),
            _react2.default.createElement(
              "td",
              null,
              i.didPhysical
            ),
            _react2.default.createElement(
              "td",
              null,
              i.age
            ),
            _react2.default.createElement(
              "td",
              null,
              _react2.default.createElement(
                "span",
                { className: "chip" },
                i.nextPhysical
              )
            )
          );
        })
      )
    )
  );
}

/* END */
/*
  Gemini Observatory
  React Table
  6/29/16
  Alexander Self
*/

},{"react":"react"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = Tabs;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tabs(props) {
  var _class = props._class;

  return _react2.default.createElement(
    "ul",
    { className: "tabs tab-text" },
    _react2.default.createElement(
      "li",
      { className: "tab col s3" },
      _react2.default.createElement(
        "a",
        { className: "tab-text", href: "#_add" },
        "Add"
      )
    ),
    _react2.default.createElement(
      "li",
      { className: "tab col s3" },
      _react2.default.createElement(
        "a",
        { className: "tab-text", href: "#_update" },
        "Update"
      )
    ),
    _react2.default.createElement(
      "li",
      { className: "tab col s3" },
      _react2.default.createElement(
        "a",
        { className: "tab-text", href: "#_delete" },
        "Delete"
      )
    ),
    _react2.default.createElement("div", { className: "indicator" })
  );
} /*
  
    Tabs for navigating Add, Edit, Delete
  
  */

},{"react":"react"}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
exports.setValue = setValue;
exports.lc = lc;
exports.computeAge = computeAge;
exports.computeNextPhysical = computeNextPhysical;
/* Helper functions */
function reset() {
  document.getElementById("userName").value = "";
  document.getElementById("hireDate").value = "";
  document.getElementById("physicalDate").value = "";
  document.getElementById("birthDate").value = "";
}

// Sets the value of the TO BE DELETED user after clicking a slot on the autocomplete list
function setValue(e) {
  var toDelete = e.target.id;
  document.getElementById('userDelete').value = toDelete;
  return;
}

function lc(x) {
  return x.toLowerCase();
}

function computeAge(id) {
  // Current date info
  var today = new Date();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = today.getDate();

  // Birthdate info
  try {
    var b = document.getElementById(id).value;
    var birthDate = new Date(b);
    var age = today.getFullYear() - birthdate.getFullYear();

    var m = today.getMonth() - birthdate.getMonth();

    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }

    return age;
  } catch (e) {}
}

function computeNextPhysical(age, id) {
  var dPhysical = document.getElementById(id).value;
  dPhysical = dPhysical.split('-');

  var dYear = parseInt(dPhysical[0]);
  var dMonth = dPhysical[1];
  var dDate = dPhysical[2];

  var nextPhysicalYear = 0;
  var nextDate = void 0;

  switch (true) {
    case age <= 30:
      nextPhysicalYear = dYear + 5;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case age > 30 && age <= 40:
      nextPhysicalYear = dYear + 3;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case age > 40 && age <= 50:
      nextPhysicalYear = dYear + 2;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case age > 50:
      nextPhysicalYear = dYear + 1;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    default:
      //console.log("How did you end up here");
      return;
  }
}

// Date Format YYYY-MM-DD
/*
export function computeAge_test(date) {
  if (date === '') return;
  // Current date info
  let d = new Date();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let date = d.getDate();

  // Birthdate info
  try {
    let b = document.getElementById(id).value;
    b = b.split('-');
    let bYear = parseInt(b[0]);
    let bMonth = parseInt(b[1]);
    let bDate = parseInt(b[2]);

    let age = year - bYear - 1;
    let dec = Math.abs(month - bMonth);

    if (month > bMonth && date > bDate) {
      age++;
    } else if (month === bMonth && date === bDate) {
      age++;
    }

    return age;

  } catch (e) {}
}
*/

/* END */

},{}],14:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _navbar = require('./components/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _footer = require('./components/footer');

var _footer2 = _interopRequireDefault(_footer);

var _data = require('./components/data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = function main() {
  if (document.cookie.indexOf("adAuthenticate") >= 0) {} else {
    window.location.replace("https://apps.gemini.edu/adAuthenticate/index.php?__RETURN__=czoyODoiaHR0cHM6Ly9hcHBzLmdlbWluaS5lZHUvaGFwLyI7");
  }
  (0, _reactDom.render)(_react2.default.createElement(_navbar2.default, { logo: 'Gemini', app: 'High Altitude Training App' }), document.getElementById('navbar'));
  (0, _reactDom.render)(_react2.default.createElement(_app2.default, null), document.getElementById('root'));
  (0, _reactDom.render)(_react2.default.createElement(_footer2.default, { list: _data.Links }), document.getElementById('foot'));
};

main();

},{"./app.js":1,"./components/data":5,"./components/footer":6,"./components/navbar":9,"react":"react","react-dom":"react-dom"}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NvbXBvbmVudHMvQWRkVXNlckZvcm0uanMiLCJzcmMvY29tcG9uZW50cy9EZWxldGVVc2VyRm9ybS5qcyIsInNyYy9jb21wb25lbnRzL0VkaXRVc2VyRm9ybS5qcyIsInNyYy9jb21wb25lbnRzL2RhdGEuanMiLCJzcmMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvY29tcG9uZW50cy9pbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL2xpc3QuanMiLCJzcmMvY29tcG9uZW50cy9uYXZiYXIuanMiLCJzcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uLmpzIiwic3JjL2NvbXBvbmVudHMvdGFibGUuanMiLCJzcmMvY29tcG9uZW50cy90YWJzLmpzIiwic3JjL2hlbHBlcnMuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDTUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OzsrZUFoQkE7Ozs7OztJQW1CcUIsRzs7O0FBQ25CLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUVqQjtBQUZpQiwwR0FDWCxLQURXOztBQUdqQixVQUFLLE9BQUwsR0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFDQSxVQUFLLE9BQUwsR0FBZSxNQUFLLE9BQUwsQ0FBYSxJQUFiLE9BQWY7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLElBQUwsQ0FBVSxJQUFWLE9BQVo7QUFDQSxVQUFLLFVBQUwsR0FBa0IsTUFBSyxVQUFMLENBQWdCLElBQWhCLE9BQWxCO0FBQ0EsVUFBSyxTQUFMLEdBQWlCLE1BQUssU0FBTCxDQUFlLElBQWYsT0FBakI7QUFDQSxVQUFLLGNBQUwsR0FBc0IsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXRCO0FBQ0EsVUFBSyxV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QVEsQ0FBM0I7QUFDQSxpQkFBVyxtQkFBbUIsR0FBbkIsR0FBeUIsTUFBekIsR0FBa0MsR0FBbEMsR0FBd0MsS0FBbkQ7QUFDQSxhQUFPLFFBQVA7QUFDQTtBQUNGLFNBQU0sTUFBTSxFQUFaO0FBQ0UseUJBQW1CLFFBQVEsQ0FBM0I7QUFDQSxpQkFBVyxtQkFBbUIsR0FBbkIsR0FBeUIsTUFBekIsR0FBa0MsR0FBbEMsR0FBd0MsS0FBbkQ7QUFDQSxhQUFPLFFBQVA7QUFDQTtBQUNGO0FBQ0U7QUFDQTtBQXZCSjtBQXlCRDs7QUFFRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtEQTs7Ozs7QUNuSUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBLElBQUksT0FBUSxTQUFSLElBQVEsR0FBTTtBQUNoQixNQUFJLFNBQVMsTUFBVCxDQUFnQixPQUFoQixDQUF3QixnQkFBeEIsS0FBNkMsQ0FBakQsRUFBb0QsQ0FDcEQsQ0FEQSxNQUNNO0FBQ0osV0FBTyxRQUFQLENBQWdCLE9BQWhCLENBQXdCLDhHQUF4QjtBQUNEO0FBQ0Qsd0JBQU8sa0RBQVEsTUFBTSxRQUFkLEVBQXdCLEtBQUssNEJBQTdCLEdBQVAsRUFBc0UsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQXRFO0FBQ0Esd0JBQU8sa0RBQVAsRUFBZ0IsU0FBUyxjQUFULENBQXdCLE1BQXhCLENBQWhCO0FBQ0Esd0JBQU8sa0RBQVEsaUJBQVIsR0FBUCxFQUFnQyxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBaEM7QUFDRCxDQVJEOztBQVVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gIE1haW4gQXBwbGljYXRpb25cbiAgQWxleGFuZGVyIFNlbGZcbiAgNi8yOC8xNlxuKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRleHRJbnB1dCwgQnV0dG9uIH0gZnJvbSAnLi9jb21wb25lbnRzL2lucHV0JztcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYmxlJztcbmltcG9ydCB7IFRhYmxlSGVhZGVycywgdXVpZCB9IGZyb20gJy4vY29tcG9uZW50cy9kYXRhJztcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvcGFnaW5hdGlvbic7XG5pbXBvcnQgeyBUYWJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3RhYnMnO1xuaW1wb3J0IHsgcmVzZXQsIGNvbXB1dGVBZ2UsIGNvbXB1dGVOZXh0UGh5c2ljYWwsIHNldFZhbHVlIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IEFkZFVzZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvQWRkVXNlckZvcm0nO1xuaW1wb3J0IHsgRGVsZXRlVXNlciB9IGZyb20gJy4vY29tcG9uZW50cy9EZWxldGVVc2VyRm9ybSc7XG5pbXBvcnQgeyBFZGl0VXNlciB9IGZyb20gJy4vY29tcG9uZW50cy9FZGl0VXNlckZvcm0nO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9saXN0JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICAvLyBOZXcgbWV0aG9kcyByZXF1aXJlIGJpbmRpbmcgdG8gdGhlIGNsYXNzIGlmIHVzaW5nIFJlYWN0LkNvbXBvbmVudFxuICAgIHRoaXMuYWRkVXNlciA9IHRoaXMuYWRkVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWpheCA9IHRoaXMuYWpheC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFN1Ym1pdCA9IHRoaXMuc3RvcFN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMucHVsbFVzZXJzID0gdGhpcy5wdWxsVXNlcnMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmF1dG9Db21wbGV0aW9uID0gdGhpcy5hdXRvQ29tcGxldGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZGVsZXRlVXNlciA9IHRoaXMuZGVsZXRlVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25LZXlVcERlbGV0ZSA9IHRoaXMub25LZXlVcERlbGV0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25LZXlVcEVkaXQgPSB0aGlzLm9uS2V5VXBFZGl0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRVc2VyRGF0YSA9IHRoaXMuc2V0VXNlckRhdGEuYmluZCh0aGlzKTtcbiAgICB0aGlzLmVkaXRVc2VyID0gdGhpcy5lZGl0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMucGFnaW5hdGlvbk9uQ2xpY2sgPSB0aGlzLnBhZ2luYXRpb25PbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaGlmdE9uQ2xpY2sgPSB0aGlzLnNoaWZ0T25DbGljay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHVzZXJOYW1lOiBudWxsLFxuICAgICAgaGlyZURhdGU6IG51bGwsXG4gICAgICBwaHlzaWNhbERhdGU6IG51bGwsXG4gICAgICBkaWRQaHlzaWNhbDogbnVsbCxcbiAgICAgIHV1aWQ6ICcnLFxuICAgICAgYmlydGhEYXRlOiAnJyxcbiAgICAgIGFnZTogMCxcbiAgICAgIG5leHRQaHlzaWNhbDogJycsXG4gICAgICBlbWFpbDogJycsXG4gICAgICB0YWJsZURhdGE6IFtdLFxuICAgICAgc29ydENvdW50OiAwLFxuICAgICAgZFVzZXJzOiBbXSxcbiAgICAgIGVVc2VyczogW10sXG4gICAgICB1c2VyOiAnRWRpdCBVc2VyJyxcbiAgICAgIGNvbHVtbjogJ25hbWUnLFxuICAgICAgY3VyUGFnOiAncGFnMCcsXG4gICAgICBwcmV2UGFnOiAnJyxcbiAgICAgIG1heENvdW50OiAwLFxuICAgICAgcGFnTGlzdDogW11cbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHVsbFVzZXJzKCk7XG4gICAgLyogVE8gQkUgQ0hBTkdFRCBPTkNFIEEgREVGSU5FRCBSRUNPUkQgQ09VTlQgSVMgUFVMTEVEXG4gICAgICAgREVURVJNSU5FUyBIT1cgTUFOWSBQQUdFUyBUSEUgVEFCTEUgV0lMTCBIQVZFXG4gICAgKi9cblxuICB9XG4gIC8vIEdlbmVyYWwgcHVycG9zZSBhamF4IGNhbGxcbiAgLy8gSWYgZmxhZyAxOiBTZXQgc3RhdGU7IGVsc2UgZG8gbm90aGluZ1xuICAvLyBGbGFnIDI6IEFmdGVyIGRlbGV0ZSwgcmVzZXQgZGF0YSB0YWJsZVxuICAvLyBGbGFnIDM6IEZpbGwgdXNlciBkYXRhIGZvciBlZGl0XG4gIGFqYXgodHlwZSwgaWQsIHN0YXRlLCBmbGFnKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICB1cmw6ICdwaHAvdmlldy5waHA/JytpZCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBkYXRhOiB7ZGF0YTogc3RhdGUsIHNvcnRDb3VudDogdGhpcy5zdGF0ZS5zb3J0Q291bnR9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBzd2l0Y2ggKGZsYWcpIHtcbiAgICAgICAgICBjYXNlIDE6IC8vIFB1bGwgdXNlcnMgYW5kIHNvcnQgY29sdW1uc1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGFibGVEYXRhOiBkYXRhWzBdfSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHttYXhDb3VudDogZGF0YVsxXVswXS50b3RhbFBhZ2VSZWNvcmRzfSwgKCkgPT4ge1xuICAgICAgICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5tYXhDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IHsgaWQ6IFwicGFnXCIraSwgbnVtOiBpKzEgfTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChvcHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhZ0xpc3Q6IGFycn0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcjJyt0aGlzLnN0YXRlLmN1clBhZykuYWRkQ2xhc3MoJ19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc29ydENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NvcnRDb3VudDogMH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c29ydENvdW50OiAxfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6IC8vIERlbGV0ZSB1c2VyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0YWJsZURhdGE6IGRhdGF9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyRGVsZXRlJykudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzogLy8gUHVsbCB1c2VycyB0byBkZWxldGU7IG9uS2V5VXBcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RVc2VyczogZGF0YX0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OiAvLyBQdWxsIHVzZXJzIHRvIGVkaXQ7IG9uS2V5VXBcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VVc2VyczogZGF0YX0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OiAvLyBTZXRzIHVzZXIgZGF0YSBpbiBlZGl0IGZvcm1cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0SGlyZURhdGUnKS52YWx1ZSA9IGRhdGFbMF0uaGlyZURhdGU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdFBoeXNpY2FsRGF0ZScpLnZhbHVlID0gZGF0YVswXS5waHlzaWNhbERhdGU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdEJpcnRoRGF0ZScpLnZhbHVlID0gZGF0YVswXS5iaXJ0aERhdGU7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdERpZFBoeXNpY2FsJykudmFsdWUgPSBkYXRhWzBdLmRpZFBoeXNpY2FsO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRFbWFpbCcpLnZhbHVlID0gZGF0YVswXS5lbWFpbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RhYmxlRGF0YTogZGF0YX0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAwKSB7XG4gICAgICAgICAgICAgIGxldCB1c2VyID0gdGhpcy5zdGF0ZS51c2VyTmFtZTtcbiAgICAgICAgICAgICAgbGV0IG1zZyA9IGA8c3Bhbj48Yj5Vc2VyOiA8L2I+JHt1c2VyfSBleGlzdHMuIFBsZWFzZSB0cnkgYWdhaW4uPC9zcGFuPmA7XG4gICAgICAgICAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgNDAwMCwgJ3VzZXJGYWlsJyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxldCB1c2VyID0gdGhpcy5zdGF0ZS51c2VyTmFtZTtcbiAgICAgICAgICAgICAgbGV0IG1zZyA9IGA8c3Bhbj48Yj5BZGRlZDogPC9iPiR7dXNlcn08L3NwYW4+YDtcbiAgICAgICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobXNnLCA0MDAwLCAndXNlclN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIDg6IC8vIEFsd2F5cyBURVNUIGNhc2VcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih4aHIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8vIFN1Ym1pdHMgYSBuZXcgdXNlclxuICBhZGRVc2VyKCkge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJOYW1lXCIpLnZhbHVlID09PSAnJyB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJOYW1lXCIpLnZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIENvbXB1dGVzIHRoZSBhZ2Ugb2YgdGhlIHVzZXIgZGlyZWN0bHlcbiAgICBsZXQgYWdlID0gY29tcHV0ZUFnZShcImJpcnRoRGF0ZVwiKTtcbiAgICBsZXQgbmV4dCA9IGNvbXB1dGVOZXh0UGh5c2ljYWwoYWdlLCBcInBoeXNpY2FsRGF0ZVwiKTtcbiAgICBsZXQgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlck5hbWVcIikudmFsdWU7XG5cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWRQaHlzaWNhbFwiKS52YWx1ZSA9PT0gJ29uJykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVzZXJOYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJOYW1lXCIpLnZhbHVlLFxuICAgICAgICBoaXJlRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaXJlRGF0ZVwiKS52YWx1ZSxcbiAgICAgICAgcGh5c2ljYWxEYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBoeXNpY2FsRGF0ZVwiKS52YWx1ZSxcbiAgICAgICAgYmlydGhEYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpcnRoRGF0ZVwiKS52YWx1ZSxcbiAgICAgICAgZW1haWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWUsXG4gICAgICAgIGRpZFBoeXNpY2FsOiAnTm8nLFxuICAgICAgICBuZXh0UGh5c2ljYWw6IG5leHQsXG4gICAgICAgIGFnZTogYWdlLFxuICAgICAgICB1dWlkOiB1dWlkKClcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgLy8gUmVzZXQgZm9ybSBpbmZvOyBwb3N0IG5ldyB1c2VyOyBwdWxsIGFsbCB1c2VycyBmb3IgcmVhbCB0aW1lIGFkZGl0aW9uXG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIHRoaXMuYWpheCgnUE9TVCcsICcnLCB0aGlzLnN0YXRlLCA3KTtcbiAgICAgICAgdGhpcy5wdWxsVXNlcnMoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXNlck5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlck5hbWVcIikudmFsdWUsXG4gICAgICAgIGhpcmVEYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpcmVEYXRlXCIpLnZhbHVlLFxuICAgICAgICBwaHlzaWNhbERhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGh5c2ljYWxEYXRlXCIpLnZhbHVlLFxuICAgICAgICBiaXJ0aERhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlydGhEYXRlXCIpLnZhbHVlLFxuICAgICAgICBlbWFpbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZSxcbiAgICAgICAgZGlkUGh5c2ljYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlkUGh5c2ljYWxcIikudmFsdWUsXG4gICAgICAgIG5leHRQaHlzaWNhbDogbmV4dCxcbiAgICAgICAgYWdlOiBhZ2UsXG4gICAgICAgIHV1aWQ6IHV1aWQoKVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAvLyBSZXNldCBmb3JtIGluZm87IHBvc3QgbmV3IHVzZXI7IHB1bGwgYWxsIHVzZXJzIGZvciByZWFsIHRpbWUgYWRkaXRpb25cbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgdGhpcy5hamF4KCdQT1NUJywgJycsIHRoaXMuc3RhdGUsIDcpO1xuICAgICAgICB0aGlzLnB1bGxVc2VycygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8vIEVkaXQgdXNlciBkYXRhXG4gIGVkaXRVc2VyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnVzZXIgPT09ICdFZGl0IFVzZXInKSByZXR1cm47XG5cbiAgICBsZXQgYWdlID0gY29tcHV0ZUFnZSgnZWRpdEJpcnRoRGF0ZScpO1xuICAgIGxldCBuZXh0ID0gY29tcHV0ZU5leHRQaHlzaWNhbChhZ2UsICdlZGl0UGh5c2ljYWxEYXRlJyk7XG4gICAgbGV0IG1zZyA9IGA8c3Bhbj48Yj5FZGl0ZWQ6IDwvYj4ke3RoaXMuc3RhdGUudXNlcn08L3NwYW4+YDtcbiAgICBsZXQgZGF0YSA9IFtdO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VyTmFtZTogdGhpcy5zdGF0ZS51c2VyLFxuICAgICAgaGlyZURhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0SGlyZURhdGUnKS52YWx1ZSxcbiAgICAgIHBoeXNpY2FsRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRQaHlzaWNhbERhdGUnKS52YWx1ZSxcbiAgICAgIGJpcnRoRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRCaXJ0aERhdGUnKS52YWx1ZSxcbiAgICAgIGVtYWlsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdEVtYWlsJykudmFsdWUsXG4gICAgICBkaWRQaHlzaWNhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXREaWRQaHlzaWNhbCcpLnZhbHVlLFxuICAgICAgbmV4dFBoeXNpY2FsOiBuZXh0LFxuICAgICAgYWdlOiBhZ2VcbiAgICB9LCAoKSA9PiB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5zdGF0ZSkge1xuICAgICAgICBpZiAoa2V5ID09PSAndXNlck5hbWUnIHx8IGtleSA9PT0gJ2hpcmVEYXRlJyB8fCBrZXkgPT09ICdwaHlzaWNhbERhdGUnIHx8XG4gICAgICAgICAgICBrZXkgPT09ICdiaXJ0aERhdGUnIHx8IGtleSA9PT0gJ2RpZFBoeXNpY2FsJyB8fCBrZXkgPT09ICduZXh0UGh5c2ljYWwnIHx8XG4gICAgICAgICAgICBrZXkgPT09ICdlbWFpbCcgfHwga2V5ID09PSAnYWdlJykge1xuICAgICAgICAgICAgICBkYXRhLnB1c2goe1trZXldOiB0aGlzLnN0YXRlW2tleV19KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU3VibWl0IG5ldyBkYXRhIGZvciB1cGRhdGUsIHB1bGwgdXNlcnMgZm9yIHJlYWwgdGltZSB1cGRhdGVcbiAgICAgIHRoaXMuYWpheCgnR0VUJywgJ3VwZGF0ZVVzZXInLCBkYXRhLCAwKTtcbiAgICAgIHRoaXMucHVsbFVzZXJzKCk7XG4gICAgICAvLyBSZW1vdmUgdmFsdWVzIGZyb20gZm9ybSBhbmQgbm90aWZ5IHVzZXJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0RW1haWwnKS52YWx1ZSA9ICcnO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRIaXJlRGF0ZScpLnZhbHVlID0gJyc7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdFBoeXNpY2FsRGF0ZScpLnZhbHVlID0gJyc7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdEJpcnRoRGF0ZScpLnZhbHVlID0gJyc7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdERpZFBoeXNpY2FsJykudmFsdWUgPSAnJztcbiAgICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgNDAwMCwgJ3VzZXJTdWNjZXNzJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHt1c2VyOiAnRWRpdCBVc2VyJ30pO1xuICAgIH0pO1xuICB9XG4gIC8vIERlbGV0ZXMgYSB1c2VyIGFuZCBub3RpZnlzXG4gIGRlbGV0ZVVzZXIoY2IpIHtcbiAgICBsZXQgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyRGVsZXRlJykudmFsdWU7XG4gICAgbGV0IG1zZyA9IGA8c3Bhbj48Yj5EZWxldGVkOiA8L2I+JHt1c2VyfTwvc3Bhbj5gO1xuXG4gICAgdGhpcy5hamF4KCdHRVQnLCAnZGVsZXRlVXNlcicsIHVzZXIsIDIpO1xuICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgNDAwMCwgJ3VzZXJTdWNjZXNzJyk7XG4gIH1cbiAgLy8gUHVsbHMgYWxsIHVzZXIgaW5mb3JtYXRpb24gYW5kIHNldHMgdGhlIHN0YXRlIGZvciB0aGUgdGFibGVcbiAgcHVsbFVzZXJzKCkge1xuICAgIHRoaXMuYWpheCgnR0VUJywgJ3VzZXJzJywgJycsIDEpO1xuICB9XG4gIC8vIEFsbG93cyB0aGUgdXNlciB0byBzb3J0IHRoZSB0YWJlIGJ5IGFueSBjb2x1bW5cbiAgc29ydEJ5Q29sdW1uKGUpIHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCk7XG4gICAgbGV0IF9pZCA9IGVsLmlkLnNwbGl0KCdfJylbMV07XG5cbiAgICB0aGlzLnNldFN0YXRlKHtjb2x1bW46IF9pZH0sICgpID0+IHtcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5jb2x1bW4pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hamF4KCdHRVQnLCAnc29ydENvbHVtbicsIF9pZCwgMSk7XG4gIH1cbiAgLy8gUHVsbHMgcmVjb3JkcyBmb3IgdGhlIHRhYmxlLCBzbyBpdCBtYXkgYmUgcmVkdWNlZCB0byB0aGUgcGFydGljdWxhciB1c2VyXG4gIGF1dG9Db21wbGV0aW9uKGUpIHtcbiAgICBsZXQgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyU2VhcmNoXCIpLnZhbHVlO1xuICAgIHRoaXMuYWpheCgnR0VUJywgJ3VzZXJTZWFyY2gnLCBzZWFyY2gsIDEpO1xuICB9XG4gIC8vIEFwcGxpY2F0aW9ucyBvbktleVVwOiBHcmFicyBuYW1lcyBmcm9tIHNlcnZlclxuICBvbktleVVwRGVsZXRlKCkge1xuICAgIGxldCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyRGVsZXRlXCIpLnZhbHVlO1xuICAgIHRoaXMuYWpheCgnR0VUJywgJ3B1bGxBbGxVc2VycycsIHVzZXIsIDMpO1xuICB9XG4gIC8vIFB1bGxzIGFsbCB1c2VycyBmcm9tIGRiIHRvIHNlbGVjdCBmb3IgdXBkYXRlXG4gIG9uS2V5VXBFZGl0KCkge1xuICAgIGxldCB1c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJFZGl0JykudmFsdWU7XG4gICAgLy8gQWRkIGFjdGl2YXRvclxuXG4gICAgLy8gQ2xlYXIgZGF0YSBmcm9tIGVkaXQgZm9ybSBpZiB0aGVyZSBpcyBubyB2YWx1ZSBpbiB0aGUgRWRpdCBOYW1lIGZpZWxkXG4gICAgaWYgKHVzZXIgPT09ICcnIHx8IHVzZXIgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXI6ICdFZGl0IFVzZXInfSk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdEhpcmVEYXRlJykudmFsdWUgPSAnJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0UGh5c2ljYWxEYXRlJykudmFsdWUgPSAnJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0QmlydGhEYXRlJykudmFsdWUgPSAnJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0RGlkUGh5c2ljYWwnKS52YWx1ZSA9ICcnO1xuICAgIH1cbiAgICB0aGlzLmFqYXgoJ0dFVCcsICdwdWxsVXNlcnNGb3JFZGl0JywgdXNlciwgNCk7XG4gIH1cbiAgLy8gU2V0cyB1c2VyIGRhdGEgaW4gdGhlIGVkaXQgZm9ybVxuICBzZXRVc2VyRGF0YShlKSB7XG4gICAgbGV0IHRvRWRpdCA9IGUudGFyZ2V0LmlkO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyRWRpdCcpLnZhbHVlID0gdG9FZGl0O1xuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXI6IHRvRWRpdH0sICgpID0+IHtcbiAgICAgIGxldCBjID0ge1xuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMDAlKSdcbiAgICAgIH07XG4gICAgICAkKCcjYWN0aXZhdG9yLWNsaWNrJykuYWRkQ2xhc3MoJ2FjdGl2YXRvcicpO1xuICAgICAgJCgnLmNhcmQtcmV2ZWFsJykuY3NzKGMpO1xuICAgIH0pO1xuICAgIHRoaXMuYWpheCgnR0VUJywgJ3B1bGxFZGl0SW5mbycsIHRvRWRpdCwgNSk7XG4gIH1cbiAgLy8gU3RvcHMgdGhlIGZvcm0gZnJvbSBzdWJtaXR0aW5nIGFuZCByZWZyZXNoaW5nIHRoZSBwYWdlXG4gIHN0b3BTdWJtaXQoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gR0VORVJBTCBPTkNMSUNLIFRFU1QgRlVOQ1RJT05cbiAgb25DbGljayhlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gSGlnaGxpZ2h0cyB0aGUgdGFibGUgcGFnZSB0aGUgdXNlciBpcyBvblxuICAvLyBNYWludGFpbnMgdGhlIHN0YXRlIG9mIGN1cnJlbnQgYW5kIHByZXZpb3VzIHBhZ2luYXRpb24gc3RhdGVzXG4gIHBhZ2luYXRpb25PbkNsaWNrKGUpIHtcbiAgICBsZXQgZWwgPSBlLnRhcmdldC5pZDtcbiAgICBsZXQgdmFsID0gcGFyc2VJbnQoZWwuc3BsaXQoJ3BhZycpWzFdKTtcbiAgICAvL2NvbnNvbGUubG9nKHZhbCk7XG4gICAgaWYgKGVsICE9PSB0aGlzLnN0YXRlLmN1clBhZykge1xuICAgICAgJCgnIycrdGhpcy5zdGF0ZS5jdXJQYWcpLnJlbW92ZUNsYXNzKCdfYWN0aXZlJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtwcmV2UGFnOiB0aGlzLnN0YXRlLmN1clBhZ30pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VyUGFnOiBlbH0sICgpID0+IHtcbiAgICAgICAgJCgnIycrdGhpcy5zdGF0ZS5jdXJQYWcpLmFkZENsYXNzKCdfYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBvYmogPSB7XG4gICAgICBwYWdOdW06IHZhbCxcbiAgICAgIGNvbHVtbjogdGhpcy5zdGF0ZS5jb2x1bW4sXG4gICAgICBzb3J0VHlwZTogdGhpcy5zdGF0ZS5zb3J0Q291bnRcbiAgICB9O1xuICAgIHRoaXMuYWpheCgnR0VUJywgJ3BhZ09uQ2xpY2snLCBvYmosIDYpO1xuICB9XG4gIC8vIFNoaWZ0IHRoZSBwYWdpbmF0aW9uIGxlZnQgb3IgcmlnaHQgZGVwZW5kaW5nIG9uIGFycm93IGNsaWNrXG4gIHNoaWZ0T25DbGljayhlKSB7XG4gICAgbGV0IGVsID0gZS50YXJnZXQuaWQ7XG4gICAgbGV0IGN1clN0YXRlID0gcGFyc2VJbnQodGhpcy5zdGF0ZS5jdXJQYWcuc3BsaXQoJ3BhZycpWzFdKTtcbiAgICBsZXQgcHJldlN0YXRlID0gcGFyc2VJbnQodGhpcy5zdGF0ZS5wcmV2UGFnLnNwbGl0KCdwYWcnKVsxXSk7XG4gICAgbGV0IG5ld051bSA9IDA7XG4gICAgbGV0IG5ld1N0YXRlO1xuICAgIHN3aXRjaCAoZWwpIHtcbiAgICAgIGNhc2UgXCJzaGlmdExlZnRcIjpcbiAgICAgICAgLy8gUGFyc2Ugb3V0IG51bWJlciBhbmQgc3VidHJhY3QgaXQgYXMgdGhlIHNoaWZ0IGlzIGdvaW5nIGluIHRoZSBsZWZ0IGRpcmVjdGlvblxuICAgICAgICBuZXdOdW0gPSBwYXJzZUludCh0aGlzLnN0YXRlLmN1clBhZy5zcGxpdCgncGFnJylbMV0pIC0gMTtcbiAgICAgICAgaWYgKG5ld051bSA8IDApIHJldHVybjtcbiAgICAgICAgbmV3U3RhdGUgPSAncGFnJyArIG5ld051bTtcbiAgICAgICAgLy8gU2V0IHRoZSBwcmV2aW91cyBwYWdlIHN0YXRlIHRvIHRoZSBvbGQgb25lXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ByZXZQYWc6IHRoaXMuc3RhdGUuY3VyUGFnfSk7XG4gICAgICAgIC8vIFNldCBuZXcgc3RhdGUgdG8gdGhlIHNoaWZ0ZWQgZG93biBzdGF0ZTsgYWRkL3JlbW92ZSBjbGFzc2VzXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1clBhZzogbmV3U3RhdGV9LCAoKSA9PiB7XG4gICAgICAgICAgJCgnIycrdGhpcy5zdGF0ZS5jdXJQYWcpLmFkZENsYXNzKCdfYWN0aXZlJyk7XG4gICAgICAgICAgJCgnIycrdGhpcy5zdGF0ZS5wcmV2UGFnKS5yZW1vdmVDbGFzcygnX2FjdGl2ZScpO1xuXG4gICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgcGFnTnVtOiBuZXdOdW0sXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuc3RhdGUuY29sdW1uLFxuICAgICAgICAgICAgc29ydFR5cGU6IHRoaXMuc3RhdGUuc29ydENvdW50XG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmFqYXgoJ0dFVCcsICdwYWdPbkNsaWNrJywgb2JqLCA2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNoaWZ0UmlnaHRcIjpcbiAgICAgICAgLy8gUGFyc2Ugb3V0IG51bWJlciBhbmQgYWRkIGl0IGFzIHRoZSBzaGlmdCBpcyBnb2luZyBpbiB0aGUgcmlnaHQgZGlyZWN0aW9uXG4gICAgICAgIG5ld051bSA9IHBhcnNlSW50KHRoaXMuc3RhdGUuY3VyUGFnLnNwbGl0KCdwYWcnKVsxXSkgKyAxO1xuICAgICAgICBpZiAobmV3TnVtID49IHRoaXMuc3RhdGUubWF4Q291bnQpIHJldHVybjtcbiAgICAgICAgbmV3U3RhdGUgPSAncGFnJyArIG5ld051bTtcbiAgICAgICAgLy8gU2V0IHRoZSBwcmV2aW91cyBwYWdlIHN0YXRlIHRvIHRoZSBvbGQgb25lXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ByZXZQYWc6IHRoaXMuc3RhdGUuY3VyUGFnfSk7XG4gICAgICAgIC8vIFNldCBuZXcgc3RhdGUgdG8gdGhlIHNoaWZ0ZWQgZG93biBzdGF0ZTsgYWRkL3JlbW92ZSBjbGFzc2VzXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1clBhZzogbmV3U3RhdGV9LCAoKSA9PiB7XG4gICAgICAgICAgJCgnIycrdGhpcy5zdGF0ZS5jdXJQYWcpLmFkZENsYXNzKCdfYWN0aXZlJyk7XG4gICAgICAgICAgJCgnIycrdGhpcy5zdGF0ZS5wcmV2UGFnKS5yZW1vdmVDbGFzcygnX2FjdGl2ZScpO1xuXG4gICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgcGFnTnVtOiBuZXdOdW0sXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMuc3RhdGUuY29sdW1uLFxuICAgICAgICAgICAgc29ydFR5cGU6IHRoaXMuc3RhdGUuc29ydENvdW50XG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmFqYXgoJ0dFVCcsICdwYWdPbkNsaWNrJywgb2JqLCA2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIG00IGwzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgey8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFRBQlMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL31cbiAgICAgICAgICAgICAgPFRhYnMgLz5cbiAgICAgICAgICAgICAgey8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBDUkVBVEUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi99XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJfYWRkXCI+XG4gICAgICAgICAgICAgICAgICA8QWRkVXNlciBvblN1Ym1pdD17dGhpcy5zdG9wU3VibWl0fSBvbkNsaWNrPXt0aGlzLmFkZFVzZXJ9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFVQREFURSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL31cbiAgICAgICAgICAgICAgPGRpdiBpZD1cIl91cGRhdGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgY2FyZC1sYXJnZVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJhY3RpdmF0b3ItY2xpY2tcIiBjbGFzc05hbWU9XCJjYXJkLXRpdGxlIGdyZXktdGV4dCB0ZXh0LWRhcmtlbi00XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8VGV4dElucHV0IF9jbGFzcz17XCJpbnB1dC1maWVsZFwifSBpZD17XCJ1c2VyRWRpdFwifSBsYWJlbD17XCJOYW1lXCJ9IG9uS2V5VXA9e3RoaXMub25LZXlVcEVkaXR9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IGRhdGE9e3RoaXMuc3RhdGUuZVVzZXJzfSBvbkNsaWNrPXt0aGlzLnNldFVzZXJEYXRhfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLXJldmVhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJkLXRpdGxlIGdyZXktdGV4dCB0ZXh0LWRhcmtlbi00XCI+e3RoaXMuc3RhdGUudXNlcn08aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyByaWdodFwiPmNsb3NlPC9pPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPEVkaXRVc2VyIG9uU3VibWl0PXt0aGlzLnN0b3BTdWJtaXR9IG9uQ2xpY2s9e3RoaXMuZWRpdFVzZXJ9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogREVMRVRFICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovfVxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiX2RlbGV0ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZCBjYXJkLWxhcmdlXCI+XG4gICAgICAgICAgICAgICAgICA8RGVsZXRlVXNlciBvblN1Ym1pdD17dGhpcy5zdG9wU3VibWl0fSBvbkNsaWNrPXt0aGlzLmRlbGV0ZVVzZXJ9IG9uS2V5VXA9e3RoaXMub25LZXlVcERlbGV0ZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxMaXN0IGRhdGE9e3RoaXMuc3RhdGUuZFVzZXJzfSBvbkNsaWNrPXtzZXRWYWx1ZX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZXJyb3ItZGlzbWlzc1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczEyIG04IGw5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzNiBtNCAxMFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0SW5wdXQgX2NsYXNzPXtcImlucHV0LWZpZWxkXCJ9IGlkPXtcInVzZXJTZWFyY2hcIn0gbGFiZWw9e1wiVXNlciBTZWFyY2hcIn0gb25LZXlVcD17dGhpcy5hdXRvQ29tcGxldGlvbn0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPFRhYmxlIF9jbGFzcz17XCJib3JkZXJlZCBoaWdobGlnaHQgY2VudGVyZWQgei1kZXB0aC0yXCJ9XG4gICAgICAgICAgICAgIGlkPXtcInVzZXJEaXNwbGF5XCJ9XG4gICAgICAgICAgICAgIGhlYWRlcnM9e1RhYmxlSGVhZGVyc31cbiAgICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS50YWJsZURhdGF9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc29ydEJ5Q29sdW1uLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFBhZ2luYXRpb24gX2NsYXNzPXtcInBhZ2luYXRpb25cIn1cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wYWdpbmF0aW9uT25DbGlja31cbiAgICAgICAgICAgICAgc2hpZnRPbkNsaWNrPXt0aGlzLnNoaWZ0T25DbGlja31cbiAgICAgICAgICAgICAgbGlzdD17dGhpcy5zdGF0ZS5wYWdMaXN0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8qIEVORCAqL1xuIiwiLypcbiAgRm9ybSB0byBBZGQgdXNlcnNcblxuKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRleHRJbnB1dCwgVGV4dElucHV0MiwgRGF0ZVBpY2tlciwgU3dpdGNoLCBCdXR0b24gfSBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGZ1bmN0aW9uIEFkZFVzZXIocHJvcHMpIHtcbiAgY29uc3QgeyBvblN1Ym1pdCwgb25DbGljayB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkIGNhcmQtbGFyZ2VcIj5cbiAgICAgIDxmb3JtIG9uU3VibWl0PXtvblN1Ym1pdH0+XG4gICAgICAgIDxUZXh0SW5wdXQgaWQ9e1widXNlck5hbWVcIn0gbGFiZWw9e1wiTmFtZVwifSAvPlxuICAgICAgICA8VGV4dElucHV0IGlkPXtcImVtYWlsXCJ9IGxhYmVsPXtcIkVtYWlsXCJ9IC8+XG4gICAgICAgIDxEYXRlUGlja2VyIGlkPXtcImhpcmVEYXRlXCJ9IGxhYmVsPXtcIkRhdGUgb2YgSGlyZVwifSAvPlxuICAgICAgICA8RGF0ZVBpY2tlciBpZD17XCJiaXJ0aERhdGVcIn0gbGFiZWw9e1wiQmlydGhkYXRlXCJ9IC8+XG4gICAgICAgIDxEYXRlUGlja2VyIGlkPXtcInBoeXNpY2FsRGF0ZVwifSBsYWJlbD17XCJEYXRlIG9mIFBoeXNpY2FsXCJ9IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPFN3aXRjaCBfY2xhc3M9e1wic3dpdGNoXCJ9IGlkPXtcImRpZFBoeXNpY2FsXCJ9IGxhYmVsPXtcIkNvbXBsZXRlZCBQaHlzaWNhbFwifSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8QnV0dG9uICBfY2xhc3M9e1wiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwifVxuICAgICAgICAgICAgaWNvbkNscz17XCJtYXRlcmlhbC1pY29ucyByaWdodFwifVxuICAgICAgICAgICAgaWNvbj17XCJzZW5kXCJ9XG4gICAgICAgICAgICBpZD17XCJhZGRVc2VyRGF0YVwifVxuICAgICAgICAgICAgdHlwZT17XCJzdWJtaXRcIn1cbiAgICAgICAgICAgIG1zZz17XCJBZGQgVXNlclwifVxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsIlxuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUZXh0SW5wdXQsIEJ1dHRvbiB9IGZyb20gJy4vaW5wdXQnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBEZWxldGVVc2VyKHByb3BzKSB7XG4gIGNvbnN0IHsgb25TdWJtaXQsIG9uQ2xpY2ssIG9uS2V5VXAgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgICAgPGZvcm0gb25TdWJtaXQ9e29uU3VibWl0fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8VGV4dElucHV0IF9jbGFzcz17XCJpbnB1dC1maWVsZFwifSBpZD17XCJ1c2VyRGVsZXRlXCJ9IGxhYmVsPXtcIk5hbWVcIn0gb25LZXlVcD17b25LZXlVcH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPEJ1dHRvbiAgX2NsYXNzPXtcImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIn1cbiAgICAgICAgICAgIGljb25DbHM9e1wibWF0ZXJpYWwtaWNvbnMgcmlnaHRcIn1cbiAgICAgICAgICAgIGljb249e1wiZGVsZXRlXCJ9XG4gICAgICAgICAgICBpZD17XCJkZWxldGVVc2VyRGF0YVwifVxuICAgICAgICAgICAgdHlwZT17XCJzdWJtaXRcIn1cbiAgICAgICAgICAgIG1zZz17XCJEZWxldGVcIn1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICk7XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8qIEVORCAqL1xuIiwiLypcbiAgRm9ybSB0byBFZGl0IHVzZXJzXG5cbiovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUZXh0SW5wdXQsIERhdGVQaWNrZXIsIFN3aXRjaCwgQnV0dG9uIH0gZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRVc2VyKHByb3BzKSB7XG4gIGNvbnN0IHsgb25TdWJtaXQsIG9uQ2xpY2sgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxmb3JtIG9uU3VibWl0PXtvblN1Ym1pdH0+XG4gICAgICA8VGV4dElucHV0IGlkPXtcImVkaXRFbWFpbFwifSBsYWJlbD17XCJFbWFpbFwifSAvPlxuICAgICAgPERhdGVQaWNrZXIgaWQ9e1wiZWRpdEhpcmVEYXRlXCJ9IGxhYmVsPXtcIkRhdGUgb2YgSGlyZVwifSAvPlxuICAgICAgPERhdGVQaWNrZXIgaWQ9e1wiZWRpdEJpcnRoRGF0ZVwifSBsYWJlbD17XCJCaXJ0aGRhdGVcIn0gLz5cbiAgICAgIDxEYXRlUGlja2VyIGlkPXtcImVkaXRQaHlzaWNhbERhdGVcIn0gbGFiZWw9e1wiRGF0ZSBvZiBQaHlzaWNhbFwifSAvPlxuICAgICAgPFRleHRJbnB1dCAgaWQ9e1wiZWRpdERpZFBoeXNpY2FsXCJ9IGxhYmVsPXtcIkNvbXBsZXRlZCBQaHlzaWNhbFwifSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPEJ1dHRvbiAgX2NsYXNzPXtcImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIn1cbiAgICAgICAgICBpY29uQ2xzPXtcIm1hdGVyaWFsLWljb25zIHJpZ2h0XCJ9XG4gICAgICAgICAgaWNvbj17XCJzZW5kXCJ9XG4gICAgICAgICAgaWQ9e1wiZWRpdFVzZXJEYXRhXCJ9XG4gICAgICAgICAgdHlwZT17XCJzdWJtaXRcIn1cbiAgICAgICAgICBtc2c9e1wiRWRpdCBVc2VyXCJ9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbiAgKTtcbn1cbiIsIi8qXG4gIERpZmZlcmVuY2Ugc3RhdGljIGRhdGEgbGlzdHMgZm9yIGRpZmZlcmVudCBwYXJ0cyBvZiB0aGUgYXBwbGljYXRpb25cblxuKi9cblxuZXhwb3J0IHZhciB1dWlkID0gKCkgPT4geyByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxMikuc2xpY2UoMik7IH1cbnZhciByYW5kb21EYXRlID0gKCkgPT4geyByZXR1cm4gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyMDE2IC0gMjAwMykpICsgMjAwMyk7IH1cbnZhciByYW5kb21BZ2UgPSAoKSA9PiB7IHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzUgLSAxOCkgKyAxOCk7IH1cblxuZXhwb3J0IGNvbnN0IExpbmtzID0gW1xuICB7IGhyZWY6ICdodHRwOi8vaW50ZXJuYWwuZ2VtaW5pLmVkdS9pbmRleC5waHA/cT1kZXZlbG9wbWVudCcsIG5hbWU6ICdEZXZlbG9wbWVudCcgfSxcbiAgeyBocmVmOiAnaHR0cDovL2ludGVybmFsLmdlbWluaS5lZHUvP3E9c2Npb3BzJywgbmFtZTogJ1NjaWVuY2UnIH0sXG4gIHsgaHJlZjogJ2h0dHA6Ly9pbnRlcm5hbC5nZW1pbmkuZWR1L2luZGV4LnBocD9xPWdlbmVyYWwnLCBuYW1lOiAnQWRtaW5pc3RyYXRpb24nIH0sXG4gIHsgaHJlZjogJ2h0dHA6Ly9pbnRlcm5hbC5nZW1pbmkuZWR1L2luZGV4LnBocD9xPXNhZmV0eScsIG5hbWU6ICdTYWZldHknIH0sXG4gIHsgaHJlZjogJ2h0dHA6Ly9pbnRlcm5hbC5nZW1pbmkuZWR1L2l0cy8nLCBuYW1lOiAnSVRTJyB9XG5dO1xuXG5leHBvcnQgY29uc3QgVGFibGVIZWFkZXJzID0gW1xuICB7IG5hbWU6ICdOYW1lJywgaWQ6ICdfbmFtZScgfSxcbiAgeyBuYW1lOiAnRW1haWwnLCBpZDogJ19lbWFpbCcgfSxcbiAgeyBuYW1lOiAnRGF0ZSBvZiBIaXJlJywgaWQ6ICdfaGlyZURhdGUnIH0sXG4gIHsgbmFtZTogJ0RhdGUgb2YgUGh5c2ljYWwnLCBpZDogJ19waHlzaWNhbERhdGUnIH0sXG4gIHsgbmFtZTogJ0NvbXBsZXRlZCBQaHlzaWNhbCcsIGlkOiAnX2RpZFBoeXNpY2FsJyB9LFxuICB7IG5hbWU6ICdBZ2UnLCBpZDogJ19hZ2UnIH0sXG4gIHsgbmFtZTogJ05leHQgUGh5c2ljYWwnLCBpZDogJ19uZXh0UGh5c2ljYWwnIH1cbl07XG5cbmV4cG9ydCBjb25zdCBEdW1teURhdGEgPSBbXG4gIHsgbmFtZTogdXVpZCgpLCBoaXJlRGF0ZTogcmFuZG9tRGF0ZSgpLCBwaHlzaWNhbERhdGU6IHJhbmRvbURhdGUoKSwgZGlkUGh5c2ljYWw6ICdZZXMnLCBuZXh0UGh5c2ljYWw6IHJhbmRvbURhdGUoKSwgYWdlOiByYW5kb21BZ2UoKSB9LFxuICB7IG5hbWU6IHV1aWQoKSwgaGlyZURhdGU6IHJhbmRvbURhdGUoKSwgcGh5c2ljYWxEYXRlOiByYW5kb21EYXRlKCksIGRpZFBoeXNpY2FsOiAnWWVzJywgbmV4dFBoeXNpY2FsOiByYW5kb21EYXRlKCksIGFnZTogcmFuZG9tQWdlKCkgfSxcbiAgeyBuYW1lOiB1dWlkKCksIGhpcmVEYXRlOiByYW5kb21EYXRlKCksIHBoeXNpY2FsRGF0ZTogcmFuZG9tRGF0ZSgpLCBkaWRQaHlzaWNhbDogJ05vJywgbmV4dFBoeXNpY2FsOiByYW5kb21EYXRlKCksIGFnZTogcmFuZG9tQWdlKCkgfSxcbiAgeyBuYW1lOiB1dWlkKCksIGhpcmVEYXRlOiByYW5kb21EYXRlKCksIHBoeXNpY2FsRGF0ZTogcmFuZG9tRGF0ZSgpLCBkaWRQaHlzaWNhbDogJ05vJywgbmV4dFBoeXNpY2FsOiByYW5kb21EYXRlKCksIGFnZTogcmFuZG9tQWdlKCkgfSxcbiAgeyBuYW1lOiB1dWlkKCksIGhpcmVEYXRlOiByYW5kb21EYXRlKCksIHBoeXNpY2FsRGF0ZTogcmFuZG9tRGF0ZSgpLCBkaWRQaHlzaWNhbDogJ1llcycsIG5leHRQaHlzaWNhbDogcmFuZG9tRGF0ZSgpLCBhZ2U6IHJhbmRvbUFnZSgpIH0sXG4gIHsgbmFtZTogdXVpZCgpLCBoaXJlRGF0ZTogcmFuZG9tRGF0ZSgpLCBwaHlzaWNhbERhdGU6IHJhbmRvbURhdGUoKSwgZGlkUGh5c2ljYWw6ICdObycsIG5leHRQaHlzaWNhbDogcmFuZG9tRGF0ZSgpLCBhZ2U6IHJhbmRvbUFnZSgpIH0sXG4gIHsgbmFtZTogdXVpZCgpLCBoaXJlRGF0ZTogcmFuZG9tRGF0ZSgpLCBwaHlzaWNhbERhdGU6IHJhbmRvbURhdGUoKSwgZGlkUGh5c2ljYWw6ICdZZXMnLCBuZXh0UGh5c2ljYWw6IHJhbmRvbURhdGUoKSwgYWdlOiByYW5kb21BZ2UoKSB9LFxuICB7IG5hbWU6IHV1aWQoKSwgaGlyZURhdGU6IHJhbmRvbURhdGUoKSwgcGh5c2ljYWxEYXRlOiByYW5kb21EYXRlKCksIGRpZFBoeXNpY2FsOiAnTm8nLCBuZXh0UGh5c2ljYWw6IHJhbmRvbURhdGUoKSwgYWdlOiByYW5kb21BZ2UoKSB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IE1vbnRocyA9IHtcbiAgJ0phbnVhcnknOiAxLFxuICAnRmVicnVhcnknOiAyLFxuICAnTWFyY2gnOiAzLFxuICAnQXByaWwnOiA0LFxuICAnTWF5JzogNSxcbiAgJ0p1bmUnOiA2LFxuICAnSnVseSc6IDcsXG4gICdBdWd1c3QnOiA4LFxuICAnU2VwdGVtYmVyJzogOSxcbiAgJ09jdG9iZXInOiAxMCxcbiAgJ05vdmVtYmVyJzogMTEsXG4gICdEZWNlbWJlcic6IDEyXG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLyogRU5EICovXG4iLCIvKlxuICBGb290ZXIgZm9yIFNhZmV0eSBhbHRpdHVkZSBhcHBcbiovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5cbmZ1bmN0aW9uIEZvb3Rlcihwcm9wcykge1xuICBjb25zdCB7IGxpc3QgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxmb290ZXIgY2xhc3NOYW1lPVwicGFnZS1mb290ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDYgczEyXCI+XG4gICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwid2hpdGUtdGV4dFwiPkhpZ2ggQWx0aXR1ZGUgVHJhaW5pbmc8L2g1PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZ3JleS10ZXh0IHRleHQtbGlnaHRlbi00XCI+U2FmZXR5IERlcGFydG1lbnQ8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbDQgb2Zmc2V0LWwyIHMxMlwiPlxuICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cIndoaXRlLXRleHRcIj5JbnRlcm5hbCBMaW5rczwvaDU+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsaXN0Lm1hcChsID0+IChcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2wuaHJlZn0+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImdyZXktdGV4dCB0ZXh0LWxpZ2h0ZW4tM1wiIGhyZWY9e2wuaHJlZn0gdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2wubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXItY29weXJpZ2h0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgwqkgMjAxNiBHZW1pbmlcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvb3Rlcj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XG4iLCIvKlxuICBTdGFuZGFyZCBmb3JtIGlucHV0XG4qL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIFRleHRJbnB1dChwcm9wcykge1xuICAgIGNvbnN0IHsgX2NsYXNzLCBfdGV4dCwgaWQsIGxhYmVsLCBvbktleVVwIH0gPSBwcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17X2NsYXNzfT5cbiAgICAgICAgPGxhYmVsIGZvcj17aWR9PntsYWJlbH08L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9e2lkfSB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT17X3RleHR9IG9uS2V5VXA9e29uS2V5VXB9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVGV4dElucHV0Mihwcm9wcykge1xuICAgIGNvbnN0IHsgX2NsYXNzLCBfdGV4dCwgaWQsIGxhYmVsLCBvbktleVVwIH0gPSBwcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgZm9yPXtpZH0+e2xhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBpZD17aWR9IHR5cGU9XCJ0ZXh0XCIgb25LZXlVcD17b25LZXlVcH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRlUGlja2VyKHByb3BzKSB7XG4gICAgY29uc3QgeyBfY2xhc3MsIGlkLCBsYWJlbCB9ID0gcHJvcHM7XG5cbiAgICBsZXQgb25DbGljayA9ICgpID0+IHtcbiAgICAgICQoJyMnK2lkKS5waWNrYWRhdGUoe1xuICAgICAgICBzZWxlY3RZZWFyczogMTUwLFxuICAgICAgICBmb3JtYXQ6ICd5eXl5LW1tLWRkJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17X2NsYXNzfT5cbiAgICAgICAgPGxhYmVsIGZvcj17aWR9PntsYWJlbH08L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9e2lkfSB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImRhdGVwaWNrZXJcIiBvbkNsaWNrPXtvbkNsaWNrfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN3aXRjaChwcm9wcykge1xuICAgIGNvbnN0IHsgX2NsYXNzLCBpZCwgbGFiZWwgfSA9IHByb3BzO1xuXG4gICAgbGV0IG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICBzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS52YWx1ZSkge1xuICAgICAgICBjYXNlICdvbic6XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnZhbHVlID0gJ1llcyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1llcyc6XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnZhbHVlID0gJ05vJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTm8nOlxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS52YWx1ZSA9ICdZZXMnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e19jbGFzc30+XG4gICAgICAgIDxsYWJlbD5Db21wbGV0ZWQgUGh5c2ljYWw8L2xhYmVsPjxiciAvPjxiciAvPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPHNwYW4+Tm88L3NwYW4+XG4gICAgICAgICAgPGlucHV0IGlkPXtpZH0gdHlwZT1cImNoZWNrYm94XCIgb25DbGljaz17b25DbGlja30gLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsZXZlclwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5ZZXM8L3NwYW4+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uKHByb3BzKSB7XG4gICAgY29uc3QgeyBfY2xhc3MsIGljb25DbHMsIGljb24sIGlkLCB0eXBlLCBtc2csIG9uQ2xpY2sgfSA9IHByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtfY2xhc3N9IHR5cGU9e3R5cGV9IGlkPXtpZH0gb25DbGljaz17b25DbGlja30+e21zZ31cbiAgICAgICAgPGkgY2xhc3NOYW1lPXtpY29uQ2xzfT57aWNvbn08L2k+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8qIEVORCAqL1xuIiwiLypcblxuICBVc2VyIGxpc3QgZm9yIG9uS2V5VXAgLyBhdXRvY29tcGxldGVcblxuKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBMaXN0KHByb3BzKSB7XG4gIGNvbnN0IHsgZGF0YSwgb25DbGljayB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHVsIGNsYXNzTmFtZT1cImNvbGxlY3Rpb25cIj5cbiAgICAgIHtcbiAgICAgICAgZGF0YS5tYXAoaSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17aS5uYW1lfSBpZD17aS5uYW1lfSBjbGFzc05hbWU9XCJjb2xsZWN0aW9uLWl0ZW1cIiBvbkNsaWNrPXtvbkNsaWNrfT57aS5uYW1lfTwvbGk+XG4gICAgICAgICkpXG4gICAgICB9XG4gICAgPC91bD5cbiAgKTtcbn1cbiIsIi8qXG4gIE5hdmJhciBhdCBoZWFkIG9mIHByb2plY3RcbiovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBOYXZiYXIgKHByb3BzKSB7XG4gIGNvbnN0IHsgbG9nbywgYXBwIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItZml4ZWRcIj5cbiAgICAgICAgPG5hdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi13cmFwcGVyXCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL3d3dy5nZW1pbmkuZWR1XCIgY2xhc3NOYW1lPVwiYnJhbmQtbG9nb1wiPntsb2dvfTwvYT5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blwiPlxuICAgICAgICAgICAgICA8bGk+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj52ZXJpZmllZF91c2VyPC9pPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT4mbmJzcDsmbmJzcDsmbmJzcDt7YXBwfSZuYnNwOyZuYnNwOyZuYnNwOzwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFBhZ2luYXRpb24ocHJvcHMpIHtcbiAgY29uc3QgeyBfY2xhc3MsIGlkLCBvbkNsaWNrLCBzaGlmdE9uQ2xpY2ssIGxpc3QgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxuICAgICAgPHVsIGNsYXNzTmFtZT17X2NsYXNzfT5cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cIndhdmVzLWVmZmVjdFwiPjxpIGlkPVwic2hpZnRMZWZ0XCIgb25DbGljaz17c2hpZnRPbkNsaWNrfSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPmNoZXZyb25fbGVmdDwvaT48L2xpPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxpc3QubWFwKGwgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtsLmlkfSB2YWx1ZT17bC5udW19IGNsYXNzTmFtZT1cIndhdmVzLWVmZmVjdFwiIGlkPXtsLmlkfSBvbkNsaWNrPXtvbkNsaWNrfT57bC5udW19PC9saT5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwid2F2ZXMtZWZmZWN0XCI+PGkgaWQ9XCJzaGlmdFJpZ2h0XCIgb25DbGljaz17c2hpZnRPbkNsaWNrfSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPmNoZXZyb25fcmlnaHQ8L2k+PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCIvKlxuICBHZW1pbmkgT2JzZXJ2YXRvcnlcbiAgUmVhY3QgVGFibGVcbiAgNi8yOS8xNlxuICBBbGV4YW5kZXIgU2VsZlxuKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlKHByb3BzKSB7XG4gIGNvbnN0IHsgX2NsYXNzLCBpZCwgaGVhZGVycywgZGF0YSwgb25DbGljayB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIj5cbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e19jbGFzc30gaWQ9e2lkfT5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaGVhZGVycy5tYXAoaGVhZGVyID0+IChcbiAgICAgICAgICAgICAgICA8dGgga2V5PXtoZWFkZXIuaWR9IGRhdGEtZmllbGQ9e2hlYWRlci5pZH0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBpZD17aGVhZGVyLmlkfSBvbkNsaWNrPXtvbkNsaWNrfT57aGVhZGVyLm5hbWV9PC9zcGFuPiZuYnNwO1xuICAgICAgICAgICAgICAgICAgPGkgaWQ9e2hlYWRlci5pZH0gb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPVwidGlueSBtYXRlcmlhbC1pY29uc1wiPmxvb3A8L2k+XG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YS5tYXAoaSA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e2kubmFtZX0+XG4gICAgICAgICAgICAgICAgPHRkPntpLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e2kuZW1haWx9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e2kuaGlyZURhdGV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e2kucGh5c2ljYWxEYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPntpLmRpZFBoeXNpY2FsfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPntpLmFnZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzc05hbWU9XCJjaGlwXCI+e2kubmV4dFBoeXNpY2FsfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLyogRU5EICovXG4iLCIvKlxuXG4gIFRhYnMgZm9yIG5hdmlnYXRpbmcgQWRkLCBFZGl0LCBEZWxldGVcblxuKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5leHBvcnQgZnVuY3Rpb24gVGFicyhwcm9wcykge1xuICBjb25zdCB7IF9jbGFzcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwidGFicyB0YWItdGV4dFwiPlxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwidGFiIGNvbCBzM1wiPjxhIGNsYXNzTmFtZT1cInRhYi10ZXh0XCIgaHJlZj1cIiNfYWRkXCI+QWRkPC9hPjwvbGk+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJ0YWIgY29sIHMzXCI+PGEgY2xhc3NOYW1lPVwidGFiLXRleHRcIiBocmVmPVwiI191cGRhdGVcIj5VcGRhdGU8L2E+PC9saT5cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cInRhYiBjb2wgczNcIj48YSBjbGFzc05hbWU9XCJ0YWItdGV4dFwiIGhyZWY9XCIjX2RlbGV0ZVwiPkRlbGV0ZTwvYT48L2xpPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZGljYXRvclwiPjwvZGl2PlxuICAgICAgPC91bD5cbiAgKTtcbn1cbiIsIi8qIEhlbHBlciBmdW5jdGlvbnMgKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldCgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyTmFtZVwiKS52YWx1ZSA9IFwiXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlyZURhdGVcIikudmFsdWUgPSBcIlwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBoeXNpY2FsRGF0ZVwiKS52YWx1ZSA9IFwiXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlydGhEYXRlXCIpLnZhbHVlID0gXCJcIjtcbn1cblxuLy8gU2V0cyB0aGUgdmFsdWUgb2YgdGhlIFRPIEJFIERFTEVURUQgdXNlciBhZnRlciBjbGlja2luZyBhIHNsb3Qgb24gdGhlIGF1dG9jb21wbGV0ZSBsaXN0XG5leHBvcnQgZnVuY3Rpb24gc2V0VmFsdWUoZSkge1xuICBsZXQgdG9EZWxldGUgPSBlLnRhcmdldC5pZDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJEZWxldGUnKS52YWx1ZSA9IHRvRGVsZXRlO1xuICByZXR1cm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYyAoeCkgeyByZXR1cm4geC50b0xvd2VyQ2FzZSgpIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVBZ2UoaWQpIHtcbiAgLy8gQ3VycmVudCBkYXRlIGluZm9cbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgbGV0IG1vbnRoID0gdG9kYXkuZ2V0TW9udGgoKSArIDE7XG4gIGxldCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgbGV0IGRhdGUgPSB0b2RheS5nZXREYXRlKCk7XG5cbiAgLy8gQmlydGhkYXRlIGluZm9cbiAgdHJ5IHtcbiAgICBsZXQgYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS52YWx1ZTtcbiAgICBsZXQgYmlydGhEYXRlID0gbmV3IERhdGUoYik7XG4gICAgbGV0IGFnZSA9IHRvZGF5LmdldEZ1bGxZZWFyKCkgLSBiaXJ0aGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIGxldCBtID0gdG9kYXkuZ2V0TW9udGgoKSAtIGJpcnRoZGF0ZS5nZXRNb250aCgpO1xuXG4gICAgaWYgKG0gPCAwIHx8IChtID09PSAwICYmIHRvZGF5LmdldERhdGUoKSA8IGJpcnRoRGF0ZS5nZXREYXRlKCkpKVxuICAgIHtcbiAgICAgICAgYWdlLS07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFnZTtcblxuICB9IGNhdGNoIChlKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZU5leHRQaHlzaWNhbChhZ2UsIGlkKSB7XG4gIGxldCBkUGh5c2ljYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkudmFsdWU7XG4gIGRQaHlzaWNhbCA9IGRQaHlzaWNhbC5zcGxpdCgnLScpO1xuXG4gIGNvbnN0IGRZZWFyID0gcGFyc2VJbnQoZFBoeXNpY2FsWzBdKTtcbiAgY29uc3QgZE1vbnRoID0gZFBoeXNpY2FsWzFdO1xuICBjb25zdCBkRGF0ZSA9IGRQaHlzaWNhbFsyXTtcblxuICBsZXQgbmV4dFBoeXNpY2FsWWVhciA9IDA7XG4gIGxldCBuZXh0RGF0ZTtcblxuICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIChhZ2UgPD0gMzApOlxuICAgICAgbmV4dFBoeXNpY2FsWWVhciA9IGRZZWFyICsgNTtcbiAgICAgIG5leHREYXRlID0gbmV4dFBoeXNpY2FsWWVhciArICctJyArIGRNb250aCArICctJyArIGREYXRlO1xuICAgICAgcmV0dXJuIG5leHREYXRlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAoYWdlID4gMzAgJiYgYWdlIDw9IDQwKTpcbiAgICAgIG5leHRQaHlzaWNhbFllYXIgPSBkWWVhciArIDM7XG4gICAgICBuZXh0RGF0ZSA9IG5leHRQaHlzaWNhbFllYXIgKyAnLScgKyBkTW9udGggKyAnLScgKyBkRGF0ZTtcbiAgICAgIHJldHVybiBuZXh0RGF0ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgKGFnZSA+IDQwICYmIGFnZSA8PSA1MCk6XG4gICAgICBuZXh0UGh5c2ljYWxZZWFyID0gZFllYXIgKyAyO1xuICAgICAgbmV4dERhdGUgPSBuZXh0UGh5c2ljYWxZZWFyICsgJy0nICsgZE1vbnRoICsgJy0nICsgZERhdGU7XG4gICAgICByZXR1cm4gbmV4dERhdGU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIChhZ2UgPiA1MCk6XG4gICAgICBuZXh0UGh5c2ljYWxZZWFyID0gZFllYXIgKyAxO1xuICAgICAgbmV4dERhdGUgPSBuZXh0UGh5c2ljYWxZZWFyICsgJy0nICsgZE1vbnRoICsgJy0nICsgZERhdGU7XG4gICAgICByZXR1cm4gbmV4dERhdGU7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy9jb25zb2xlLmxvZyhcIkhvdyBkaWQgeW91IGVuZCB1cCBoZXJlXCIpO1xuICAgICAgcmV0dXJuO1xuICB9XG59XG5cbi8vIERhdGUgRm9ybWF0IFlZWVktTU0tRERcbi8qXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUFnZV90ZXN0KGRhdGUpIHtcbiAgaWYgKGRhdGUgPT09ICcnKSByZXR1cm47XG4gIC8vIEN1cnJlbnQgZGF0ZSBpbmZvXG4gIGxldCBkID0gbmV3IERhdGUoKTtcbiAgbGV0IG1vbnRoID0gZC5nZXRNb250aCgpICsgMTtcbiAgbGV0IHllYXIgPSBkLmdldEZ1bGxZZWFyKCk7XG4gIGxldCBkYXRlID0gZC5nZXREYXRlKCk7XG5cbiAgLy8gQmlydGhkYXRlIGluZm9cbiAgdHJ5IHtcbiAgICBsZXQgYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS52YWx1ZTtcbiAgICBiID0gYi5zcGxpdCgnLScpO1xuICAgIGxldCBiWWVhciA9IHBhcnNlSW50KGJbMF0pO1xuICAgIGxldCBiTW9udGggPSBwYXJzZUludChiWzFdKTtcbiAgICBsZXQgYkRhdGUgPSBwYXJzZUludChiWzJdKTtcblxuICAgIGxldCBhZ2UgPSB5ZWFyIC0gYlllYXIgLSAxO1xuICAgIGxldCBkZWMgPSBNYXRoLmFicyhtb250aCAtIGJNb250aCk7XG5cbiAgICBpZiAobW9udGggPiBiTW9udGggJiYgZGF0ZSA+IGJEYXRlKSB7XG4gICAgICBhZ2UrKztcbiAgICB9IGVsc2UgaWYgKG1vbnRoID09PSBiTW9udGggJiYgZGF0ZSA9PT0gYkRhdGUpIHtcbiAgICAgIGFnZSsrO1xuICAgIH1cblxuICAgIHJldHVybiBhZ2U7XG5cbiAgfSBjYXRjaCAoZSkge31cbn1cbiovXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8qIEVORCAqL1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwLmpzJztcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi9jb21wb25lbnRzL25hdmJhcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9mb290ZXInO1xuaW1wb3J0IHsgTGlua3MgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YSc7XG5cblxudmFyIG1haW4gPSAoKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJhZEF1dGhlbnRpY2F0ZVwiKSA+PSAwKSB7XG5cdH0gZWxzZSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJodHRwczovL2FwcHMuZ2VtaW5pLmVkdS9hZEF1dGhlbnRpY2F0ZS9pbmRleC5waHA/X19SRVRVUk5fXz1jem95T0RvaWFIUjBjSE02THk5aGNIQnpMbWRsYldsdWFTNWxaSFV2YUdGd0x5STdcIik7XG4gIH1cbiAgcmVuZGVyKDxOYXZiYXIgbG9nbz17J0dlbWluaSd9IGFwcD17J0hpZ2ggQWx0aXR1ZGUgVHJhaW5pbmcgQXBwJ30gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXInKSk7XG4gIHJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcbiAgcmVuZGVyKDxGb290ZXIgbGlzdD17TGlua3N9IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdCcpKTtcbn0pO1xuXG5tYWluKCk7XG4iXX0=
