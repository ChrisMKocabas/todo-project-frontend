import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext, { AuthContextType } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formValid = true;
    let emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (formData.email === "") {
      formValid = false;
      setEmailError("Please enter email");
    } else if (!formData.email.match(emailPattern)) {
      formValid = false;
      setEmailError("Please enter email in valid format");
    } else {
      formValid = true;
      setEmailError("");
    }

    if (formValid) {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          // "http://localhost:4000/auth",
          "https://todo-backend-m1by.onrender.com/auth",
          formData,
          config
        );
        localStorage.setItem("token", response.data.accessToken);
        auth.login();
        navigate("/todos");
      } catch (err: any) {
        setError(err.response.data.errors || "Something went wrong");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Sign In</h1>
          <p>Sign Into Your Account</p>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) => onChange(e)}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="d-flex flex-row mt-4">
              <button type="submit" className="btn btn-primary mx-2">
                Login
              </button>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
