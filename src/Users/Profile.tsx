import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });

    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
        const save = async () => {
            await client.updateUser(profile);
        };
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };

    useEffect(() => {
        fetchProfile();
    }, []);
    const save = async () => {
        await client.updateUser(profile);
    };

    return (
        <div>
            <h1>Profile</h1>

            <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning" style={{ width: '300px' }}>
      Users
    </Link>


            {profile && (
                <div>
                    <input value={profile.username} placeholder="Username" className="form-control" style={{ width: '300px', marginTop: "10px" }} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />
                    <input value={profile.password} placeholder="Password" className="form-control" style={{ width: '300px', marginTop: "10px" }} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />
                    <input value={profile.firstName} placeholder="First Name" className="form-control" style={{ width: '300px', marginTop: "10px" }} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />
                    <input value={profile.lastName} placeholder="Last Name" className="form-control" style={{ width: '300px', marginTop: "10px" }} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />
                    <input value={profile.dob} placeholder="Date of Birth" className="form-control" style={{ width: '300px', marginTop: "10px" }} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })} />
                    <input value={profile.email} placeholder="Email" className="form-control" style={{ width: '300px', marginTop: "10px" }} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />

                    <select className="form-select" style={{ width: '300px', marginTop: "10px" }} onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}
                    >
                        <option className="form-select" value="USER">User</option>
                        <option className="form-select" value="ADMIN">Admin</option>
                        <option className="form-select" value="FACULTY">Faculty</option>
                        <option className="form-select" value="STUDENT">Student</option>
                    </select>


                </div>

            )}
<div className="row">
  <div className="col">
    <button onClick={save} className="btn btn-primary mb-2" style={{ width: '300px', marginTop: '10pt' }}>
      Save
    </button>
  </div>
</div>
<div className="row">
  <div className="col">
    <button onClick={signout} className="btn btn-danger mb-2" style={{ width: '300px' }}>
      Signout
    </button>
  </div>
</div>
  </div>



    );
}
