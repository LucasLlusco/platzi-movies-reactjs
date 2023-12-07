import { Button, InputBase } from '@mui/material'
import React, { useState } from 'react'
import { SearchBarContainer, SearchForm } from './styles'
import { useNavigate } from 'react-router-dom';


const SearchInput = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    navigate("/search", {state: {searchText: searchValue, from: "/"}})
  }

  return (
    <SearchBarContainer>
      <SearchForm component="form" onSubmit={handleSubmit}>
       <InputBase
          value={searchValue}
          onChange={handleInput}
          fullWidth
          sx={{ ml: 1, flex: 1}}
          size='medium'
          placeholder="Search for a movie, tv show..."
          inputProps={{ 'aria-label': 'Search for a movie, tv show...'}}
        />     
        <Button 
          variant='contained' 
          color='secondary' 
          onClick={handleSubmit}
          size='large'
          sx={{borderRadius: "15px"}}
          >Search</Button>   
      </SearchForm>     
    </SearchBarContainer>
  )
}

export default SearchInput