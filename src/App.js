import { Global } from "@emotion/react";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Reset } from "./styles/Global/reset";
import Register from "./pages/Register/Register";
// import Callback from "./study/Callback";
// import PromiseStudy from "./study/PromiseStudy";
import Main from "./pages/Main/Main";
import AuthRouteReactQuery from "./components/Routes/AuthRoute/AuthRouteReactQuery";
import BookDetail from "./pages/BookDetail/BookDetail";

/**
 * 인증절차
 * 
 * AuthRoute 구현하기위해 localstoarge에 토큰이 있어야함
 * AuthRoute -> 토큰의 유효성 검사 -> 토큰이 유효하면 /main으로 유효하지않으면 /login으로 보냄
 * /login, /register등 주소창 입력시 새로 들어감 그 후 재렌더링 (라우터를 타고 들어가는것과 다름)
 * Auth에서 비동기로 reactquery실행시 전역상태 저장 /주소창에 입력시 상태가 초기화됨
 * 
 * 로그인 성공시 atom에 false 줌
 * 마운트: 다시 렌더링함  마운트시 useEffect가 자동으로 동작
 * useeffect가 false를 true로 변환
 * 
 * 
 * Recoil 동기처리
 * ReactQuery, axios 비동기처리   axios = promise를 리턴 promise안에서는 순차적으로 동작(비동기처리를 순차적으로) promise(콜백)
 * usequery = 전역상태 관리  recoil과 reactquery 두가지로 나뉜다 (비동기)
 * 
 * 
 * 
 * await이 있으면 갔다가 오고 처리
 * 
 * **상태가 변했을때 재렌더링이 일어난다**
 * 
 * 0424
 * 사용자
 * 도서 조회 (검색, 페이징)
 * 도서 대여
 * 도서 반납
 * 도서 좋아요
 * 
 * 관리자 (CRUD구현)
 * 도서 등록
 * 도서 조회(검색, 번호 페이징)
 * 도서 수정
 * 도서 삭제
 *
 */

function App() {

  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/login" element={ <AuthRouteReactQuery path ="/login" element={<Login />}/>} />
        <Route path="/register" element={<AuthRouteReactQuery path ="/register" element={<Register />}/>} />
        <Route path="/" element={<AuthRouteReactQuery path ="/" element={<Main />}/>} /> 
        <Route path="/book/:bookId" element={<AuthRouteReactQuery path ="/book" element={<BookDetail />}/>} /> 
        <Route path="/admin/search" element={ <AuthRouteReactQuery path ="/" element={<Main />}/>
        } />
   
{/* 
        /* <Route path="/callback" Component={Callback} />
        <Route path="/promise" Component={PromiseStudy} /> */ }
      </Routes>
    </>
  );
}

export default App;
