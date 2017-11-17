import React from 'react';

const UserAddForm = (props) => {
  return (
    <form className="form-inline" onSubmit={props.addUsers}>
      <input type="text" className="form-control margin-right-10" value={props.defaultValue} onChange={props.storeDetailsInReact} placeholder="User name" />
      <button type="submit" className="btn btn-primary"><i className="glyphicon glyphicon-plus"></i> Add User</button>
    </form>
  )
}

export default UserAddForm;
