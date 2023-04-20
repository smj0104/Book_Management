import { Global } from "@emotion/react";
import { Navigate, Route,Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Reset } from "./styles/Global/reset";
import Register from "./pages/Register/Register";
import Callback from "./study/Callback";
import PromiseStudy from "./study/PromiseStudy";
import Main from "./pages/Main/Main";
import AuthRoute from './components/Routes/AuthRoute/AuthRoute';
import { useRecoilValue } from "recoil";
import { authenticated } from "./index";


function App() {

  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route  exact path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={  
        <AuthRoute authenticated={useRecoilValue(authenticated)} element={<Main />}/>  //강제로 로그인 페이지 302error
        }/>
   
{/* 
        /* <Route path="/callback" Component={Callback} />
        <Route path="/promise" Component={PromiseStudy} /> */ }
      </Routes>
    </>
  );
}

export default App;
