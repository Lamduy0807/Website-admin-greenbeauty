import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { postLogin } from "../API/Network";
import { UserContext } from "../Context/UserContext/UserContext";
import { useHistory, useLocation } from "react-router-dom";
const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const {setIsLogin} = useContext(UserContext)
  const handleLogin = () =>{
    postLogin(email, password).then((res) => {
      if (res.status === 401)
        alert("Error: Wrong email or password, please enter again");
      else if (res.status === 500)
        alert(
          "Error: Account has not verified yet, please check register mail again"
        );
      else{
        if(res.is_staff)
        {
          signIn(res.tokens, res.id);
          setIsLogin(true)
          history.replace(from);
        }
        else
        alert(
          "you must login by admin account"
        );

      }
    });
  }
  return (
    <div className="Login">
      <div className="Login__container">
        <form className="login__form">
          <h1 className="login__form__h1">Welcome to Admin GreenBeauty</h1>
          <div className="login__form__realtive">
            <input
              className="login__form__input"
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bx-envelope login__form__i"></i>
          </div>
          <div className="login__form__realtive">
            <input
              className="login__form__input"
              type="password"
              placeholder="Nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bx-lock-alt login__form__i"></i>
          </div>
          <div className="login__form__button">
            <div className="login__form__button--btn" onClick={handleLogin}>Đăng nhập</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
