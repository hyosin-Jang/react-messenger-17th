import MessengerRouter from './router';
import { useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { userGroup } from './utils/atom';
import { UserInfoType } from './utils/type';

function App() {
  // 테스트 유저들 집어넣기
  const setUser = useSetRecoilState(userGroup);

  const n = 4;
  const nameArr = ['hani', 'herin', 'hyein', 'minij'];
  const testUserGroup: UserInfoType[] = Array.from({ length: n }, (_, i) => ({
    userId: i + 1,
    name: nameArr[i],
  }));

  console.log('newUserGroup', testUserGroup);

  const setDefaultUser = useCallback(() => {
    console.log('몇번');
    setUser((prev) => [...prev, ...testUserGroup]);
  }, []);

  useEffect(() => {
    setDefaultUser();
  }, []);

  return (
    <div>
      <MessengerRouter />
    </div>
  );
}

export default App;
