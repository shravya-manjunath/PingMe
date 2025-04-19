import React from "react";
import { Link } from "react-router-dom";
import './style.css'

function Index() {
  return (
    <div className="continer">
      <div className="margin16 padding2">
        <img src="/cover.jpg"></img>
      </div>
      <div className="margin16 padding2">
        <h2>Chart your course through data and discover new possibilities</h2>
        <div>
          <Link to={'/login'} className="btn btn-primary margin5" href="./login.html" role="button">
            Login
          </Link>
          <Link to={'/signup'} className="btn btn-primary margin5" href="./signup.html" role="button">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
