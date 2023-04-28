import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query'; //상태를 계속 유지시킴(알아서 토큰을 가지고 옴)
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../../atoms/Auth/AuthAtoms';

const AuthRouteReactQuery = ({ path, element }) => {    //filter역할을 함  async달 경우 return이 promise 
    const [ refresh, setRefresh ] = useRecoilState(refreshState);
    const { data, isLoading } = useQuery(["authenticated"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
        return  response;     
    }, {
        enabled: refresh
    });

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/principal", {params: {accessToken}})
        return response;
    },{
        enabled: !!localStorage.getItem("accessToken")
    });


    useEffect(() => {
        if(!refresh) {
            setRefresh(true);
        }
    }, [refresh]);

    if(isLoading) {
        console.log("test")
        return (<div>로딩중...</div>);
    }

    if(principal.data !== undefined) {
        const roles = principal.data.data.authorities.split(",");
        // const hasAdminPath = path.substr(0, 6) === "/admin";
        if(path.startsWith("/admin") && !roles.includes("ROLE_ADMIN")) {
            alert("접근 권한이 없습니다.");
            return <Navigate to="/" />;
        }
    }

    if(!isLoading) {
        const permitAll = ["/login", "/register", "/password/forgot"];
        if(!data.data) {  //data가 false면 로그인 해야함(로그인으로 보냄)
            if(permitAll.includes(path)) {
                return element;  
            }
            return <Navigate to="/login" />;

        }
        if(permitAll.includes(path)) {
            return <Navigate to="/" />;
        }

        return element;  
    }


}

export default AuthRouteReactQuery;