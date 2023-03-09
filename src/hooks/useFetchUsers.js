import { useState } from "react";
import axios from "axios";

// 사용자 목록을 얻는 사용자 정의 훅
export const useFetchUsers = () => {
    // 얻은 사용자 정보
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // const { userList, onClickFetchUser } = useFetchUsers();

    // 화면에 표시될 때 사용자 정보 얻기
    const onClickFetchUser = () => {
        // 버튼 클릭 시 로딩 플래그 on, 에러 플래그 off
        setIsLoading(true);
        setIsError(false);

        // API 실행
        axios.get("http://localhost:8080")
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

        return {userList, isLoading, isError, onClickFetchUser};
    };
};