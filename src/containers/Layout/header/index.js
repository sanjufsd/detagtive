import React from 'react';
const  logo = `${process.env.PUBLIC_URL}/img/logo.jpg`;

export default function Header (){
    return(
        <div className="topbar">
            <div className="topbar__wrapper">
            <img className="topbar__logo-img" src={logo} alt="avatar" />
            <div className="account__head">
          <h3 className="account__title">
            <span className="account__logo"> 
              <span className="account__logo-accent">deTAGtive</span>
              <span className="account__logo-word"> logistics</span>
            </span>
          </h3>
        </div>
             </div>
        </div>
    )
}