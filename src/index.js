import React from 'react';
import ReactDom from 'react-dom';
import BasicExample from './components/BasicExample.js';
import SingleUserRow from './components/SingleUserRow.js';
import UserAddForm from './components/UserAddForm.js';

import $ from 'jquery';

import './assets/css/bootstrap.min.css';
import './assets/css/custom.css';

class Userstate extends React.Component {
  constructor() {
    super();
    this.storeDetailsInReact = this.storeDetailsInReact.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      user: [
        { 'name': 'Goyani Naresh', 'user_id': '1', 'status': 1 },
        { 'name': 'Ketan Pansheriya', 'user_id': '2', 'status': 0 },
        { 'name': 'Chirag Kheni', 'user_id': '3', 'status': 0 },
        { 'name': 'Jay Bodrya', 'user_id': '4', 'status': 1 },
      ],
      currentUser: '',
      lastId: 5,
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      dataType: 'json',
      success: (res) => {
        this.setState({
          user: res
        })
      }
    })
  }

  storeDetailsInReact(current) {
    this.setState({
      currentUser: current.target.value,
    })
  }

  updateUser(index, newValue) {
    var users = this.state.user;
    users[index]['name'] = newValue;
    this.setState({
      user: users
    })
  }

  addUsers(evt) {
    evt.preventDefault();
    var users = this.state.user;
    var currentUser = this.state.currentUser;
    var lastId = this.state.lastId;
    users.push({ 'name': currentUser, 'user_id': lastId, 'status': 0 });
    this.setState({
      user: users,
      currentUser: '',
      lastId: lastId + 1,
    })
  }

  removeRow(index) {
    var users = this.state.user;
    users.splice(index, 1);
    this.setState({
      user: users,
    })
    //console.log(index);
  }


  /* Render Users */
  render() {
    return (
      <div className="booststrap_react">
        <div className="text-left table_header">
          <h2>state of users</h2>
        </div>
        <div className="text-right tbl_add_btn_handler">
          <UserAddForm
            storeDetailsInReact={this.storeDetailsInReact}
            defaultValue={this.state.currentUser}
            addUsers={this.addUsers}
          />
        </div>
        <table className="table table-striped wrp_border_1_px">
          <thead>
            <tr>
              <th>Username</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.user.map((single_user, index) => {
                return <SingleUserRow index={index} updateUser={this.updateUser} removeRow={this.removeRow} key={single_user.user_id} userDetails={single_user} />
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

ReactDom.render(<Userstate />, document.getElementById('set_user_lists'));
