import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext, { AuthContextType } from "../context/AuthContext";

const Navigation = () => {
  const auth = useContext(AuthContext) as AuthContextType;

  return (
    <nav>
      <ul>
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <>
            <li>
              <NavLink to="/todos">Home</NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        {auth.isLoggedIn ? (
          <li>
            <NavLink to="/login" onClick={auth.logout} className="logout-link">
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {!auth.isLoggedIn ? (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        ) : (
          <li></li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
