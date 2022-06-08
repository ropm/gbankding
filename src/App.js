import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, CssBaseline, Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function createData(
  id,
  name,
  amount,
  link,
) {
  return { id, name, amount, link };
}

const rows = [
  createData(1111, 'Item1', 159, 'https://classic.wowhead.com/item=12640'),
  createData(1112, 'Item2', 237, 'https://classic.wowhead.com/item=12640'),
  createData(1113, 'Item3', 262, 'https://classic.wowhead.com/item=12640'),
  createData(1114, 'Item4', 305, 'https://classic.wowhead.com/item=12640'),
  createData(1115, 'Item5', 356, 'https://classic.wowhead.com/item=12640'),
];

function App() {
  const [items, setItems] = useState([]);
  const [importString, setImportString] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // todo: api call
    setItems(rows)
  }, [])

  const handleClose = () => {
    setDialogOpen(false);
  }

  const saveDialog = () => {
    if (!token) {
      return;
    }
    console.log("saving");
    handleClose();
  }

  const handleChange = (event) => {
    const { target: { value } } = event;
    console.log(value);
    setImportString(value);
  }

    const handleTokenChange = (event) => {
    const { target: { value } } = event;
    console.log(value);
    setToken(value);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Container>
          <Typography sx={{ mb: 5 }} variant='h2'>Ding bank</Typography>
          <Button variant='contained' onClick={() => setDialogOpen(true)}>Add items</Button>
          <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>Add new items</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please give the token and paste the string from ClassicGuildBank addon to continue.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="token"
                label="Token"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleTokenChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="import"
                label="Import string"
                type="text"
                fullWidth
                multiline
                variant="standard"
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={saveDialog}>Save</Button>
            </DialogActions>
          </Dialog>
          <TableContainer sx={{ mt: 5 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item name</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right"><Link href={row.link}>Wowhead link</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
