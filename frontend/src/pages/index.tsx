import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import DataTable from '../components/DataTable';
import ChangeSymbolModal from '../components/Modal';
import { Container, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Real-Time Stock and Crypto Tracker
          </Typography>
          <ChangeSymbolModal />
          <DataTable />
        </Box>
      </Container>
    </Provider>
  );
};

export default Home;
