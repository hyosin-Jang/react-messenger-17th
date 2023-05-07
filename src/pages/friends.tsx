import { useState } from 'react';
import Header from 'components/Header';
import NavBar from 'components/NavBar';

import styled from 'styled-components';
import { backgroundShape, flexCenter } from 'styles/theme';
import Search from 'assets/icon-search.png';

import useInput from 'hooks/useInput';
import { userGroup } from 'utils/atom';
import { setSearchFilter } from 'utils/index';
import { useRecoilValue } from 'recoil';

const Friends = () => {
  const users = useRecoilValue(userGroup);
  const searchTerm = useInput('');

  const me = users.filter((user) => user.userId === 0);

  const [searchToggle, setSearchToggle] = useState(false);
  const handleSearch = () => setSearchToggle((prev) => !prev);

  return (
    <Wrapper>
      <Header title="Profiles">
        <div className="icon-right" onClick={handleSearch}>
          <Icon src={Search} alt="icon-back" />
        </div>
      </Header>
      {searchToggle && (
        <InputWrapper>
          <input
            onChange={searchTerm.onChange}
            placeholder="검색어 입력"
            autoFocus
          />
        </InputWrapper>
      )}
      <Seperate>
        <div>Me</div>
        <hr style={{ width: '100%' }} />
      </Seperate>

      {me &&
        me.map((user) => (
          <FriendsTab key={user.userId} className="friend-tab">
            <ProfileImg
              alt="profile-img"
              src={require(`../assets/${user.userId}.png`)}
            />
            <div className="friend-data">
              <span className="friend-name">{user.name}</span>
              <span className="friend-status">{user.statusMessage}</span>
            </div>
          </FriendsTab>
        ))}
      <Seperate>
        <div>Friends</div>
        <hr style={{ width: '100%' }} />
      </Seperate>
      <FriendsList>
        {users &&
          users
            .filter((user) => user.userId !== 0)
            .filter((user) => setSearchFilter(searchTerm.value, user))
            .map((user) => (
              <FriendsTab key={user.userId}>
                <ProfileImg
                  alt="profile-img"
                  src={require(`../assets/${user.userId}.png`)}
                />
                <div className="friend-data">
                  <span className="friend-name">{user.name}</span>
                  <span className="friend-status">{user.statusMessage}</span>
                </div>
              </FriendsTab>
            ))}
      </FriendsList>
      <NavBar />
    </Wrapper>
  );
};

export default Friends;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
`;

const Seperate = styled.div`
  width: 90%;
  padding: 0.2rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 90%;

  input {
    width: 100%;
    border-radius: 2rem;
    padding: 0.5rem;

    &:focus {
      outline: none;
      border: 1px solid green;
    }

    &:active {
      border: 1px solid green;
    }

    &:hover {
      border: 1px solid green;
    }
  }
`;

const Wrapper = styled.main`
  ${flexCenter}
  ${backgroundShape}
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-block;
  border-radius: 50%;
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const FriendsTab = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  gap: 1rem;
  width: 90%;
  margin: 1rem;
  font-size: 1.3rem;

  .friend-data {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .friend-name {
      font-weight: 600;
    }
    .friend-status {
    }
  }
`;
