/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiRename } from 'react-icons/bi'
import axios from 'axios';

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px;
`;

const logo = css`
    margin: 50px 0px;
    font-size: 34px;
    font-weight: 600;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 40px 20px;
    width: 400px;
`;

const authForm = css`
    width: 100%;
`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;

const forgotPassword = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 45px;
    width: 100%;
    font-size: 12px;
    font-weight: 600;
`;

const loginButton = css`
    margin: 10px 0px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 100%;
    height: 50px;

    background-color: white;
    font-weight: 900;
    cursor: pointer;
    &hover {
        background-color: #fafafa;
    }
    &active {
        background-color: #eee;
    }
`;

const oauth2Container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 100%;
`;

const oauth2 = (provider) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
    border: 3px solid ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60" : "#ffdc00"};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: ${provider === "kakao" ? "30px" : "20px"};
    cursor: pointer;
    &:hover {
        background-color: ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60" : "#ffdc00"};
    }
`;

const singupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;

const register = css`
    margin-top: 10px;
    font-weight: 600;
`;

const Register = () => {
    const [registerUser, setRegisterUser] = useState({email: "", password:"", name:""})

    const onChangeHandle = (e) => {
        const {name, value } = e.target;
        setRegisterUser({...registerUser, [name]: value})
    }

    const registeSubmit = () => {
        const data = {
            ...registerUser
        }
        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.post("http://localhost:8080/auth/signup", JSON.stringify(data), option)
        .then(response => {
            console.log("성공");
            console.log(response);
        })
        .catch(error => {
            console.log("에러");
            console.log(error.response.data.errorData);
        });

        console.log("비동기 테스트"); //axios는 무조건 비동기       //동기 비동기 :동기 = 무조건 순서대로   비동기 = 빠른순으로 먼저 받음 
    }
    return (
        <div css={container}>
            <header>
                <h1 css={logo}>SIGN UP</h1>
            </header>
            <main css={mainContainer}>
                <div css={authForm}>
                    <label css={inputLabel}>Email</label>
                    <LoginInput type="email" placeholder="Type your email" onChange={onChangeHandle} name="email">
                        <FiUser />
                    </LoginInput>
                    <label css={inputLabel}>password</label>
                    <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                        <FiLock />
                    </LoginInput>
                    <label css={inputLabel}>Name</label>
                    <LoginInput type="text" placeholder="Type your name" onChange={onChangeHandle} name="name">
                        <BiRename />
                    </LoginInput>
                    
                    <button css={loginButton} onClick={registeSubmit}>REGISTER</button>
                </div>
            </main>

                <div css={singupMessage}>Already a user?</div>

            <footer>
                <div css={register}><Link to="/login">LogIn</Link></div>
            </footer>
        </div>
    );
};

export default Register;