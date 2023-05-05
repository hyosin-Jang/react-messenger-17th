import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <NavBarWrapper>
      <button className="icon-left" onClick={() => navigate('/friends')}>
        친구 리스트
      </button>
      <button className="icon-middle" onClick={() => navigate('/chats')}>
        채팅 목록
      </button>
      <button className="icon-right" onClick={() => navigate('/settings')}>
        설정
      </button>
    </NavBarWrapper>
  );
};

export default NavBar;

const NavBarWrapper = styled.nav`
  ${flexCenter}
  width: 100%;
  height: 5rem;
  position: relative;

  .icon-left {
    position: absolute;
    top: calc(50% - 10px);
    left: 0.6rem;
  }

  .icon-middle {
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
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
