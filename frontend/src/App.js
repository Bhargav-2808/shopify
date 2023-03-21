import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Shop from "./Pages/Shop/Shop";

const App = () => {
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    token = sessionStorage.getItem("token");
  }, [token]);

  return (
    <>
      <Routes>
        {token === null || token === undefined ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<Shop />} />
        )}
      </Routes>
    </>
  );
};

export default App;
