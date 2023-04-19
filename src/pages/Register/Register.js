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

// const forgotPassword = css`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     margin-bottom: 45px;
//     width: 100%;
//     font-size: 12px;
//     font-weight: 600;
// `;

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

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const Register = () => {
    const [registerUser, setRegisterUser] = useState({email: "", password:"", name:""})
    const [errorMessages, setErrorMessages] = useState({email: "", password: "", name: ""});

    const onChangeHandle = (e) => {
        const {name, value } = e.target;
        setRegisterUser({...registerUser, [name]: value})
    }

    const registeSubmit = async() => {
        const data = {
            ...registerUser
        }
        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }               //await은 async함수 안에서만 사용가능하다
        try {   
            const response = await axios.post("http://localhost:8080/auth/signup", JSON.stringify(data), option); //Promise 사용
            setErrorMessages({email: "", password: "", name: ""});
            
        } catch(error) {
            setErrorMessages({email: "", password: "", name: "", ...error.response.data.errorData});
        }
        // .then(response => {
        //     setErrorMessages({email: "", password: "", name: ""});
        //     console.log(response);
        //     //return "test";  //then에서 받은 return은 무조건 promise
        // })
        // .catch(error => {
        //     setErrorMessages({email: "", password: "", name: "", ...error.response.data.errorData}); //...그대로 복사해옴
        // });

       // console.log("비동기 테스트"); //axios는 무조건 비동기       //동기 비동기 :동기 = 무조건 순서대로   비동기 = 빠른순으로 먼저 받음 
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
                    <div css={errorMsg}>{errorMessages.email}</div>
                    <label css={inputLabel}>password</label>
                    <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                        <FiLock />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.password}</div>
                    <label css={inputLabel}>Name</label>
                    <LoginInput type="text" placeholder="Type your name" onChange={onChangeHandle} name="name">
                        <BiRename />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.name}</div>
                    
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
//Promise 안에 then(),catch()가 들어있다.
//then() = resolve호출시 실행 reject호출시 실행
export default Register;