import React from "react";
import {useHistory} from "react-router-dom";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
const Profile = () => {
    const { logout, user } = useAuth();
    const history = useHistory();

    const clickHandler=()=>{
        logout().then(_=>history.push("/"));
    }

    if(!user){
        history.push("/login");
    }
    return (
        <div className="logout-container">
            <span className="logout" onClick={clickHandler}>Logout</span>
        </div>
    )
}

export default Profile;