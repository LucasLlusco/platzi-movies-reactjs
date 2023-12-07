import React, { useEffect, useState } from 'react'
import { fetchAvailableRegions, fetchMovieGenres, fetchMovieProviders, fetchMovies } from '../../features/movie/movieAPI'
import { useDispatch, useSelector } from 'react-redux'
import MovieFilters from './MovieFilters/MovieFilters'
import ItemCard from '../../components/ItemCard/ItemCard'
import { Box, Button, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import ItemGridList from '../../components/ItemGridList/ItemGridList'
import usePlatziMovies from '../../hooks/usePlatziMovies'


const MoviePage = () => {
  const { addFavoriteMovie, isMovieInLocal } = usePlatziMovies();
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);


  const [filters, setFilters] = useState({
    filtersHasChanged: false, 
    selectedSort: "popularity.desc", 
    selectedRegion: "",
    selectedProvider: [],
    selectedGenre: []
  })

  const { items, loading, error, page, total_pages, total_results } = useSelector(state => state.movie.movies)
  const availableRegions = useSelector(state => state.movie.availableRegions.items);
  const movieProviders = useSelector(state => state.movie.movieProviders.items);
  const movieGenres = useSelector(state => state.movie.movieGenres.items);
  const dispatch = useDispatch();

  const handleFetchMovieProviders = () => {
    dispatch(fetchMovieProviders({
      params: {
        watch_region: filters.selectedRegion.iso_3166_1
      }
    }))
  }
  
  const handleFetchMovies = () => {
    const formattedSelectedProvider = filters.selectedProvider.join("|"); 
    const formattedSelectedGenre = filters.selectedGenre.join(",");

    dispatch(fetchMovies({
      params: {
        page: 1,
        ...(!!filters.selectedSort.length) && {sort_by: filters.selectedSort},
        ...(!!filters.selectedRegion) && {watch_region: filters.selectedRegion.iso_3166_1},
        ...(!!filters.selectedProvider.length) && {with_watch_providers: formattedSelectedProvider},
        ...(!!filters.selectedGenre.length) && {with_genres: formattedSelectedGenre},
      }
    }));   
    setPageNumber(2)
    setLoadMoreBtn(true);
    setFilters({...filters, filtersHasChanged: false});
  }
  

  const loadMore = () => {
    const formattedSelectedProvider = filters.selectedProvider.join("|"); 
    const formattedSelectedGenre = filters.selectedGenre.join(",");

    dispatch(fetchMovies({
      params: {
        page: pageNumber,
        ...(!!filters.selectedSort.length) && {sort_by: filters.selectedSort},
        ...(!!filters.selectedRegion) && {watch_region: filters.selectedRegion.iso_3166_1},
        ...(!!filters.selectedProvider.length) && {with_watch_providers: formattedSelectedProvider},
        ...(!!filters.selectedGenre.length) && {with_genres: formattedSelectedGenre},
      }
    }))
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
    setLoadMoreBtn(false)
  }

  useEffect(() => { 
    handleFetchMovies();
    dispatch(fetchAvailableRegions());
    dispatch(fetchMovieGenres());
  }, []);

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
      <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"} spacing={2}>
        <Box flex={{xs: 1}}>
          <Paper sx={{padding: "10px"}}>
            <Typography variant="h6">Movies</Typography>
            <Typography variant="body1">results: {items?.length}</Typography>
            <Typography variant="body1">current page: {page}</Typography>
            <Typography variant="body1">max page: {total_pages.toLocaleString()}</Typography>
            <Typography variant="body1">total results: {total_results.toLocaleString()}</Typography>
          </Paper>
          {filters.filtersHasChanged && (
          <Button 
            color='secondary' 
            variant="contained"
            onClick={handleFetchMovies}
            sx={{width: "100%", mt: "16px"}}
          >
            Apply filters
          </Button>            
          )}
          <MovieFilters 
            filters={filters}
            setFilters={setFilters}
            movieGenres={movieGenres}
            availableRegions={availableRegions}
            movieProviders={movieProviders}
            handleFetchMovieProviders={handleFetchMovieProviders}
          />
        </Box>
        <Box flex={{xs: 1, md: 3}}>
          <ItemGridList 
              items={items} 
              error={error}      
              >
              {(item, index) => {
                if(items.length == index + 1) { 
                  return <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => addFavoriteMovie(item)}
                    onNavigate={`/movie/detail/${item.id}`}
                    isInLocal={isMovieInLocal}
                    loading={loadMoreBtn === true && loading ? true : false}
                    innerRef={ref}
                  />
                }
                return <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => addFavoriteMovie(item)}
                  onNavigate={`/movie/detail/${item.id}`}
                  isInLocal={isMovieInLocal}
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

export default MoviePage

