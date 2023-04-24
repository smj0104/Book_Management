/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import ListButton from './ListButton/ListButton';
import { BiHome, BiLike, BiListUl, BiLogOut } from 'react-icons/bi';
import { useQuery } from 'react-query';
import axios from 'axios';

const sidebar = (isOpen) => css`
    position: absolute;
    display: flex;
    left: ${isOpen ? "10px" : "-240px"};
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 250px;
    box-shadow: -1px 0px 5px #dbdbdb;
    transition: left 1s ease;
    background-color: white;

    ${isOpen ? "" : `
        cursor: pointer;
    `}

    ${isOpen ? "" :
        `&:hover {
            left: -230px;
            }`
    }
`;

const header = css`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
`;

const userIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    background-color: #713fff;
    color: white;
    font-size: 30px;
    font-weight: 600;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const userName = css`
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    padding-top: 0;
`;

const userEmail = css`
    font-size: 12px;
`;

const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding-left: 0.3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    &:active {
        background-color: #fafafa;
    }
`;

const main = css`
    padding: 10px;
    border-bottom: 1px solid #dbdbdb;
`;

const footer = css`
    padding: 10px;
`;

const SideBar = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const { data, isLoading } = useQuery(["principal"], async () => {  //async 확인    
        const accessToken = localStorage.getItem("accessToken")
        const response = await axios.get("http://localhost:8080/auth/principal",        //404는 주소문제
         {params: {accessToken}}, 
         {
            enabled: accessToken        //enabled = 갔다가 오는 상황에 사용
         });
        return response;  //promise를 통해 data를 받아옴
    });

    const sidebarOpenclickHandle = () => {  //캡쳐링?
        if(!isOpen){
            setIsOpen(true);
        }
    }

    const sidebarCloseclickHandle = () => {
        setIsOpen(false);
    }

    const logoutClickHandle = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            localStorage.removeItem("accessToken");
        }
    }

    if(isLoading) {
        return <>로딩중.....</>
    }


    if(!isLoading)      //로딩이 다 끝나고나면 뿌린다           substr은 갯수 substring이랑은 다르다.0번째 인덱스부터 한글자 잘라라 (0, 1)
    return (
        <div css={sidebar(isOpen)} onClick={sidebarOpenclickHandle}> 
            <header css={header}>
                <div css={userIcon}>        
                {data.data.name.substr(0, 1)}      
                </div>
                <div css={userInfo}>    
                    <h1 css={userName}>{data.data.name}</h1>
                    <p css={userEmail}>{data.data.email}</p>
                </div>
                <div css={closeButton} onClick={sidebarCloseclickHandle}><GrFormClose /></div>
            </header>
            <main css={main}>
                <ListButton title="Dashboard"><BiHome /></ListButton>
                <ListButton title="Likes"><BiLike /></ListButton>
                <ListButton title="Rental"><BiListUl /></ListButton>
            </main>
            <footer css={footer}>
                <ListButton title="Logout" onClick={logoutClickHandle}><BiLogOut /></ListButton>  
            </footer>
        </div>
    );
};

export default SideBar;