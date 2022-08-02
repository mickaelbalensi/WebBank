import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'acutalAmount', label: 'Amount', alignRight: false },
  { id: 'credit', label: 'Credit', alignRight: false },
  { id: 'debit', label: 'Debit', alignRight: false },
  { id: 'bankCustomer', label: 'From/To', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Transaction() {
  const transactionList = [           
    {
      date:'2022-07-31',
      acutalAmount: 200,
      debit: '',
      credit: '+20₪',
      bankCustomer: "user2"
    },
    {
      date:'2022-07-31',
      acutalAmount: 150,
      debit: '',
      credit: '20',
      bankCustomer: "user2"
    },
    {
      date:'2022-07-31',
      acutalAmount: 130,
      credit: '',
      debit: '20',
      bankCustomer: "user2"
    },
    {
      date:'2022-07-31',
      acutalAmount: 200,
      debit: '',
      credit: '20',
      bankCustomer: "user2"
    },
    {
      date:'2022-07-31',
      acutalAmount: 200,
      credit: '',
      debit: '30',
      bankCustomer: "sarah"
    },
    {
      date:'2022-07-31',
      acutalAmount: 200,
      debit: '',
      credit: '50',
      bankCustomer: "micko"
    },
    {
      date:'2022-07-31',
      acutalAmount: 200,
      debit: '',
      credit: '10',
      bankCustomer: "aviel"
    },
    {
      date:'2022-07-31',
      acutalAmount: 200,
      credit: '',
      debit: '20',
      bankCustomer: "nathane"
    },
  ]

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  //const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = transactionList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactionList.length) : 0;

  const filteredTransactions = applySortFilter(transactionList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredTransactions.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Loan
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Borrow
          </Button>
        </Stack>

        <Card>
          <UserListToolbar 
          // numSelected={selected.length} 
          filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={transactionList.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, date, acutalAmount, credit, debit, bankCustomer } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="left">{acutalAmount}</TableCell>
                        {/* <TableCell align="left">{credit}</TableCell> */}
                        <TableCell align="left">
                          {credit !== '' &&
                          <Label variant="ghost" color={(credit === '' && 'error') || 'success'}>
                            {sentenceCase('+'+credit+'₪')}
                          </Label>}
                        </TableCell>
                        <TableCell align="left">
                          {credit === '' &&
                            <Label variant="ghost" color={(credit === '' && 'error') || 'success'}>
                              {sentenceCase(`-{debit}₪`)}
                            </Label>}
                        </TableCell>
                        {/* <TableCell align="left">{debit}</TableCell> */}
                        <TableCell align="left">{bankCustomer}</TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactionList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}