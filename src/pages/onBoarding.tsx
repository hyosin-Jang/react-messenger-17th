import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { backgroundShape, flexCenter } from 'styles/theme';

const OnBoarding = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <StyledButton onClick={() => navigate('/friends')}>
        Click to Start!
      </StyledButton>
    </Wrapper>
  );
};

export default OnBoarding;

const StyledButton = styled.button`
  text-decoration: none;
  color: black;
  width: 15rem;
  font-size: 1.3rem;
  font-weight: 500;
  background-color: white;
  border: 1px solid grey;

  text-align: center;
  border-radius: 2rem;
  padding: 1rem;
`;

const Wrapper = styled.main`
  ${flexCenter}
  ${backgroundShape}
`;
