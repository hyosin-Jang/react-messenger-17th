import { useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const Messenger = () => {
  // 현재 유저 아이디
  const [curUserId, setCurUserId] = useState<number>(1); // userId 저장

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
      <div>
        {/* 채팅 내역 쌓이는 컴포넌트 */}
        {messageStorage &&
          messageStorage.map((message, idx) => (
            <div key={idx}>
              <span>{message.userId}</span> <span>{message.data}</span>{' '}
              <span>{message.timestamp}</span>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={input.onChange} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Messenger;
