import React from "react";
import LogInForm from "./components/LogInForm";
import Header from "./../../Layout/header";

const LogIn = () => (
  <div>
    <Header />
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              <span className="account__logo">
                <span>
                  <img
                    class="topbar__logo-img"
                    src="/img/logo.jpg"
                    alt="avatar"
                  ></img>
                </span>
                <span className="account__logo-accent">&nbsp;deTAGtive</span>
                <span className="account__logo-word"> logistics</span>
              </span>
            </h3>
          </div>
          <LogInForm onSubmit />
        </div>
      </div>
    </div>
  </div>
);

export default LogIn;
