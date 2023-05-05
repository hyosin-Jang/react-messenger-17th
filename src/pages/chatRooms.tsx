import Header from 'components/Header';
import NavBar from 'components/NavBar';

import { chatRooms, getLatestMessage, userGroup } from 'utils/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { flexCenter } from 'styles/theme';

const ChatRooms = () => {
  const navigate = useNavigate();
  const rooms = useRecoilValue(chatRooms);

  const curUserGroup = useRecoilValue(userGroup);
  const lastestMessage = useRecoilValue(getLatestMessage);

  const getCurLatestMessage = (roomId: number) =>
    lastestMessage.find((latestMessage) => latestMessage.roomId === roomId)
      ?.latestMessage;

  const getUserNameById = (userId: number) => {
    const name = curUserGroup.find((user) => user.userId === userId)?.name;
    return name;
  };

  return (
    <Wrapper>
      <Header title="Chat Lists"></Header>
      <ChatsList>
        {rooms &&
          rooms.map((room) => (
            <>
              <ChatsTab
                key={room.roomId}
                onClick={() => navigate(`${room.roomId}`)}
              >
                <ProfileImg
                  alt="profile-img"
                  src={require(`../assets/${room.data.otherUserId}.png`)}
                />
                <div className="chat-data">
                  <span className="user-name">
                    {getUserNameById(room.data.otherUserId)}
                  </span>
                  <p className="user-message">
                    {getCurLatestMessage(room.roomId)}
                  </p>
                </div>
              </ChatsTab>
              <Seperate>
                <hr style={{ width: '100%' }} />
              </Seperate>
            </>
          ))}
      </ChatsList>
      <NavBar />
    </Wrapper>
  );
};

export default ChatRooms;

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
  width: 2.5rem;
  height: 2.5rem;
  display: inline-block;
  border-radius: 50%;
`;

const ChatsList = styled.div`
  display: flex;

  flex-direction: column;
  width: 100%;
  height: 100%;

  overflow-y: auto;
`;

const ChatsTab = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 3rem;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    background-color: lightgrey;
    color: white;
  }

  .chat-data {
    display: flex;
    flex-direction: column;

    font-size: 1.3rem;

    .user-name {
      font-weight: 600;
    }
    .user-message {
    }
  }
`;

const Seperate = styled.div`
  width: 90%;
  padding: 0.2rem;
  margin: 0 auto 0 auto;
`;
