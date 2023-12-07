import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List, ListItemButton } from '@mui/material';
import React from 'react'
import { DrawerHeader, StyledLink } from './styles';


const SideBar = ({sideBarOpen, setSideBarOpen}) => {
  return (
    <>
      {sideBarOpen && (
        <Drawer 
          anchor='left'
          open={sideBarOpen}
          onClose={() => setSideBarOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "secondary.main",
              color: "#fff"
            }
          }}
          >
            <Box sx={{width: 250}}>
              <DrawerHeader>
                <IconButton onClick={() => setSideBarOpen(false)} color='inherit' >
                  <ChevronLeftIcon /> 
                </IconButton>
              </DrawerHeader>
              <Divider/>
              <List>
                <ListItemButton sx={{ pl: 4 }}>
                  <StyledLink to={"/movie/discover"}>
                    Movies
                  </StyledLink>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <StyledLink to={"/tv/discover"}>
                    TV Series
                  </StyledLink>
                </ListItemButton>
              </List>
            </Box>
        </Drawer>        
      )}
    </>
  )
}

export default SideBar