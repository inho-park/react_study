import { useFetchUsers } from "./hooks/useFetchUsers";

export const App = () => {
    // 얻은 사용자 정보
    const { userList, isLoading, isError, onClickFetchUser } = useFetchUsers();

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