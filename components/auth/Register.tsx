import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from "../../context/AuthContext";

const Register = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [formData2, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData2;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData2, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let data = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        // "http://todo-backend-m1by.onrender.com:4000/register",
        data,
        config
      );
      localStorage.setItem("token", response.data.token);

      let decodeddata = decode(response.data.token);
      console.log(decodeddata);
      auth.login();
      navigate("/");
    } catch (e: any) {
      console.log("error ", e.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Sign Up</h1>
          <p>Create Your Account</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                required
                value={username}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="d-flex flex-row mt-4">
              <button type="submit" className="btn btn-primary mx-2">
                Register
              </button>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
