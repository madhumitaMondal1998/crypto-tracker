import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { fetchData, selectData, selectSymbol, selectStatus } from '../redux/slices/dataSlice';

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const symbol = useSelector(selectSymbol);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchData(symbol));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  return (
    <TableContainer component={Paper}>
      {status === 'loading' ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.timestamp}>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
