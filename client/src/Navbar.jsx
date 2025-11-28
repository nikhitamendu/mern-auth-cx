import { AuthContext } from "./context/AuthContext";   //updated according to authcontext.js
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      {!user ? (
        <>
          <Link to="/register">Register</Link>   
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logoutUser}>Logout</button>
        </>
      )}
    </>
  );
}   
