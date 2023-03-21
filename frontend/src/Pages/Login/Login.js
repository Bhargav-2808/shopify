import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import loginShop from "../../redux/thunk/loginThunk";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const Login = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  const [shopName, setShopName] = useState("");
  const [searchParams, setSearchParams] = useState();
  const dispatch = useDispatch();

  const nav = useNavigate();

  const { user, login, error } = useSelector((state) => state.login);
  const submit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("shopName", shopName);

    dispatch(loginShop(shopName));
  };

  if (user) {
  }

  useEffect(() => {
    if (query.get("token")) {
      setSearchParams(query.get("token"));
      sessionStorage.setItem("token", query.get("token"));
      window.location.href = "http://localhost:3000";
    }
  }, [searchParams]);

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => submit(e)}>
          <div className="card">
            <h3 className="singup">Shop Login</h3>
            <input
              type="text"
              name="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="inputBox"
              placeholder="myfirstapp"
            />
            <button className="enter" type="submit">
              {" "}
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
