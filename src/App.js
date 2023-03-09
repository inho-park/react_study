import { useState } from 'react';
import axios from "axios";


export const App = () => {
    // 얻은 사용자 정보
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // 화면에 표시될 때 사용자 정보 얻기
    const onClickFetchUser = () => {
        axios.get("https://localhost:8080")
            .then(result => {
                // 성과 이름을 결합하도록 변환
                const users = result.data.map(user => ({
                    id: user.id,
                    name: `${user.lastname} ${user.firstname}`,
                    age: user.age
                }));
                // 사용자 목록 state 업데이트
                setUserList(users);
            })
            // 에러 발생시 에러 플래그 on
            .catch(() => setIsError(true))
            // 처리가 완료되면 로딩 플래그 off
            .finally(() => setIsLoading(false));

    };

    return (
        <div>
            <button onClick={onClickFetchUser}>사용자 정보 얻기</button>
                {/*에러 발생 시 에러 메시지 표시*/}
                {isError && <p style={{ color: "red" }}>에러 발생</p>}
                {/*로딩 중에는 표시 전환*/}
                {isLoading? (
                    <p>데이터를 가져오고 있습니다</p>
                ) : (
                    userList.map(user => (
                        <p key={user.id}>{`${user.id} : ${user.name}(${user.age} 세)`}</p>
                    ))
                )};
        </div>

    );
};