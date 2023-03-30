import MessengerRouter from './router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userGroup } from './utils/atom';
import { UserInfoType } from './utils/type';

function App() {
  const setUser = useSetRecoilState(userGroup);

  const nameArr = ['hani', 'herin', 'hyein', 'minij'];
  const testUserGroup: UserInfoType[] = Array.from(
    { length: nameArr.length },
    (_, i) => ({
      userId: i + 1,
      name: nameArr[i],
    })
  );

  const setDefaultUser = () => {
    setUser((prev) => [...prev, ...testUserGroup]);
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
