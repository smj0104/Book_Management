import React from 'react';
import { Navigate } from 'react-router-dom';
import { authenticatedState } from '../../../atoms/Auth/AuthAtoms';
import { useRecoilState } from 'recoil';
import axios from 'axios';


const validateToken = async (accessToken) => {
    const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});//변수명 자체가 ket값으로 잡히고 자동으로 뒤의 값이 value로 잡히다
    return response.data; //response로 응답을 받아옴(true false값으로)
}

const AuthRoute = ({ path, element }) => {    //filter역할을 함  async달 경우 return이 promise
    const [ authenticated, setAuthenticated ] = useRecoilState(authenticatedState);
    const permitAll = ["/login", "/register", "/password/forgot"];

    if(!authenticated) {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken !== null) {   //null이 아니면 로컬 스토리지에 토큰이 저장된것(토큰이 있다)
            validateToken(accessToken).then((flag) => {  //비동기처리
                setAuthenticated(flag);  //사용가능 토큰은 true 아니면 false
            });
            if(authenticated) {
                return element;
            }
            console.log("페이지 이동 테스트")
            return <Navigate to={path} />;
        }
        if(permitAll.includes(path)) {
            return element;
        }

        return <Navigate to="/login "/>;  //전역상태는 새로고침시 사라짐
    
    }

    if(permitAll.includes(path)) {
        return <Navigate to="/" />;
    }

    return element;  
}

export default AuthRoute;