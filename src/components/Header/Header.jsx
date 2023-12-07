import React, { useState } from 'react'
import { AppBar, Box, Typography, IconButton, Container, useScrollTrigger, Slide, } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, Search as SearchIcon} from '@mui/icons-material'
import SideBar from './SideBar/SideBar'
import { StyledLink } from './styles'
import SearchBar from './SearchBar/SearchBar'


const Header = () => {
  const trigger = useScrollTrigger();

  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <>
    <Slide appear={false} direction='down' in={!trigger}>      
      <AppBar position='sticky' sx={{backgroundColor:"secondary.main"}}>
        <Container sx={{minHeight: "64px", display: "flex", alignItems: "center"}}>          
          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton color='inherit' onClick={() => setSideBarOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{flexGrow: {xs: 1, md: 0}}}  >
            <StyledLink to={"/"} color='primary'>Platzi movies</StyledLink>
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            <StyledLink to={"/movie/discover"} color='primary'>Movies</StyledLink>
            <StyledLink to={"/tv/discover"} color='primary'>Tv Series</StyledLink>
          </Box>
          <Box sx={{display: "flex-end"}} >
            <IconButton aria-label="search" color='inherit' onClick={() => setSearchBarOpen(!searchBarOpen)}>
              {!searchBarOpen ? (
                <SearchIcon/> 
              ) : (
                <CloseIcon/>
              )
              }
            </IconButton>
          </Box>
        </Container>
        <SearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} />
        <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      </AppBar>
    </Slide>

    </>
  )
}

export default Header