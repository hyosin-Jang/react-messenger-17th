import { useState, useRef, useCallback, ChangeEvent } from 'react';

// components
import ToggleSwitch from '../components/ToggleSwitch';
import Header from 'components/Header';

// utils
import useInput from '../hooks/useInput';
import { useRecoilValue } from 'recoil';
import { userGroup } from '../utils/atom';
import { setDateFormat } from 'utils';
import { ChatMessageType } from 'utils/type';
// import { UserInfoType } from '../utils/type';

// style
import styled from 'styled-components';
import { flexCenter } from '../styles/theme';
import Send from '../assets/icon-send.png';
import Save from '../assets/icon-save.png';
import MessengerList from 'components/MessageList';

// constant
const JSON_FILENAME = 'chatting_info.json';

const Messenger = () => {
  const [curUserId, setCurUserId] = useState<number>(1);
  const [otherUserId, setOtherUserId] = useState<number>(2);
  const [messageStorage, setMessageStorage] = useState<ChatMessageType[]>([
    {
      userId: 1,
      data: 'sample',
      timestamp: Date(),
    },
  ]);

  const input = useInput('');
  const curUserGroup = useRecoilValue(userGroup);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const handleUserToggle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setOtherUserId(curUserId);
      setCurUserId(otherUserId);
    },
    [curUserId, otherUserId]
  );

  const resetInput = (e: any) => {
    input.setValue('');
    e.target.reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.value.trim() === '') return;

    const newMessage: ChatMessageType = {
      userId: curUserId,
      data: input.value,
      timestamp: Date(),
    };

    setMessageStorage([...messageStorage, newMessage]);
    resetInput(e);
  };

  const getUserNameById = (userId: number) => {
    const name = curUserGroup.find((user) => user.userId === userId)?.name;
    return name;
  };

  const saveToJson = (e: any) => {
    e.preventDefault();

    const userState = curUserGroup.find((item) => item.userId === curUserId);
    const otherUserState = curUserGroup.find(
      (item) => item.userId === otherUserId
    );

    const combine = [userState, otherUserState, ...messageStorage];

    const jsonCombine = JSON.stringify(combine);
    const blob = new Blob([jsonCombine], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = JSON_FILENAME;
    link.click();
  };

  return (
    <Wrapper>
      <Header title={getUserNameById(otherUserId)}>
        <ToggleSwitch
          className="icon-right"
          handleUserToggle={handleUserToggle}
        />
      </Header>

      <MessengerList
        message={messageStorage}
        curUserId={curUserId}
        curUserGroup={curUserGroup}
      />

      {/* -> 기존 코드 (windowing 적용 중)
        {messageStorage &&
          messageStorage.map((message, idx) => (
            <Message key={idx} curUser={message.userId === curUserId}>
              <ProfileImg
                alt="profile-img"
                src={require(`../assets/${message.userId}.png`)}
              />
              <div className="chat-group">
                <span className="nickname">
                  {getUserNameById(message.userId)}
                </span>
                <div className="chat-data">
                  <ChatBubble className="message">{message.data}</ChatBubble>
                  <span className="timestamp">
                    {setDateFormat(message.timestamp)}
                  </span>
                </div>
              </div>
            </Message>
          ))}
          */}

      <Form onSubmit={handleSubmit}>
        <button type="button" onClick={saveToJson}>
          <Icon alt="icon-save" src={Save} />
        </button>
        <input
          type="text"
          className="chatting-input"
          onChange={input.onChange}
          autoFocus
        />
        <button type="submit">
          <Icon alt="icon-send" src={Send} />
        </button>
      </Form>
    </Wrapper>
  );
};

export default Messenger;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  padding: 0 0.5rem;
  box-sizing: border-box;

  .chatting-input {
    width: 90%;
    height: auto;
    padding: 0.6rem;
    border: 1px solid grey;
    border-radius: 20px;
  }
`;

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
