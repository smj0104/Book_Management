/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryClient } from 'react-query';

const table = css`
    border: 1px solid #dbdbdb;
`;

const thAndTd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;
`;

const RentalList = ({ bookId }) => {    //bookListId있던자리
    const queryClient = useQueryClient();

    const getRentalList = useQuery(["getRentalList"], async() => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }   
        return await axios.get(`http://localhost:8080/book/${bookId}/rental/list`, option);
    });
            //post
    const rentalBooks = useMutation( async(bookListId) => {
        const option = {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.post(`http://localhost:8080/book/rental/${bookListId}`, JSON.stringify(      //주소수정해서 실험 http://localhost:8080/book/${bookListId}/rental
            {userId: queryClient.getQueryData("principal").data.userId }), option);
        }, { 
            onSuccess: () => { 
            queryClient.invalidateQueries("getRentalList"); 
        }
    }); 

    const returnBooks = useMutation( async(bookListId) => {
        const option = {
            params: {
                userId: queryClient.getQueryData("principal").data.userId       //주의할것
            },
            headers: {

                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.delete(`http://localhost:8080/book/rental/${bookListId}`, option);
    }, {
        onSuccess: () => { 
            queryClient.invalidateQueries("getRentalList"); 
        }
    }); 
            //delete
    if(getRentalList.isLoading) {
        return <div>불러오는중..............</div>
    }

    return (
        <>
          <table css={table}>
            <thead>
            <tr>
                <th css={thAndTd}>도서번호</th>
                <th css={thAndTd}>도서명</th>
                <th css={thAndTd}>상태</th>
            </tr>
            </thead>
            <tbody>
                {getRentalList.data.data.map(rentalData => {
                    return (<tr key={rentalData.bookListId}>    
                        <td  css={thAndTd}>{rentalData.bookListId}</td>
                        <td  css={thAndTd}>{rentalData.bookName}</td>
                        {rentalData.rentalStatus
                         ? (<td  css={thAndTd}>대여가능 <button onClick={() => {rentalBooks.mutate(rentalData.bookListId)}}>대여</button></td>)
                         : (<td  css={thAndTd}>대여중 {rentalData.userId === queryClient.getQueryData("principal").data.userId
                            ? (<button onClick={() => {returnBooks.mutate(rentalData.bookListId)}}>반납</button>) : ""}</td>)}
                    </tr>)
                })}
            </tbody>
          </table>
        </>
    );
};

export default RentalList;