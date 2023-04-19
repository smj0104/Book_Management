import React from 'react';

const PromiseStudy = () => {

    const a = new Promise((resolve, reject) => { //콜백이 필요한 상황이기에 Promise사용
        console.log("프로미스 호출");
        if(1 === 1) {
            resolve();
        }else {
            throw new Error("오류입니다.");
        }
        //resolve(); //then 호출시
          // resolve = 정상적인 리턴값 (then의 리턴 값으로 들어감)
    });

    const clickHandler = () => {
        a
        .then(() => {
            console.log("1번 then 호출");
            return new Promise((resolve, reject) => {
                resolve("리턴!!!");
            });
        })
        .catch((error) => {
            console.log(error);
        })
        .then(b);
        // a.then((result) => {    //then호출시 안에 콜백함수 들어감
        //     console.log(result);
        // });
    }

    const b = (str) => {
        console.log(str);
    }

    return (
        <div>
            <button onClick={clickHandler}>button</button>
        </div>
    );
};

export default PromiseStudy;