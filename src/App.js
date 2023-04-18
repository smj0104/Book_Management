import { Global } from "@emotion/react";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Reset } from "./styles/Global/reset";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route  exact path="/login" Component={Login} />
        <Route path="/register" Component={Register} />

      </Routes>
    </>
  );
}

export default App;
