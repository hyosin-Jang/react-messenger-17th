import { useState } from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';
import { userGroup } from 'utils/atom';
import { useRecoilValue } from 'recoil';
import NavBar from 'components/NavBar';
const Friends = () => {
  const users = useRecoilValue(userGroup);

  const [searchToggle, setSearchToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchToggle((prev) => !prev);
  };

  const handleValue = (e: any) => {
    e.preventDefault();

    console.log(e.target.value);
    setSearchTerm(e.target.value.trim());
  };
  return (
    <Wrapper>
      <Header title="Profiles">
        <div className="icon-right" onClick={handleSearch}>
          돋보기
        </div>
      </Header>
      {searchToggle && (
        <div>{<input onChange={handleValue} placeholder="검색어 입력" />}</div>
      )}
      <div>Me</div>
      <hr style={{ width: '100%' }} />

      {users &&
        users
          .filter((user) => user.userId === 0)
          .map((user) => (
            <FriendsTab key={user.userId} className="friend-tab">
              <ProfileImg
                alt="profile-img"
                src={require(`../assets/${user.userId}.png`)}
              />
              <div className="friend-data">
                <span>{user.name}</span>
                <span>{user.statusMessage}</span>
              </div>
            </FriendsTab>
          ))}

      <div>Friends</div>
      <hr style={{ width: '100%' }} />
      <FriendsList>
        {users &&
          users
            .filter((user) => user.userId !== 0)

            .filter((user) => {
              if (searchTerm === '') {
                return user;
              } else if (
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return user;
              }
            })
            .map((user) => (
              <FriendsTab key={user.userId}>
                <ProfileImg
                  alt="profile-img"
                  src={require(`../assets/${user.userId}.png`)}
                />
                <div className="friend-data">
                  <span>{user.name}</span>
                  <span>{user.statusMessage}</span>
                </div>
              </FriendsTab>
            ))}
      </FriendsList>
      <NavBar />
    </Wrapper>
  );
};

export default Friends;

const Wrapper = styled.main`
  ${flexCenter}
  flex-direction: column;
  width: 30rem;
  height: 50rem;
  border-radius: 2rem;
  background: radial-gradient(
      178.94% 106.41% at 26.42% 106.41%,
      #fff7b1 0%,
      rgba(255, 255, 255, 0) 71.88%
    )
    #ffffff;

  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01),
    0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09),
    0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);

  border-radius: 23px;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline-block;
  border-radius: 50%;
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 3rem;
`;

const FriendsTab = styled.div`
  display: flex;

  height: 5rem;
  gap: 1rem;
  width: 100%;
  margin-left: 2rem;

  .friend-data {
    display: flex;
    flex-direction: column;
  }
`;
