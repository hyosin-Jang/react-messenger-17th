import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';

interface ListRowProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}
const ListRow = ({ children, className, onClick }: ListRowProps) => {
  return (
    <StyledLi className={className} onClick={onClick}>
      {children}
    </StyledLi>
  );
};

export default ListRow;

const StyledLi = styled.li``;
