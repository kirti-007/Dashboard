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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const CustomCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#000'}`,
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)', 
    boxShadow: `0 4px 20px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`, 
  },
}));

const CustomContainer = styled(Container)({
  textAlign: 'center',
  paddingTop: '20px',
  paddingBottom: '20px', 
});

const CustomTypography = styled(Typography)({
  fontWeight: 'bold',
  marginTop: '20px', 
});

const UserList = ({ themeMode, toggleTheme }) => {
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
    <CustomContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          User List
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
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
        <Grid container spacing={3} justifyContent="center" sx={{ marginTop: '20px' }}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <CustomCard variant="outlined">
                <CardContent>
                  <CustomTypography variant="h6" component="div">
                    {user.name}
                  </CustomTypography>
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
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      )}
    </CustomContainer>
  );
};

export default UserList;