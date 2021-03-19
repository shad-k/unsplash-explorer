import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  position: relative;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  font-size: ${({ theme }) => theme.fontSize.large};
  padding: ${({ theme }) => theme.spacing.xs};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Search: React.FC<{className?: string}> = ({className}) => {
  return (
    <Main className={className}>
      <Input autoFocus={true} placeholder="Search for a user" />
    </Main>
  )
}

export default Search;