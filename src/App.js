import { Global } from "@emotion/react";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Reset } from "./styles/Global/reset";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route  exact path="/login" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
