import React from 'react'
import { Check as CheckIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, FormControl, MenuItem, Select, 
  TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { ProviderImg, ProviderImgActive, StyledAccordionSummary, StyledToggleButton } from './styled'


const TvFilters = ({filters, setFilters, tvGenres, availableRegions, tvProviders, 
  handleFetchTvProviders}) => {

  const sortOptions = [
    {
      name: "Popularity Ascending",
      value: "popularity.asc"
    },
    {
      name: "Popularity Descending",
      value: "popularity.desc"
    },
    {
      name: "Rating Ascending",
      value: "vote_average.asc"
    },
    {
      name: "Rating Descending",
      value: "vote_average.desc"
    }
  ]

  const handleSelectedSort = (e) => {
    setFilters({...filters, selectedSort: e.target.value, filtersHasChanged: true});
  }

  const handleSelectedRegion = (e, newInputValue) => {
    setFilters({...filters, selectedRegion: newInputValue});
  }

  const handleSelectedProvider = (e, newProviders) => {
    setFilters({...filters, selectedProvider: newProviders, filtersHasChanged: true})
  }

  const handleSelectedGenre = (e, newGenres) => {
    setFilters({...filters, selectedGenre: newGenres, filtersHasChanged: true})
  }

  return (
    <>
      <Accordion sx={{mt: "16px"}}>
        <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sort</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          <FormControl sx={{ width: "100%"}} size='small'>
            <Typography variant="body2" sx={{margin: "5px 0px"}}>Sort results by</Typography>
            <Select
              id="sort-select"
              value={filters.selectedSort}
              onChange={handleSelectedSort}
            >
              {sortOptions.map((option) => 
                <MenuItem value={option.value} key={option.value}>{option.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion> 


      <Accordion sx={{mt: "16px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Where to watch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            id="country-select"
            fullWidth
            freeSolo={true} 
            forcePopupIcon={true}
            size={"small"}
            value={filters.selectedRegion}
            onChange={handleSelectedRegion}
            options={availableRegions} 
            getOptionLabel={(option) => option.english_name || ""} 
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.iso_3166_1.toLowerCase()}.png`}
                  alt={option.iso_3166_1}
                />
                {option.english_name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ 
                  ...params.inputProps, 
                  autoComplete: 'new-password', 
                }}
              />
            )}
          />
          <Button 
            sx={{width: "100%", mt: "15px"}}
            color='secondary' 
            variant='contained'
            disabled={!filters.selectedRegion}
            onClick={handleFetchTvProviders}
          >
          Search providers
          </Button>
          <ToggleButtonGroup 
            sx={{
              mt: "15px", 
              gap: "10px", 
              display: "grid", 
              gridTemplateColumns: {
                xs: "1fr 1fr 1fr 1fr 1fr", 
                sm: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", 
                md: "1fr 1fr 1fr 1fr"}}}
            value={filters.selectedProvider}
            onChange={handleSelectedProvider}
            aria-label="provider-select"
            fullWidth
          >
            {tvProviders.map((provider) => (      
                <Tooltip key={provider.provider_id} title={provider.provider_name} placement='top' value={provider.provider_id} >
                  <StyledToggleButton 
                    value={provider.provider_id} 
                    aria-label={provider.provider_id}
                    >
                      <ProviderImgActive>
                        <CheckIcon fontSize='large' sx={{color: "white"}} />
                      </ProviderImgActive>
                      <ProviderImg 
                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} 
                        loading='lazy'
                        alt={provider.provider_name} />
                  </StyledToggleButton>
                </Tooltip>
              ))}
          </ToggleButtonGroup>
        </AccordionDetails>
      </Accordion>   

      
      <Accordion sx={{mt: "16px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Filter by genres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ToggleButtonGroup
            sx={{flexWrap: "wrap", mt: "0px"}}
            value={filters.selectedGenre}
            onChange={handleSelectedGenre}
            aria-label="genre-select"
          >
            {tvGenres.map((genre) => (        
              <ToggleButton 
                value={genre.id} 
                aria-label={genre.id}
                key={genre.id}
              >
                {genre.name}
              </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </AccordionDetails>
      </Accordion>  
    </>
  )
}

export default TvFilters