"use client";

import { myAppHook } from "@/context/AppProvider";
import React, { useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [formdata, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  // Use the context hook
  const { login, register } = myAppHook();

  // Handle input changes
  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    debugger;
    event.preventDefault();
    debugger;
    try {
      if (isLogin) {
        debugger;
        await login(formdata.username, formdata.password);
      } else {
        if (formdata.username && formdata.password) {
          await register(
            formdata.username,
            formdata.email,
            formdata.password,
            formdata.first_name,
            formdata.last_name,
            formdata.phone
          );
        } else {
          console.log("Please fill in all required fields.");
        }
      }
    } catch (error) {
      console.error(`Authentication Error: ${error}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h3 className="text-center">{isLogin ? "Login" : "Register"}</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-control mb-2"
            name="username"
            value={formdata.username}
            onChange={handleOnChangeInput}
            type="text"
            placeholder="Username"
            required
          />
            {!isLogin && (
            <input
              className="form-control mb-2"
              name="email"
              type="email"
              value={formdata.email}
              onChange={handleOnChangeInput}
              placeholder="Email"
              required
            />
          )}
          {!isLogin && (
            <input
              className="form-control mb-2"
              name="first_name"
              value={formdata.first_name}
              onChange={handleOnChangeInput}
              type="text"
              placeholder="First Name"
              required
            />
          )}
          {!isLogin && (
            <input
              className="form-control mb-2"
              name="last_name"
              value={formdata.last_name}
              onChange={handleOnChangeInput}
              type="text"
              placeholder="Last Name"
              required
            />
          )}
           {!isLogin && (
            <input
              className="form-control mb-2"
              name="phone"
              value={formdata.phone}
              onChange={handleOnChangeInput}
              type="text"
              placeholder="Enter Phone"
              required
            />
          )}
          <input
            className="form-control mb-2"
            name="password"
            value={formdata.password}
            onChange={handleOnChangeInput}
            type="password"
            placeholder="Password"
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: "pointer" }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
