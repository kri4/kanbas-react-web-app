import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err : any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input value={user.username} className="form-control" placeholder="Username" style={{ width: '300px' }} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input value={user.password} type="password" placeholder="Password" className="form-control" style={{ width: '300px', marginTop: "10px"}} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button className="btn btn-primary" style={{ width: '300px', marginTop: "10px"}} onClick={signup}> Signup </button>
    </div>
  );
}

