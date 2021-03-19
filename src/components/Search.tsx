import React from 'react';
import styled from 'styled-components';

import throttle from '../utils/throttle';
import searchUsers from '../api/searchUser';
import { User } from '../types';


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
  const [loadingResults, setLoadingResults ] = React.useState(false);
  const [error, setError ] = React.useState(null);
  const [users, setUsers] = React.useState<User[]>([]);

  const getUsers = async (query: string) => {
    setLoadingResults(true);
    try {
      const usersResponse = await searchUsers(query);
      setUsers(usersResponse);
    } catch(error) {
      setError(error);
    }
  }

  const throttledAPIRequest = React.useMemo(() => throttle(getUsers), []);

  const changeHandler = (event: React.ChangeEvent) => {
    const query = (event.target as HTMLInputElement).value;
    throttledAPIRequest(query);
  }

  return (
    <Main className={className}>
      <Input autoFocus={true} placeholder="Search for a user" onChange={changeHandler} />
    </Main>
  )
}

export default Search;