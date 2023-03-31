export default {};

/*
import { useEffect, useRef } from 'react';
import { FixedSizeList } from 'react-window';

import styled from 'styled-components';
import { theme } from 'styles/theme';
import { setDateFormat } from 'utils';

const MessengerList = ({ message, curUserId, curUserGroup }: any) => {
  const getUserNameById = (userId: number) => {
    const name = curUserGroup.find((user: any) => user.userId === userId)?.name;
    return name;
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      // 첫번째 인자: 스크롤할 항목의 인덱스
      // 두번째 인자: 항목이 스크롤될 때 정렬하는 방법 (end: 항목을 보이는 영역의 끝에 위치시킴)
      // scrollRef.current.scrollToItem(message.length); // 방금 생성된 인덱스의 아이템이 끝에 위치하도록 스크롤

      scrollRef.current.scrollTop = scrollRef.current.scrollHeight; //=> 기존 ref를 이용한 방법
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <FixedSizeList
      innerRef={scrollRef}
      height={400} // 리스트 컨테이너 높이
      itemCount={message.length} // 리스트 전체 항목 수
      itemSize={50} // 각 리스트 항목 크기 (한 줄만 입력 받는다고 가정)
      width="100%"
    >
      {({ style, index }) => {
        const curMessage = message[index];
        // console.log('index', index, curMessage);

        return (
          <Message key={index} curUser={curMessage.userId === curUserId}>
            <ProfileImg
              alt="profile-img"
              src={require(`../assets/${curMessage.userId}.png`)}
            />
            <div className="chat-group">
              <span className="nickname">
                {getUserNameById(curMessage.userId)}
              </span>
              <div className="chat-data">
                <ChatBubble className="message">{curMessage.data}</ChatBubble>
                <span className="timestamp">
                  {setDateFormat(curMessage.timestamp)}
                </span>
              </div>
            </div>
          </Message>
        );
      }}
    </FixedSizeList>
  );
};

export default MessengerList;

const Message = styled.div<{ curUser: boolean }>`
  display: flex;
  height: 50px;
  flex-direction: ${({ curUser }) => (curUser ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 1rem;

  .chat-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .nickname {
      display: flex;
      justify-content: ${({ curUser }) =>
        curUser ? 'flex-end' : 'flex-start'};
      font-weight: 700;
    }

    .chat-data {
      display: flex;
      flex-direction: ${({ curUser }) => (curUser ? 'row-reverse' : 'row')};
      gap: 0.5rem;
      .timestamp {
        display: flex;
        align-self: flex-end;
      }
    }
  }
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline-block;
  border-radius: 50%;
`;

const ChatBubble = styled.div`
  max-width: 70%;
  position: relative;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 10px;
  border: 0.7px solid black;
  font-size: 1.3rem;
  background-color: ${theme.colors.white};
`;
*/
