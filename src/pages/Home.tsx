import React from 'react';
import styled from 'styled-components';

import Search from '../components/Search';

const Main = styled.div`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.l};
`;

const Heading = styled.h1`
  text-align: center;
  margin: 0;
`;

const StyledSearch = styled(Search)`
  margin-top: ${({ theme }) => theme.spacing.l};
`;

const Home: React.FC<{}> = () => {
  return <Main>
    <Heading>Unsplash Explorer</Heading>
    <StyledSearch />
  </Main>
}

export default Home
