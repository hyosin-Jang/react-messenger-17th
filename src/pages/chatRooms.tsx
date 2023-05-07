import Header from 'components/Header';
import NavBar from 'components/NavBar';
import ListRow from 'components/ListRow';

import { chatRooms, latestMessage, userGroup } from 'utils/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { backgroundShape, flexCenter } from 'styles/theme';

const ChatRooms = () => {
  const navigate = useNavigate();
  const rooms = useRecoilValue(chatRooms);

  const curUserGroup = useRecoilValue(userGroup);
  const lastestMessage = useRecoilValue(latestMessage);

  const getCurLatestMessage = (roomId: number) =>
    lastestMessage.find((latestMessage) => latestMessage.roomId === roomId)!
      .latestMessage;

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
              <ListRow
                className="chat-rows"
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
                    {getCurLatestMessage(room.roomId).data}
                  </p>
                </div>
              </ListRow>
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
  ${backgroundShape}
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

const Seperate = styled.div`
  width: 90%;
  padding: 0.2rem;
  margin: 0 auto 0 auto;
`;
