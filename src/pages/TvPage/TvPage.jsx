import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableRegions, fetchTvGenres, fetchTvProviders, fetchTvSeries } from '../../features/tv/tvAPI';
import TvFilters from './TvFilters/TvFilters';
import ItemCard from '../../components/ItemCard/ItemCard';
import { Box, Button, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import ItemGridList from '../../components/ItemGridList/ItemGridList';
import usePlatziMovies from '../../hooks/usePlatziMovies';

const TvPage = () => {
  const { addFavoriteTvSerie, isTvInLocal } = usePlatziMovies();
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);

  const [filters, setFilters] = useState({
    filtersHasChanged: false, 
    selectedSort: "popularity.desc", 
    selectedRegion: "",
    selectedProvider: [],
    selectedGenre: []
  })

  const { items, loading, error, page, total_pages, total_results } = useSelector(state => state.tv.tvSeries)
  const availableRegions = useSelector(state => state.tv.availableRegions.items);
  const tvProviders = useSelector(state => state.tv.tvProviders.items);
  const tvGenres = useSelector(state => state.tv.tvGenres.items);
  const dispatch = useDispatch();


  const handleFetchTvProviders = () => {
    dispatch(fetchTvProviders({
      params: {
        watch_region: filters.selectedRegion.iso_3166_1 
      }
    }))
  }
  
  const handleFetchTvSeries = () => {
    const formattedSelectedProvider = filters.selectedProvider.join("|");
    const formattedSelectedGenre = filters.selectedGenre.join(",");

    dispatch(fetchTvSeries({
      params: {
        page: 1, 
        ...(!!filters.selectedSort.length) && {sort_by: filters.selectedSort},
        ...(!!filters.selectedRegion) ? {watch_region: filters.selectedRegion.iso_3166_1} : {watch_region: "AR"},
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

    dispatch(fetchTvSeries({
      params: {
        page: pageNumber,
        ...(!!filters.selectedSort.length) && {sort_by: filters.selectedSort},
        ...(!!filters.selectedRegion) ? {watch_region: filters.selectedRegion.iso_3166_1} : {watch_region: "AR"},
        ...(!!filters.selectedProvider.length) && {with_watch_providers: formattedSelectedProvider},
        ...(!!filters.selectedGenre.length) && {with_genres: formattedSelectedGenre},
      }
    }))
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
    setLoadMoreBtn(false)
  }

  useEffect(() => { 
    handleFetchTvSeries();   
    dispatch(fetchAvailableRegions());
    dispatch(fetchTvGenres());
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
            <Typography variant="h6">TV Series</Typography>
            <Typography variant="body1">results: {items?.length}</Typography>
            <Typography variant="body1">current page: {page}</Typography>
            <Typography variant="body1">max page: {total_pages.toLocaleString()}</Typography>
            <Typography variant="body1">total results: {total_results.toLocaleString()}</Typography>
          </Paper>
          {filters.filtersHasChanged && (
          <Button 
            color='secondary' 
            variant="contained"
            onClick={handleFetchTvSeries}
            sx={{width: "100%", mt: "16px"}}
          >
            Apply filters
          </Button>            
          )}  
          <TvFilters
            filters={filters}
            setFilters={setFilters}
            tvGenres={tvGenres}
            availableRegions={availableRegions}
            tvProviders={tvProviders}
            handleFetchTvProviders={handleFetchTvProviders}
          />
        </Box>
        <Box flex={{xs: 1, md: 3}}>
          <ItemGridList
            items={items} 
            error={error}      
            >
            {(item, index ) => {
              if(items.length == index + 1) {
                return <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => addFavoriteTvSerie(item)}
                  onNavigate={`/tv/detail/${item.id}`}
                  isInLocal={isTvInLocal}
                  loading={loadMoreBtn === true && loading ? true : false} 
                  innerRef={ref}
                  />
              }
              return <ItemCard
                key={item.id}
                item={item}
                onClick={() => addFavoriteTvSerie(item)}
                onNavigate={`/tv/detail/${item.id}`}
                isInLocal={isTvInLocal}
                loading={loadMoreBtn === true && loading ? true : false} 
                /> 
            }
            }
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

export default TvPage