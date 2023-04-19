import React from 'react';
import { useState } from 'react';

const Callback = () => {

    const [cnt, setCnt] = useState(0); // 변수의 값이 변화가 있을시 그 부분을 재렌더링하라 = useState (그냥 일반 변수로는 불가 render함수 사용)
    let count1 = 0;
            
    const a = (fx, fx2) => { //fx = 콜백함수
        console.log("A함수 실행");
        setCnt(() => fx(fx2));
    }

    const b = (fx2) => {
        console.log("B함수 실행");
        count1 = cnt + 100;
        fx2();
        return count1;
    }
    const c = () => {
        console.log("C함수 호출");
        console.log(count1);        
    }

    const clickHandler = () => {
        a(b,c);
   
    }
    return (
        <div>
            <button onClick={clickHandler}>버튼</button>
        </div>
    );
};

export default Callback;
