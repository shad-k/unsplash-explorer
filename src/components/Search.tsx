import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import throttle from '../utils/throttle';
import searchUsers from '../api/searchUsers';
import { User } from '../types';

import Loader from './Loader';

const Main = styled.div``;

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

const SearchResults = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const ResultItem = styled.li`
  padding: ${({ theme }) => theme.spacing.s};
  margin-top: -2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  height: 32px;
  width: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
`;

const Name = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.s};
`;

const Username = styled.span`
  flex: 2;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Error = styled.div`
  padding: ${({ theme }) => theme.spacing.l};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .small {
    font-size: ${({ theme }) => theme.fontSize.small};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  & .large {
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.colors.error};
  }
`;

const Search: React.FC<{ className?: string }> = ({ className }) => {
  const [loadingResults, setLoadingResults] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [users, setUsers] = React.useState<User[]>([]);

  const getUsers = async (query: string) => {
    setLoadingResults(true);
    setError(null);
    try {
      const usersResponse = await searchUsers(query);
      setUsers(usersResponse);
      setLoadingResults(false);
    } catch (error) {
      setError(error);
      setLoadingResults(false);
    }
  };

  const throttledAPIRequest = React.useMemo(() => throttle(getUsers), []);

  const changeHandler = (event: React.ChangeEvent) => {
    const query = (event.target as HTMLInputElement).value;
    throttledAPIRequest(query);
  };

  return (
    <Main className={className}>
      <Input
        autoFocus={true}
        placeholder="Search for a user"
        onChange={changeHandler}
      />

      {loadingResults || users.length > 0}
      <SearchResults>
        {loadingResults ? (
          <Loader />
        ) : error ? (
          <Error>
            <span className="small">We are experiencing some problems.</span>
            <span className="large">Please try again after sometime!</span>
          </Error>
        ) : (
          users.map((user: User) => {
            return (
              <ResultItem>
                <StyledLink to={`/user/${user.username}`}>
                  <ProfileImage src={user.profileImage} alt={user.name} />
                  <Name>{user.name}</Name>
                  <Username>{user.username}</Username>
                </StyledLink>
              </ResultItem>
            );
          })
        )}
      </SearchResults>
    </Main>
  );
};

export default Search;
