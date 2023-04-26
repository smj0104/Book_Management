/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import SideBar from '../../components/Sidebar/SideBar';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

/**
 *  콜백: 비동기 처리 후에 함수 실행을 해야하는 경우 사용  //비동기 안에서 동기적으로 함수를 실행시킬때
 * 
 * f() {
 * 결과 = axios.get()
 * console.log(결과)
 * }
 *  undefined출력
 * 
 * setTimeout(  , 지연시간) = 지연
 * 
 * promise = javascript내장객체 (resolve, reject)
 *  생성시 (resolve, reject)를 가진 함수를 생성
 * resolve는 then reject는 catch실행
 * 
 * async await
 * await을 다는 이유: 콜백함수에 달아준다  /promise에만 사용가능  //동기로 바꿀때 사용
 * 
 * async = new promise /비동기
 * 
 * 
 */
const mainContainer = css`
    padding: 10px;
`;

const BookDetail = () => {      //중요 안보고 적어보기
    // const { bookId } = useParams();
    // const getBook = useQuery = (["getBook"], async() => {
    //     const option = {
    //         headers: {
    //             Authorization: localStorage.getItem("accessToken")
    //         }
    //     }
    //     const response = await axios.get(`http://localhost:8080/book/${bookId}`, option)
    //     return response;
    // });


    // if(getBook.isLoading) {
    //     return <div>Loading...</div>
    // }

    // if(!getBook.isLoading)
    const { bookId } = useParams();  //useParams app.js path="/book/bookIds"

    const getBook = useQuery(["getBook"], async () => {     //const getBook = useQuery(['캐쉬키'], 함수(promise도 가능), 옵션)
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}`, option);   //server controller에 든  404(주소문제) = url이나 controller확인    option은 무조건 객체형태론
        return response;    //await을 안달면 return response 즉시 실행
    });

    const getLikeCount = useQuery(["getLikeCount"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like`, option);
        return response;
    });

    if(getBook.isLoading) { //요청이 가있는동안
        return <div>불러오는 중....</div>
    }

    if(!getBook.isLoading)
    return (
        <div css={mainContainer}>
            <SideBar />
            <header>
                <h1>{getBook.data.data.bookName}</h1>
                <p>분류:{getBook.data.data.categoryName}/ 저자명: {getBook.data.data.authorName}/ 출판사: {getBook.data.data.publisherName}/ 추천: {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}</p> 
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.categoryName}/>
                </div>
                <div>

                </div>
                <div>
                    <button>추천</button>
                </div>
            </main>
        </div>
    );
};

export default BookDetail;