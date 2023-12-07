import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieImages, fetchMovieRecommendations, fetchMovieVideos} from '../../features/movie/movieAPI';
import ItemList from '../../components/ItemList/ItemList';
import ItemCard from '../../components/ItemCard/ItemCard';
import { Box, Button, Container, Divider, Stack, Typography, Tabs, Tab, Fade, Skeleton, CircularProgress } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { MovieImageContainer, MovieImagesList, MovieImg, MovieInfo, MovieVideosList} from './Styles';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import PersonCard from '../../components/PersonCard/PersonCard';
import { formatColorUserScore, formatDate, formatRuntime, formatUserScore, formatYear } from '../../helpers/helpers';
import usePlatziMovies from '../../hooks/usePlatziMovies';
import { useInView } from 'react-intersection-observer';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { addFavoriteMovie, isMovieInLocal } = usePlatziMovies();

  const movieDetails  = useSelector(state => state.movie.movieDetails);
  const recommendedMovies = useSelector(state => state.movie.recommendedMovies);
  const movieCredits = useSelector(state => state.movie.movieCredits);
  const movieTrailers = useSelector(state => state.movie.movieVideos.trailers);
  const movieVideos = useSelector(state => state.movie.movieVideos.videos);

  const movieBackdrops = useSelector(state => state.movie.movieImages.backdrops);
  const moviePosters = useSelector(state => state.movie.movieImages.posters);

  const dispatch = useDispatch();

  /*TABS*/
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleCurrentTabIndex = (event, newValue) => {
    setCurrentTabIndex(newValue);
  };


  useEffect(() => {
    dispatch(fetchMovieDetails({
      pathParam: id
    }))
    dispatch(fetchMovieCredits({
      pathParam: id
    }))
  }, [id])

  /*FETCH MEDIA */
  const {ref: refMedia, inView: inViewMedia} = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if(inViewMedia) {
      dispatch(fetchMovieVideos({
        pathParam: id
      }))    
      dispatch(fetchMovieImages({
        pathParam: id
      }))  
    }
  }, [inViewMedia, id])


  /*FETCH RECOMMENDED*/
  const {ref:refRecommended, inView:inViewRecommended} = useInView({
    triggerOnce: true, 
  });

  useEffect(() => {
    if(inViewRecommended) {
      dispatch(fetchMovieRecommendations({
        pathParam: id
      }))
    }
  }, [inViewRecommended, id])

  return (
    <>
    <Container component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"} spacing={2}>
        <Box flex={{xs: 1}}>
          <MovieImg>
            {movieDetails.loading === true && (
              <Skeleton width={"100%"} height={"426px"} variant='rectangular'/>
            )}
            {movieDetails.loading === false && (
              <Fade in={true}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movieDetails?.item?.poster_path}`}  
                  alt=""
                  loading='lazy' />
              </Fade>            
            )}            
          </MovieImg>
        </Box>
        <Box flex={{xs: 1, md: 3}}>
          <MovieInfo>
            {movieDetails.loading === true && (
              <>
              <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                <Skeleton animation="wave" width={"45%"} height={"50px"} />                
                <Skeleton animation="wave" width={"60px"} height={"50px"} />
              </Box>
              <Skeleton animation="wave" width={"30%"} />
              <Skeleton animation="wave" width={"30%"} />   
              <Skeleton animation="wave" width={"30%"} />
              <Skeleton animation="wave" width={"30%"} />  

              <Skeleton animation="wave" width={"45%"} height={"50px"} />  
              <Skeleton animation="wave" width={"30%"} />
              <Skeleton animation="wave" width={"30%"} />                   
              </>
            )}
            {movieDetails.loading === false && (
              <>
              <Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}> 
                  <Typography variant="h4" color="initial">{movieDetails.item.title}</Typography>  
                  <Typography variant="h6" color="initial" sx={{opacity: ".8"}}>({formatYear(movieDetails?.item?.release_date)})</Typography>                    
                </Box>
                <Box sx={{display: "flex", gap: "5px", flexDirection: "column" }}>             
                  <Typography variant="body2" color="initial">Release date: {formatDate(movieDetails?.item?.release_date)}</Typography>
                  <Typography variant="body2" color="initial">
                    Runtime: {formatRuntime(movieDetails?.item?.runtime)[0]}h {formatRuntime(movieDetails?.item?.runtime)[1]}min
                  </Typography> 
                    <Typography variant="body2" color="initial">Budget: ${movieDetails?.item?.budget?.toLocaleString()}</Typography>
                    <Typography variant="body2" color="initial">Revenue: ${movieDetails?.item?.revenue?.toLocaleString()}</Typography>
                    <Typography variant="body2" color="initial">
                      Genres: 
                        {movieDetails.item?.genres?.map((genre) => 
                          <Typography variant="body2" color="initial" key={genre.id} component={"span"}> {genre.name}</Typography>
                        ).reduce((prev, curr) => [prev, ", ", curr])}
                    </Typography> 
                    <Typography component={"div"} variant="body2" color="initial" sx={{display: "flex", gap: "5px", alignItems: "center"}}>
                      User score:
                      <Box>
                        <Box sx={{ position: 'relative', display: 'inline-flex', backgroundColor: "black", borderRadius: "100%"}}>
                          <CircularProgress 
                            variant="determinate" 
                            value={formatUserScore(movieDetails.item.vote_average)} 
                            color={formatColorUserScore(formatUserScore(movieDetails.item.vote_average))} />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: 'absolute',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Typography variant="caption" component="div" color="#EEEAF2">
                              {formatUserScore(movieDetails.item.vote_average)}%
                            </Typography>
                          </Box>
                        </Box>              
                      </Box>
                    </Typography>   
                </Box>     
              </Box>
              <Box>
                <Typography variant="body1" color="initial" sx={{fontStyle: "italic", opacity: ".8"}}>
                  {movieDetails.item.tagline}
                </Typography>
                <Typography variant="h6" color="initial">Overview</Typography>
                <Typography variant="body1" color="initial">{movieDetails.item.overview}</Typography>
              </Box>
              <Box>
                <Button color="secondary" variant='contained' endIcon={<FavoriteIcon />} onClick={() => addFavoriteMovie(movieDetails.item)}>
                  {isMovieInLocal(movieDetails.item.id) ? "Remove from your favorite list" : "Add to your favorite list"}
                </Button>
              </Box>              
              </>
            )}
          </MovieInfo>
        </Box>
      </Stack>
    </Container>
    <Container component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{mb: "24px"}}>
        <Typography variant="h6" color="secondary">Cast</Typography>
      </Box>
      <ItemList
        items={movieCredits.item.cast} 
        loading={movieCredits.loading} 
          >
          {item => ( 
            <PersonCard 
              key={item.id}
              person={item}
              loading={movieCredits.loading} 
            />
          )}
      </ItemList>
    </Container>

    <Container ref={refMedia} component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{mb: "24px"}}>
        <Typography variant="h6" color="secondary">Media</Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "10px" }}>
        <Tabs value={currentTabIndex} onChange={handleCurrentTabIndex} aria-label="media-tabs" textColor='secondary' indicatorColor='secondary'>
          <Tab label={`Trailers ${movieTrailers.itemsLength}`}/>
          <Tab label={`Videos ${movieVideos.itemsLength}`} i/>
          <Tab label={`Backdrops ${movieBackdrops.itemsLength}`}/>
          <Tab label={`Posters ${moviePosters.itemsLength}`} />
        </Tabs>
      </Box>
      {currentTabIndex === 0 && (
        <MovieVideosList>
          {movieTrailers.items.map((video) => 
            <VideoPlayer videoUrl={video.key} key={video.id} />
          )}          
        </MovieVideosList>        
      )}
      {currentTabIndex === 1 && (
        <MovieVideosList>
          {movieVideos.items.map((video) => 
            <VideoPlayer videoUrl={video.key} key={video.id} />
          )}          
        </MovieVideosList>        
      )}
      {currentTabIndex === 2 && (
        <MovieImagesList>
          {movieBackdrops.itemsPreview.map((backdrop) => 
            <Fade in={true} key={backdrop.file_path}>
              <MovieImageContainer>
                <img               
                  src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}  
                  alt={backdrop.file_path}
                  loading='lazy' />
              </MovieImageContainer>            
            </Fade>
          )}
        </MovieImagesList>     
      )}
      {currentTabIndex === 3 && (
        <MovieImagesList>
          {moviePosters.itemsPreview.map((poster) => 
            <Fade in={true} key={poster.file_path}>
              <MovieImageContainer>
                <img               
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}  
                  alt={poster.file_path}
                  loading='lazy' />
              </MovieImageContainer>            
            </Fade>
          )}
        </MovieImagesList>    
      )}
    </Container>

    <Container maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Divider/>
    </Container>

    <Container ref={refRecommended} component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{mb: "24px"}}>
        <Typography variant="h6" color="secondary">Recommendations</Typography>
      </Box>
      {recommendedMovies.items.length ? (
        <ItemList
          items={recommendedMovies.items} 
          error={recommendedMovies.error}
            >
            {item => ( 
              <ItemCard 
                key={item.id}
                item={item}
                onClick={() => addFavoriteMovie(item)}
                onNavigate={`/movie/detail/${item.id}`}
                isInLocal={isMovieInLocal}
                loading={recommendedMovies.loading} 
              />
            )}
        </ItemList> 
      ) : (
        <Typography variant="body1" color="initial">
          We don't have enough data to suggest any movies based on {movieDetails.item.title}.
        </Typography>              
      )}
    </Container>
    </>
  )
}

export default MovieDetailPage

