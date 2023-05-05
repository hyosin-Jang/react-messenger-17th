import MessengerRouter from './router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userGroup } from './utils/atom';
import { UserInfoType } from './utils/type';

function App() {
  const setUsers = useSetRecoilState(userGroup);

  const nameArr = ['hani', 'herin', 'hyein', 'minij'];
  const testUserGroup: UserInfoType[] = Array.from(
    { length: nameArr.length },
    (_, i) => ({
      userId: i + 1,
      name: nameArr[i],
      statusMessage: '호호',
    })
  );

  const setDefaultUser = () => {
    const me: UserInfoType = {
      userId: 0,
      name: 'hyosin',
      statusMessage: '하하',
    };

    // 기본 유저 아이디 설정
    setUsers((prev) => [...prev, ...testUserGroup, me]);
  };

  useEffect(() => {
    setDefaultUser();
  }, []);

  return (
    <>
      <MessengerRouter />
    </>
  );
}

export default App;
