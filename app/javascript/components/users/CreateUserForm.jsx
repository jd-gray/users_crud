import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../routers/AppRouter";
import Modal from "./Modal";

const CreateUserModal = ({ hideModal }) => {
  const history = useHistory();
  const usersState = useUserContext();
  const [user, setUser] = useState({name: "", email: "", phone: "", title: "", status: ""});

  const { users, setUsers } = usersState;
  const userData = users.data.users;

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/v1/users`, { user: { name: user.name, email: user.email, phone: user.phone, title: user.title, status: user.status } })
      .then((response) => {
        hideModal();
        history.push(`?p=`);
        setUsers({ data: { users: [response.data, ...userData] } })
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <Modal hideModal={hideModal} title="Create User">
      <form onSubmit={handleSubmit}>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Phone</label>
            <div className="control">
              <input className="input" type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" placeholder="Title" value={user.title} onChange={handleChange} />
            </div>
          </div>
          <div className="control">
            <label className="radio">
              <input type="radio" name="status" value="active" checked={user.status === "active"} onChange={handleChange} />
              Active
            </label>
            <label className="radio">
              <input type="radio" name="status" value="inactive" checked={user.status === "inactive"} onChange={handleChange}/>
              Inactive
            </label>
          </div>
        </section>
        <footer className="modal-card-foot">
          <input className="button is-primary" type="submit" value="Submit" />
          <button className="button" onClick={hideModal}>Cancel</button>
        </footer>
      </form>
    </Modal>
  )
}

export default CreateUserModal;