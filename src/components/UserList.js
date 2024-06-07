import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  InputAdornment
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        User List
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {user.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <MailIcon fontSize="small" />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      {user.phone}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserList;