import axios from "axios";
import React, { useState } from "react";

const RegisterModal = () => {
  const [email, setEmail1] = useState("");
  const [password, setPassword1] = useState("");
  const [password_confirmation, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [registerError, setRegisterError] = useState("");
//   function applyClickToElement(elementId, callback) {
//     const element = document.getElementsByClassName("btn-close").click();

//   }
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", {
        email,
        password,
        name,
        password_confirmation,
      });

      setRegisterError(" ");
      var registerCloseButton = document.getElementById("registerClose");
      var logInOpenButton = document.getElementById("logInOpen");
    
      // Close the registerClose button
      registerCloseButton.click();
    

    } catch (error) {
      if (error.response && error.response.data) {
        const registerErrorData = error.response.data;
        const emailError = registerErrorData.email
          ? registerErrorData.email[0]
          : "";
        const passwordError = registerErrorData.password
          ? registerErrorData.password[0]
          : "";
        const nameError = registerErrorData.name
          ? registerErrorData.name[0]
          : "";
        const passwordConfirmationError =
          registerErrorData.password_confirmation
            ? registerErrorData.password_confirmation[0]
            : "";
        const errorMessage = `${emailError} ${passwordError} ${nameError} ${passwordConfirmationError}`;
        if (error.response.status === 401) {
          setRegisterError("Unauthorized access");
        } else {
          setRegisterError(errorMessage);
        }
      } else {
        setRegisterError("Unknown error");
      }
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="RegisterModal"
        tabindex="-1"
        aria-labelledby="RegisterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="RegisterModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="registerClose"
              ></button>
            </div>
            <form onSubmit={handleRegister}>
              <div className="modal-body">
                <div align="right" id="error">
                  {" "}
                  {registerError}
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail1(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password_confirmation}
                    onChange={(e) => setPassword2(e.target.value)}
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
    </div>
  );
};

export default RegisterModal;
