import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchTvCredits, fetchTvDetails, fetchTvImages, fetchTvRecommendations, fetchTvVideos } from '../../features/tv/tvAPI';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../../components/ItemList/ItemList';
import ItemCard from '../../components/ItemCard/ItemCard';
import { Box, Button, CircularProgress, Container, Divider, Fade, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { TvImageContainer, TvImagesList, TvImg, TvInfo, TvVideosList } from './styles';
import PersonCard from '../../components/PersonCard/PersonCard';
import { formatColorUserScore, formatDate, formatUserScore, formatYear } from '../../helpers/helpers';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import usePlatziMovies from '../../hooks/usePlatziMovies';
import { useInView } from 'react-intersection-observer';


const TvDetailPage = () => {
  const { id } = useParams();
  const { addFavoriteTvSerie, isTvInLocal } = usePlatziMovies();

  const tvDetails  = useSelector(state => state.tv.tvDetails);
  const recommendedTv = useSelector(state => state.tv.recommendedTv);
  const tvCredits = useSelector(state => state.tv.tvCredits);
  const tvTrailers = useSelector(state => state.tv.tvVideos.trailers);
  const tvVideos = useSelector(state => state.tv.tvVideos.videos);

  const tvBackdrops = useSelector(state => state.tv.tvImages.backdrops);
  const tvPosters = useSelector(state => state.tv.tvImages.posters);

  const dispatch = useDispatch();

  /*TABS*/
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleCurrentTabIndex = (event, newValue) => {
    setCurrentTabIndex(newValue);
  };

  useEffect(() => {
    dispatch(fetchTvDetails({
      pathParam: id
    }))   
    dispatch(fetchTvCredits({
      pathParam: id
    }))  
  }, [id])

  /*FETCH MEDIA */
  const {ref: refMedia, inView: inViewMedia} = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if(inViewMedia) {
      dispatch(fetchTvVideos({
        pathParam: id
      }))   
      dispatch(fetchTvImages({
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
      dispatch(fetchTvRecommendations({
        pathParam: id
      }))  
    }
  }, [inViewRecommended, id])


  return (
    <>
    <Container component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"} spacing={2}>
        <Box flex={{xs: 1}}>
          <TvImg>
            {tvDetails.loading === true && (
              <Skeleton width={"100%"} height={"426px"} variant='rectangular'/>
            )}  
            {tvDetails.loading === false && (
              <Fade in={true}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${tvDetails?.item?.poster_path}`}  
                  alt=""
                  loading='lazy'/>            
              </Fade>              
            )}          
          </TvImg>
        </Box>
        <Box flex={{xs: 1, md: 3}}>
          <TvInfo>
            {tvDetails.loading === true && (
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
            {tvDetails.loading === false && (
              <>
              <Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                  <Typography variant="h4" color="initial">{tvDetails.item.name}</Typography>  
                  <Typography variant="h6" color="initial" sx={{opacity: ".8"}}>({formatYear(tvDetails?.item?.first_air_date)})</Typography>  
                </Box>
                <Box sx={{display: "flex", gap: "5px", flexDirection: "column" }}>
                  <Typography variant="body2" color="initial">Seasons: {tvDetails.item.number_of_seasons}</Typography>
                  <Typography variant="body2" color="initial">Episodes {tvDetails.item.number_of_episodes}</Typography>
                  <Typography variant="body2" color="initial">First air date: {formatDate(tvDetails?.item?.first_air_date)}</Typography>
                  <Typography variant="body2" color="initial">Last air date: {formatDate(tvDetails?.item?.last_air_date)}</Typography>
                  <Typography variant="body2" color="initial">Status: {tvDetails.item.status}</Typography> 
                  <Typography variant="body2" color="initial">
                    Genres: 
                      {tvDetails.item?.genres?.map((genre) => 
                        <Typography variant="body2" color="initial" key={genre.id} component={"span"}> {genre.name}</Typography>
                      ).reduce((prev, curr) => [prev, ", ", curr])}
                  </Typography>
                  <Typography component={"div"} variant="body2" color="initial" sx={{display: "flex", gap: "5px", alignItems: "center"}}>
                    User score:
                    <Box>
                      <Box sx={{ position: 'relative', display: 'inline-flex', backgroundColor: "black", borderRadius: "100%"}}>
                        <CircularProgress 
                          variant="determinate" 
                          value={formatUserScore(tvDetails.item.vote_average)} 
                          color={formatColorUserScore(formatUserScore(tvDetails.item.vote_average))} />
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
                            {formatUserScore(tvDetails.item.vote_average)}%
                          </Typography>
                        </Box>
                      </Box>              
                    </Box>
                  </Typography> 
                </Box>     
              </Box>
              <Box>
                <Typography variant="body1" color="initial" sx={{fontStyle: "italic", opacity: ".8"}}>
                    {tvDetails.item.tagline}
                </Typography>
                <Typography variant="h6" color="initial">Overview</Typography>
                <Typography variant="body1" color="initial">{tvDetails.item.overview}</Typography>
              </Box>
              <Box>
                <Button color="secondary" variant='contained' endIcon={<FavoriteIcon />} onClick={() => addFavoriteTvSerie(tvDetails.item)}>
                  {isTvInLocal(tvDetails.item.id) ? "Remove from your favorite list" : "Add to your favorite list"}
                </Button>
              </Box>              
              </>
            )}
          </TvInfo>
        </Box>
      </Stack>
    </Container>

    <Container component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{mb: "24px"}}>
        <Typography variant="h6" color="secondary">Series Cast</Typography>
      </Box>
      <ItemList
        items={tvCredits.item.cast} 
        loading={tvCredits.loading} 
          >
          {item => ( 
            <PersonCard 
              key={item.id}
              person={item}
              loading={tvCredits.loading} 
            />
          )}
      </ItemList>
    </Container>

    <Container ref={refMedia} component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{mb: "24px"}}>
        <Typography variant="h6" color="secondary">Media</Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "10px"}}>
        <Tabs value={currentTabIndex} onChange={handleCurrentTabIndex} aria-label="media-tabs" textColor='secondary' indicatorColor='secondary'>
          <Tab label={`Trailers ${tvTrailers.itemsLength}`} />
          <Tab label={`Videos ${tvVideos.itemsLength}`} />
          <Tab label={`Backdrops ${tvBackdrops.itemsLength}`} />
          <Tab label={`Posters ${tvPosters.itemsLength}`} />
        </Tabs>
      </Box>
      {currentTabIndex === 0 && (
        <TvVideosList>
          {tvTrailers.items.map((video) => 
            <VideoPlayer videoUrl={video.key} key={video.id} />
          )}          
        </TvVideosList>    
      )}
      {currentTabIndex === 1 && (
        <TvVideosList>
          {tvVideos.items.map((video) => 
            <VideoPlayer videoUrl={video.key} key={video.id} />
          )}             
        </TvVideosList>      
      )}
      {currentTabIndex === 2 && (
        <TvImagesList>
          {tvBackdrops.itemsPreview.map((backdrop) => 
            <Fade in={true} key={backdrop.file_path}>
              <TvImageContainer key={backdrop.file_path}>
                <img               
                  src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}  
                  alt=""
                  loading='lazy' />
              </TvImageContainer>            
            </Fade>
          )}
        </TvImagesList>  
      )}
      {currentTabIndex === 3 && (
        <TvImagesList>
          {tvPosters.itemsPreview.map((poster) => 
            <Fade in={true} key={poster.file_path}>
              <TvImageContainer key={poster.file_path}>
                <img               
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}  
                  alt=""
                  loading='lazy' />
              </TvImageContainer>            
            </Fade>
          )}
        </TvImagesList>  
      )}      
    </Container>

    <Container maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Divider/>
    </Container>

    <Container ref={refRecommended} component={"section"} maxWidth="lg" sx={{mt: "32px", mb: "32px"}}>
      <Box sx={{mb: "24px"}}>
        <Typography variant="h6" color="secondary">Recommendations</Typography>
      </Box>

      {recommendedTv.items.length ? (
        <ItemList
          items={recommendedTv.items} 
          loading={recommendedTv.loading} 
            >
            {item => ( 
              <ItemCard 
                key={item.id}
                item={item}
                onClick={() => addFavoriteTvSerie(item)}
                onNavigate={`/tv/detail/${item.id}`}
                isInLocal={isTvInLocal}
                loading={recommendedTv.loading} 
              />
            )}
        </ItemList>
      ) : (
        <Typography variant="body1" color="initial">
          We don't have enough data to suggest any movies based on {tvDetails.item.name}.
        </Typography>              
      )}

    </Container>
    </>
  )
}

export default TvDetailPage