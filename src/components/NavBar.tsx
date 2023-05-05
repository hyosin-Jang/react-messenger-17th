import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from 'styles/theme';
import Setting from 'assets/icon-setting.png';
import Friends from 'assets/icon-friends.png';
import Chat from 'assets/icon-chat.png';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', width: '100%', height: '3rem' }}>
      <NavBarWrapper>
        <button className="icon-left" onClick={() => navigate('/friends')}>
          <Icon src={Friends} alt="icon-back" />
        </button>
        <button className="icon-middle" onClick={() => navigate('/chats')}>
          <Icon src={Chat} alt="icon-back" />
        </button>
        <button className="icon-right" onClick={() => navigate('/settings')}>
          <Icon src={Setting} alt="icon-back" />
        </button>
      </NavBarWrapper>
    </div>
  );
};

export default NavBar;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
`;

const NavBarWrapper = styled.nav`
  ${flexCenter}
  width: 100%;
  height: 5rem;
  position: absolute;
  bottom: 0;

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
