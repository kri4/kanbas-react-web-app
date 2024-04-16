import React, { useState, useEffect } from "react";
import {
  BsFillCheckCircleFill, BsPencil,
  BsTrash3Fill, BsPlusCircleFill,
} from "react-icons/bs";

import * as client from "./client";
import { User } from "./client";
export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER" });
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

    const selectUser = async (user: User) => {
      try {
        const u = await client.findUserById(user._id);
        setUser(u);
      } catch (err) {
        console.log(err);
      }
    };
    const updateUser = async () => {
      try {
        const status = await client.updateUser(user);
        setUsers(users.map((u) =>
          (u._id === user._id ? user : u)));
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <h1>User Table</h1>
      <table className="table">
        <thead>
          <tr>
            <td>
            <tr> Username </tr>
            <div className="row">
  <div className="col">
    <input 
      value={user.username} 
      className="form-control mx-100" 
      style={{ width: '200px' }} 
      onChange={(e) => setUser({ ...user, username: e.target.value })}
    />
  </div>
  <td>
  <tr> Password </tr>

  <div className="col">
    <input 
      value={user.password} 
      className="form-control mx-100" 
      style={{ width: '200px' }} 
      onChange={(e) => setUser({ ...user, password: e.target.value })}
    />
    
  </div>
  </td>
</div>

            </td>
            <td>
            <tr> First Name </tr>
              <input value={user.firstName} className="form-control" style={{ width: '200px'}} onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
            <tr> Last Name </tr>
              <input value={user.lastName} className="form-control" style={{ width: '200px'}} onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
            <tr> Role </tr>

              <select value={user.role} className="form-select" style={{ width: '200px', marginTop: "10px" }} onChange={(e) =>
                setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
            <BsFillCheckCircleFill
      onClick={updateUser}
      className="me-2 text-success fs-1 text"
    />
    <BsPlusCircleFill
      onClick={createUser}
      className="text-success fs-1 text"
    />            </td>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button onClick={() => deleteUser(user)} className="btn btn-danger">
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2" style={{marginLeft: "10px"}}>
      <BsPencil onClick={() => selectUser(user)} />
    </button>

              </td>

            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

