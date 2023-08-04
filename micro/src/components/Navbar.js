import axios from "axios";
import React, { useState } from "react";
import Reg from "./RegisterModal";
import Add from "./Add";
const Navbar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { access_token } = response.data;
      localStorage.setItem("jwtToken", access_token);
      window.location.href = "/";
      setErrorText(" ");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log(errorData);
        const emailError = errorData.email ? errorData.email[0] : "";
        const passwordError = errorData.password ? errorData.password[0] : "";

        const errorMessage = `${emailError} ${passwordError}`;

        if (error.response.status === 401) {
          setErrorText("Unauthorized access");
        } else {
          setErrorText(errorMessage);
        }
      } else {
        setErrorText("Unknown error");
      }
    }
  };
  const isLoggedIn = () => {
    const token = localStorage.getItem("jwtToken");
    return !!token;
  };
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
    
      localStorage.removeItem("jwtToken");
      window.location.href = "/";
      setErrorText(" ");
    } catch (error) {}
  };
  return (
    <div>
      <div>
        {isLoggedIn() ? (
          <div style={{ marginTop: "50px", marginLeft: "1300px" }}>
            <button className="btn btn-primary" id="logInOpen" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn btn-primary" id="logInOpen" data-bs-toggle="modal"
              data-bs-target="#RegisterPostModal">
              Add Post
            </button>
          </div>
        ) : (
          <div style={{ marginTop: "50px", marginLeft: "1300px" }}>
            <button
              data-bs-toggle="modal"
              data-bs-target="#FormModal"
              className="btn btn-primary"
            >
              Login
            </button>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#RegisterModal"
            >
              Register
            </button>
          </div>
        )}
      </div>
      {/* login Model */}

      <div
        className="modal fade"
        id="FormModal"
        tabindex="-1"
        aria-labelledby="FormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="FormModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="modal-body">
                <div align="right">
                  {" "}
                  <pre dangerouslySetInnerHTML={{ __html: errorText }} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="Submit" className="btn btn-primary">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Register Model */}
      <Reg />
      <Add />
    </div>
  );
};

export default Navbar;
