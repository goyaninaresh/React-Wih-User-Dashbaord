import React from 'react';

class SingleUserRow extends React.Component {
  /* Render Users */

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
    this.GetFormHTMl = this.GetFormHTMl.bind(this);
    this.GetTRHTMl = this.GetTRHTMl.bind(this);
    this.ToggleState = this.ToggleState.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(evt) {
    evt.preventDefault();
    this.props.updateUser(this.props.index, this.enteredUserName.value);
    this.ToggleState();
  }

  GetFormHTMl() {
    return (
      <tr className={this.props.userDetails.status === 1 ? 'success' : 'danger'}>
        <td colSpan="3">
          <form onSubmit={this.updateItem}>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td><input ref={(value) => { this.enteredUserName = value }} className="form-control" defaultValue={this.props.userDetails.name} /></td>
                  <td><button type="submit" className="btn btn-success"><i className="glyphicon glyphicon-edit"></i> Update User</button></td>
                </tr>
              </tbody>
            </table>
          </form>
        </td>
      </tr>
    )
  }

  ToggleState() {
    const isEditing = this.state.isEditing;
    this.setState({
      isEditing: !isEditing
    })
  }

  GetTRHTMl() {
    return (
      <tr className={this.props.userDetails.status === 1 ? 'success' : 'danger'}>
        <td>{this.props.userDetails.name}</td>
        <td>{this.props.userDetails.status === 1 ? 'Active' : 'InActive'}</td>
        <td>
          <button type="button" onClick={() => this.ToggleState()} className="btn btn-success margin-right-10">Edit</button>
          <button type="button" onClick={() => this.props.removeRow(this.props.index)} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  }

  render() {
    const isEditing = this.state.isEditing;
    return (
      !isEditing ? this.GetTRHTMl() : this.GetFormHTMl()
    )
  }
}

export default SingleUserRow;
