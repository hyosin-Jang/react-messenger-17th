import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ToggleSwitchProps {
  className?: string;
  handleUserToggle?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch = ({ className, handleUserToggle }: ToggleSwitchProps) => {
  return (
    <Wrapper className={`container ${className}`}>
      <input
        onChange={handleUserToggle}
        type="checkbox"
        className="checkbox"
        id="checkbox"
      />
      <label className="switch" htmlFor="checkbox">
        <span className="slider"></span>
      </label>
    </Wrapper>
  );
};

export default ToggleSwitch;

const Wrapper = styled.div`
  width: 4.5rem;
  height: 2rem;
  position: relative;

  .checkbox {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;

    &:checked + .switch {
      background-color: ${theme.colors.yellow};
    }

    &:checked + .switch .slider {
      left: calc(50% - 27px / 2 + 10px);
      top: calc(50% - 27px / 2);
    }
  }

  .switch {
    width: 90%;
    height: 100%;
    display: block;

    background-color: ${theme.colors.grey};
    border-radius: 16px;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }

  .slider {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    left: calc(50% - 27px / 2 - 10px);
    top: calc(50% - 27px / 2);

    border-radius: 50%;
    background: ${theme.colors.white};
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-out;
    cursor: pointer;
  }
`;
