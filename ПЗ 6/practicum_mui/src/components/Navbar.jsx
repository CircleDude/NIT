import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';

interface NavbarProps {
  active: string;
}

const navItems = [
  { id: '1', label: 'Главная' },
  { id: '2', label: 'Топ машин' },
  { id: '3', label: 'Галерея' },
  { id: '4', label: 'Новости' },
];

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.info.light,
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.info.main,
    },
    '&.Mui-selected:hover': {
        backgroundColor: theme.palette.info.dark,
    },
}));

function Navbar({ active }: NavbarProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    return (
        <AppBar      
          position="static"
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            mt: '28px',
          }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
                        Самые быстрые автомобили
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((item) => {
                            const isActive = active === item.id;

                            return (
                                <Button
                                key={item.id}
                                variant={isActive ? 'contained' : 'text'}
                                color="info"
                                size="medium"
                                >
                                {item.label}
                                </Button>
                            );
                        })}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }}}>    
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>              
                        <Drawer
                        anchor="top"
                        open={ open }
                        onClose={toggleDrawer(false)}
                        >
                            <MenuList>
                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                {navItems.map((item) => (
                                    <StyledMenuItem
                                        key={item.id}
                                        selected={active === item.id}
                                    >
                                        {item.label}
                                    </StyledMenuItem>
                                ))}
                            </MenuList>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
)};

export default Navbar;
