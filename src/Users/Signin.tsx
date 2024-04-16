import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div>
      <h1>Signin</h1>
      <input value={credentials.username} className="form-control" placeholder="Username" style={{ width: '300px' }} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
      <input value={credentials.password} type="password" placeholder="Password" className="form-control" style={{ width: '300px', marginTop: "10px"}} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
      <button onClick={signin} className="btn btn-primary" style={{ width: '300px', marginTop: "10px"}}> Signin </button>
    </div>
  );
}

