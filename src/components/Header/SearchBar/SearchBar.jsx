import { Search as SearchIcon} from '@mui/icons-material'
import { Container, InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate, useSearchParams } from 'react-router-dom'
import { SearchBarContainer, SearchForm } from './styles'

const SearchBar = ({searchBarOpen, setSearchBarOpen}) => {
  const match = useMatch("/search"); 
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") || "");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    if(match) {
      setSearchParams({query: searchValue})
    } else {
      navigate("/search", {state: searchValue})
    }
  }


  useEffect(() => {
    if(match) { 
      if(location.state?.from === "/") { 
        const queryFromHome = location.state?.searchText; 
        setSearchValue(queryFromHome);
        setSearchParams({query: queryFromHome}); 
      } else { 
        setSearchValue(searchValue); 
        setSearchParams({query: searchValue});  
      }
      setSearchBarOpen(true); 
    } else { 
      searchParams.delete("query");
      setSearchParams(searchParams);
      setSearchValue(""); 
      setSearchBarOpen(false); 
    }
  }, [match]) 

  return (
    <>
      {searchBarOpen && (
        <SearchBarContainer>
          <Container>
            <SearchForm component="form" onSubmit={handleSubmit}>
              <SearchIcon sx={{m: "8px 0px"}} />
              <InputBase
                value={searchValue}
                onChange={handleInput}
                fullWidth
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for a movie, tv show..."
                inputProps={{ 'aria-label': 'Search for a movie, tv show...' }}
              />        
            </SearchForm>
          </Container>
        </SearchBarContainer>
      )}
    </>
  )
}

export default SearchBar