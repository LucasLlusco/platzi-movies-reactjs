import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopular, fetchTrending } from '../../features/home/homeAPI';
import ItemList from '../../components/ItemList/ItemList';
import ItemCard from '../../components/ItemCard/ItemCard';
import { ToggleButton, ToggleButtonGroup, Typography, Container, Box } from '@mui/material';
import { SearchPreviewContainer } from './styles';
import usePlatziMovies from '../../hooks/usePlatziMovies';
import { useInView } from 'react-intersection-observer';
import SearchBar from './SearchBar/SearchBar';

const HomePage = () => {
  const { favoriteMovies , favoriteTvSeries, addFavoriteTvSerie, addFavoriteMovie, 
    isMovieInLocal, isTvInLocal } = usePlatziMovies();

  const trending = useSelector(state => state.home.trending);
  const popular = useSelector(state => state.home.popular);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    time: "day", 
    type: "movie", 
    favList: "movie"
  });

  /*FETCH TRENDING */
  const handleTrendingFilter = (e, newFilterValue) => {
    setFilters({...filters, time: newFilterValue})
    handleFetchTrending(newFilterValue);
  }

  const handleFetchTrending = (time) => {
    dispatch(fetchTrending({
      pathParam: time
    }));   
  }
    
  const {ref: refTrending, inView: inViewTrending} = useInView({
    triggerOnce: true
  });
  
  useEffect(() => {
    if(inViewTrending) {
      handleFetchTrending(filters.time);        
    }
  }, [inViewTrending])
  
  /*FETCH POPULAR */
  const handlePopularFilter = (e, newFilterValue) => {
    setFilters({...filters, type: newFilterValue})
    handleFetchPopular(newFilterValue);
  }

  const handleFetchPopular = (type) => {
    dispatch(fetchPopular({
      pathParam: type
    }));   
  }
  
  const {ref: refPopular, inView: inViewPopular} = useInView({
    triggerOnce: true
  });

  useEffect(() => {
    if(inViewPopular) {
      handleFetchPopular(filters.type);
    }
  }, [inViewPopular])
  

  /*FAVORITES */
  const handleFavListFilter = (e, newFilterValue) => {
    setFilters({...filters, favList: newFilterValue})
  }
    
  return (
    <>
    <SearchPreviewContainer>      
      <Container maxWidth="lg" >
        <Typography component={"h2"} sx={{color: "#EEEAF2", fontSize: {xs: "44px", md: "50px"}, fontWeight: "bold"}}>
          Welcome.
        </Typography>
        <Typography component={"h3"} sx={{color: "#EEEAF2", fontSize: {xs: "24px", md: "32px"}, fontWeight: "bold"}}>
          Millions of movies, TV shows to discover. Explore now.
        </Typography>
        <SearchBar/>
      </Container>
    </SearchPreviewContainer>
    <Container ref={refTrending} component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{display: "flex", mb: "24px", alignItems: "center", gap: "24px"}}>
        <Typography variant="h6" color="secondary">Trending</Typography>
          <ToggleButtonGroup
            color="secondary"
            value={filters.time}
            exclusive
            onChange={handleTrendingFilter}
            aria-label="trending"
            size='small'
          >
          <ToggleButton value="day">Today</ToggleButton>
          <ToggleButton value="week">This week</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <ItemList
        items={trending.items} 
        error={trending.error}
        >
        {item => ( 
          <ItemCard 
            key={item.id}
            item={item}
            onClick={() => item.media_type === "movie" ? addFavoriteMovie(item) :addFavoriteTvSerie(item)}
            onNavigate={item.media_type === "movie" ? `/movie/detail/${item.id}` : `/tv/detail/${item.id}`}
            isInLocal={item.media_type === "movie" ? isMovieInLocal : isTvInLocal}
            loading={trending.loading}
          />
        )}
      </ItemList>
    </Container> 

    <Container ref={refPopular} component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{display: "flex", mb: "24px", alignItems: "center", gap: "24px"}}>
        <Typography variant="h6" color="secondary">What's Popular</Typography>
          <ToggleButtonGroup
            color="secondary"
            value={filters.type}
            exclusive
            onChange={handlePopularFilter}
            aria-label="popular"
            size='small'
          >
          <ToggleButton value="movie">Movies</ToggleButton>
          <ToggleButton value="tv">Tv</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <ItemList
        items={popular.items} 
        error={popular.error}
        >
        {item => (
          <ItemCard 
            key={item.id}
            item={item}
            onClick={() => filters.type === "movie" ? addFavoriteMovie(item) :addFavoriteTvSerie(item)}
            onNavigate={filters.type === "movie" ? `/movie/detail/${item.id}` : `/tv/detail/${item.id}`}
            isInLocal={filters.type === "movie" ? isMovieInLocal : isTvInLocal}
            loading={popular.loading}
          />
        )}
      </ItemList>
    </Container> 

    <Container component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{display: "flex", mb: "24px", alignItems: "center", gap: "24px"}}>
        <Typography variant="h6" color="secondary">My Favorites</Typography>
          <ToggleButtonGroup
            color="secondary"
            value={filters.favList}
            exclusive
            onChange={handleFavListFilter}
            aria-label="favorites"
            size='small'
          >
          <ToggleButton value="movie">Movies {favoriteMovies.length}</ToggleButton>
          <ToggleButton value="tv">Tv {favoriteTvSeries.length}</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {filters.favList === "movie" && (
        <>
        {favoriteMovies.length ? (
          <ItemList items={favoriteMovies}>
            {item => ( 
              <ItemCard 
                key={item.id}
                item={item}
                onClick={() => addFavoriteMovie(item)}
                onNavigate={`/movie/detail/${item.id}`}
                isInLocal={isMovieInLocal}  
                loading={false}                  
              />
            )}
          </ItemList> 
          ) : (
          <Typography variant="body1" color="initial">
            You haven't added any favorite movies.
          </Typography>              
          )} 
        </>
      )}
      {filters.favList === "tv" && (
        <>
        {favoriteTvSeries.length ? (
          <ItemList items={favoriteTvSeries}>
            {item => ( 
              <ItemCard 
                key={item.id}
                item={item}
                onClick={() => addFavoriteTvSerie(item)}
                onNavigate={`/tv/detail/${item.id}`}
                isInLocal={isTvInLocal}
                loading={false}          
              />
            )}
          </ItemList>  
        ) : (
          <Typography variant="body1" color="initial">
            You haven't added any favorite tv series.
          </Typography>              
        )} 
        </>
      )}      
    </Container> 
    </>
    )
}

export default HomePage