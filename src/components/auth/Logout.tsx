import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

interface Props {
  navigateTo?: string;
}

const Logout = ({ navigateTo = "/login" }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate(navigateTo);
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <div>
      <Button variant="primary" className="mr-1" disabled={disabled} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
