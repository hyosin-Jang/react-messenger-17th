import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';
import Back from 'assets/icon-back.png';

interface HeaderProps {
  title?: string;
  children?: ReactNode;
}
const Header = ({ title, children }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <button className="icon-left" onClick={() => navigate(-1)}>
        <Icon src={Back} alt="icon-back" />
      </button>
      <h1 className="header-title">{title}</h1>
      {children}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  ${flexCenter}
  width: 100%;
  height: 5rem;
  position: relative;

  .icon-left {
    position: absolute;
    top: calc(50% - 10px);
    left: 0.6rem;
  }

  .header-title {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: 'NotoSansKRRegular';
  }

  .icon-right {
    position: absolute;
    top: calc(50% - 10px);
    right: 0.6rem;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
`;
