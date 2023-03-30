import { ReactChild } from 'react';
import { Children } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { flexCenter } from 'styles/theme';
import Back from '../assets/icon-back.png';

interface HeaderProps {
  title?: string;
  children?: ReactChild | ReactChild[]; // TODO: children 타입 수정
}
const Header = ({ title, children }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      {/* 첫번째 버튼은 뒤로가기 고정 */}
      <button className="icon-left">
        {' '}
        {/*onClick={() => navigate(-1)}>*/}
        <Icon src={Back} alt="icon-back" />
      </button>
      <span className="header-title">{title}</span>
      {children}
      {/*<span className="icon-right"></span>*/}
    </HeaderWrapper>
  );
};

export default Header;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
`;

const HeaderWrapper = styled.header`
  ${flexCenter}
  height: 5rem;
  position: relative;
  width: 100%;

  .icon-left {
    position: absolute;
    top: calc(50% - 10px);
    left: 0.6rem;
  }

  .header-title {
  }

  .icon-right {
    position: absolute;
    top: calc(50% - 10px);
    right: 0.6rem;
  }
`;
