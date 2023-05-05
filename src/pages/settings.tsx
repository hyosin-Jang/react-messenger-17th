import Header from 'components/Header';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';

const Settings = () => {
  return (
    <Wrapper>
      <Header title="Settings"></Header>
      <SettingWrapper>
        <a
          className="link"
          href="https://github.com/hyosin-Jang"
          target="_blank"
        >
          Github
        </a>
        <a
          className="link"
          href="https://codingwiths.tistory.com/"
          target="_blank"
        >
          Tistory
        </a>
      </SettingWrapper>
    </Wrapper>
  );
};

export default Settings;

const SettingWrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 4rem;

  .link {
    text-decoration: none;
    color: black;
    width: 10rem;
    background-color: white;
    border: 1px solid grey;

    text-align: center;
    border-radius: 2rem;
    padding: 1rem;
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
