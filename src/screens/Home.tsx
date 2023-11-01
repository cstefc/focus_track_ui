import { useEffect } from "react";
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";
import { auth, Providers } from "../config/firebase";

interface Props {}

const Home = ({}: Props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Center>
        <h1>Welcome {auth.currentUser?.displayName}!</h1>
      <Logout />
    </Center>
  );
};

export default Home;
