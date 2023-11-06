<<<<<<< HEAD
import { useState } from "react";
=======
import React from "react";
>>>>>>> main
import { useFormik } from "formik";
import "./style.css";
import { Button } from "react-bootstrap";
import { loginSchema } from "./loginSchema";
import { useAuth } from "../../security/AuthContext";
import { useNavigate } from "react-router-dom";
import { app_main_graphic } from "../../utils/constants";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const authContext = useAuth();

  const [err, setErr] = useState(false);

=======
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useAuth();

>>>>>>> main
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
<<<<<<< HEAD
        setErr(false);

        if (await authContext.login(values.email, values.password)) {
          navigate("/gallery");
        } else {
          alert("Your email or password is incorrect");
=======
        if (await authContext.login(values.email, values.password)) {
          navigate("/home");
        } else {
          action.resetForm();
>>>>>>> main
        }
      },
    });

  return (
    <div>
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mt-4">Log in</p>
<<<<<<< HEAD
                    {err && (
                      <small className="text-danger mt-1">
                        Email or Password is incorrect
                      </small>
                    )}
=======
>>>>>>> main
                    <form onSubmit={handleSubmit}>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            className="form-control"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <small className="text-danger mt-1">
                              {errors.email}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            className="form-control"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.password && touched.password ? (
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-center actionButtons">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSubmit}
                          >
                            Log In
                          </Button>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <br />
                        <div className="col text-right">
                          Don't have an account? <a href="/register">Sign Up</a>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={app_main_graphic} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
