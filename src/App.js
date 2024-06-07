import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import UserList from './components/UserList';

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <UserList />
    </Container>
  );
};

export default App;