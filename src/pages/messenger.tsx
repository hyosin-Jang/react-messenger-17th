import { useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

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

  console.log('messageStorage', messageStorage);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (input.value.trim() === '') return;

    const newMessage = {
      userId: curUserId,
      data: input.value,
      timestamp: new Date().toString(),
    };

    console.log('newMessage', newMessage);

    setMessageStorage([...messageStorage, newMessage]);
    // input 초기화
    input.setValue('');
    e.target.reset();
  };
  return (
    <div>
      <h1>채팅</h1>
      <MessageContainer>
        {/* 채팅 내역 쌓이는 컴포넌트 */}
        {messageStorage &&
          messageStorage.map((message, idx) => (
            <Message key={idx} curUser={message.userId === curUserId}>
              <span>{message.userId}</span> <span>{message.data}</span>{' '}
              <span>{message.timestamp}</span>
            </Message>
          ))}
      </MessageContainer>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={input.onChange} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Messenger;

const MessageContainer = styled.div`
  display: flex;
  width: 30rem;
  height: 40rem;
  background-color: pink;
  flex-direction: column;
  overflow-y: auto;
`;

const Message = styled.div<{ curUser: boolean }>``;
