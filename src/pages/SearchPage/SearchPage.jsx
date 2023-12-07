import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ItemCard from '../../components/ItemCard/ItemCard';
import { fetchSearchedItems } from '../../features/search/searchAPI';
import { Box, Button, CircularProgress, Container, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ItemGridList from '../../components/ItemGridList/ItemGridList';
import usePlatziMovies from '../../hooks/usePlatziMovies';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';


const SearchPage = () => {
  const { addFavoriteMovie, addFavoriteTvSerie, isMovieInLocal, isTvInLocal } = usePlatziMovies();
  const [searchParams] = useSearchParams();

  const [resultsFilter, setResultsFilter] = useState("movie");
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);

  const { items, loading, error, page, total_pages, total_results } = useSelector(state => state.search.searchedItems)
  const dispatch = useDispatch();


  const handleResultsFilter = (e, newCurrentBtn) => {
    setResultsFilter(newCurrentBtn);
    handleFetchSearchedItems(newCurrentBtn);
  }

  const handleFetchSearchedItems = (filter) => {
    dispatch(fetchSearchedItems({
      pathParam: filter,
      params: {
        query: searchParams.get("query"),
        page: 1
      }
    }))
    setPageNumber(2) 
    setLoadMoreBtn(true);
  }

  const loadMore = () => {
    dispatch(fetchSearchedItems({
      pathParam: resultsFilter,
      params: {
        query: searchParams.get("query"),
        page: pageNumber
      }
    }));
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
    setLoadMoreBtn(false)
  }

  useEffect(() => {
    handleFetchSearchedItems(resultsFilter) 
  }, [searchParams.get("query")])


  const {ref, inView} = useInView({
    threshold: 1 
  });

  useEffect(() => {
    if(inView && page < total_pages && loadMoreBtn === false) {
      loadMore()
    }
  }, [inView])
  

  return (
    <>
    <Container maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Stack  direction={{xs: "column", md: "row"}} justifyContent={"space-between"} spacing={2}>
        <Box flex={{xs: 1}}>
          <Paper sx={{padding: "10px"}}>
            <Typography variant="h6">Search Results</Typography>
            <Typography variant="body1">results: {items?.length}</Typography>
            <Typography variant="body1">current page: {page}</Typography>
            <Typography variant="body1">max page: {total_pages}</Typography>
            <Typography variant="body1">total results: {total_results}</Typography>
            <ToggleButtonGroup
              color="secondary"
              value={resultsFilter}
              exclusive
              onChange={handleResultsFilter}
              aria-label="results"  
              orientation='vertical'
              sx={{width: "100%"}}
              size='small'
            >
              <ToggleButton value="movie">movies</ToggleButton>
              <ToggleButton value="tv">tv series</ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>
        <Box flex={{xs: 1, md: 3}}>
          {!items.length && !loading && !total_results && (
            <Typography variant="body1" color="initial">There are no results that matched your query</Typography>
          )}
          <ItemGridList 
            items={items} 
            error={error}
            >
            {(item, index) => {
              if(items.length == index + 1) { 
                return <ItemCard 
                  key={item.id}
                  item={item}
                  onClick={() => resultsFilter === "movie" ? addFavoriteMovie(item) : addFavoriteTvSerie(item)}
                  onNavigate={resultsFilter === "movie" ? `/movie/detail/${item.id}` : `/tv/detail/${item.id}`}
                  isInLocal={resultsFilter === "movie" ? isMovieInLocal : isTvInLocal}
                  loading={loadMoreBtn === true && loading ? true : false} 
                  innerRef={ref}                
                />
              }
              return <ItemCard 
                key={item.id}
                item={item}
                onClick={() => resultsFilter === "movie" ? addFavoriteMovie(item) : addFavoriteTvSerie(item)}
                onNavigate={resultsFilter === "movie" ? `/movie/detail/${item.id}` : `/tv/detail/${item.id}`}
                isInLocal={resultsFilter === "movie" ? isMovieInLocal : isTvInLocal}
                loading={loadMoreBtn === true && loading ? true : false} 
              />
            }}
          </ItemGridList>     
          {loadMoreBtn && !loading && page < total_pages && (
            <Button fullWidth variant='contained' color='secondary' onClick={loadMore}>
              Load More
            </Button> 
          )}
          {loadMoreBtn === false && loading && (
            <Box fullWidth sx={{height: "85px", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <CircularProgress color='secondary' variant='indeterminate' size={"3.2rem"} />
            </Box>
          )}      
        </Box>
      </Stack>
    </Container>
    </>
  )
}

export default SearchPage