import React, {useState} from "react";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "../../config/firebase";
import {NavDropdown} from "react-bootstrap";

const Logout = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <div>
      <NavDropdown.Item disabled={disabled} onClick={logout}>
        Logout
      </NavDropdown.Item>
    </div>
  );
};

export default Logout;
