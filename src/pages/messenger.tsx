import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useRecoilValue } from 'recoil';
import { userGroup } from '../utils/atom';
import { UserInfoType } from '../utils/type';

const Messenger = () => {
  // 내 유저 아이디
  const [curUserId, setCurUserId] = useState<number>(1);

  // 상대 유저 아이디
  const [otherUserId, setOtherUserId] = useState<number>(2);

  // 채팅 내역 창고
  const [messageStorage, setMessageStorage] = useState([
    {
      userId: 1,
      data: 'sample',
      timestamp: new Date().toString(),
    },
  ]);

  const input = useInput('');

  const curUserGroup = useRecoilValue(userGroup);
  // console.log('curUserGroup', curUserGroup);

  // 내 아이디 <-> 상대 아이디
  const handleUserToggle = (e: any) => {
    e.preventDefault();
    setOtherUserId(curUserId);
    setCurUserId(otherUserId);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageStorage]);

  // console.log('messageStorage', messageStorage);
  // console.log('curUserId', curUserId);
  // console.log('otherUserId', otherUserId);

  const scrollRef = useRef<null | HTMLDivElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (input.value.trim() === '') return;

    const newMessage = {
      userId: curUserId,
      data: input.value,
      timestamp: new Date().toString(),
    };

    // console.log('newMessage', newMessage);

    setMessageStorage([...messageStorage, newMessage]);
    // input 초기화
    input.setValue('');
    e.target.reset();
  };

  // 유저 정보랑 채팅 내역 json으로 저장하는 함수
  const saveToJson = (e: any) => {
    e.preventDefault();

    const userState = curUserGroup.find((item) => item.userId === curUserId);
    const otherUserState = curUserGroup.find(
      (item) => item.userId === otherUserId
    );
    // console.log('userState', userState, otherUserState);

    const combine = [userState, otherUserState, ...messageStorage];

    const jsonCombine = JSON.stringify(combine);
    const blob = new Blob([jsonCombine], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chatting_info.json';
    link.click();
  };
  return (
    <div>
      <h1>채팅</h1>
      <button type="button" onClick={handleUserToggle}>
        유저 토글
      </button>
      <MessageContainer ref={scrollRef}>
        {/* 채팅 내역 쌓이는 컴포넌트 */}
        {messageStorage &&
          messageStorage.map((message, idx) => (
            <Message key={idx} curUser={message.userId === curUserId}>
              <ProfileImg src={require(`../assets/${message.userId}.png`)} />
              <span>{message.userId}</span> <span>{message.data}</span>
              <span>{message.timestamp}</span>
            </Message>
          ))}
      </MessageContainer>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={input.onChange} autoFocus />
        <button type="submit">전송</button>
      </form>
      <button type="button" onClick={saveToJson}>
        json으로 저장
      </button>
    </div>
  );
};

export default Messenger;

const MessageContainer = styled.div`
  display: flex;
  width: 35rem;
  height: 40rem;
  background-color: pink;
  flex-direction: column;
  overflow-y: auto;
`;

const Message = styled.div<{ curUser: boolean }>`
  display: flex;
  flex-direction: ${({ curUser }) => (curUser ? 'row-reverse' : 'row')};
  // justify-content: ${({ curUser }) => (curUser ? 'flex-end' : 'flex-start')};
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline-block;
`;
