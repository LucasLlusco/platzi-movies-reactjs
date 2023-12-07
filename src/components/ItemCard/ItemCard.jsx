import React from 'react'
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Fade, IconButton, Skeleton, Typography } from '@mui/material';
import { FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import styled from '@emotion/styled';
import { formatColorUserScore, formatDate, formatUserScore } from '../../helpers/helpers';

const ItemContainer = styled("div") ({
  position: "relative",
  display: "flex",
  flexDirection: "column"
})

const ItemImg = styled("img") ({
  borderRadius: "8px",
  width: "100%", 
  height: "100%" 
})

const ItemAddButton = styled(IconButton) ({
  position: "absolute",
  top: "5px",
  right: "10px",
  zIndex: "5"
})

const ItemContent = styled("div") ({
  padding: "15px 5px 10px 5px",
  position: "relative"
})



const ItemCard = ({item, onClick, onNavigate, isInLocal, loading, innerRef}) => {

  let isFavorite
  if(isInLocal(item.id)) { 
    isFavorite = true;
  } else {
    isFavorite = false;
  }

  return (
    <>
    {loading === true && (
      <ItemContainer>
        <Link>
          <Skeleton variant='rectangular' animation="wave" /> 
        </Link>
        <ItemContent>
          <Skeleton animation="wave" width={"90%"} />
          <Skeleton animation="wave" width={"90%"} />
        </ItemContent>
      </ItemContainer>      
    )}
    {loading === false && (
    <Fade in={true}>
      <ItemContainer ref={innerRef}>
          <Link to={onNavigate}>
            <ItemImg 
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
              alt={item.title} 
              loading='lazy'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src="/default-movie-img.svg";
              }}
            />
          </Link>
          <ItemAddButton aria-label="add to favorites" color='error' onClick={onClick}>
            {isFavorite ? (
              <FavoriteIcon />        
            ) : ( 
              <FavoriteBorderIcon/>
            )}       
          </ItemAddButton>
          <ItemContent>
            <Box sx={{position: "absolute", top: "-27px"}}>
              <Box sx={{ position: 'relative', display: 'inline-flex', backgroundColor: "black", borderRadius: "100%"}}>
                <CircularProgress 
                  variant="determinate" 
                  value={formatUserScore(item.vote_average)} 
                  color={formatColorUserScore(formatUserScore(item.vote_average))} />
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
                    {formatUserScore(item.vote_average)}%
                  </Typography>
                </Box>
              </Box>              
            </Box>
            <Typography variant="body2" color="initial" sx={{fontWeight: "bold"}}>
              {item.title}
              {item.name}
            </Typography>
            <Typography variant="caption"  color="initial">
              {item.release_date && formatDate(item.release_date)}
              {item.first_air_date && formatDate(item.first_air_date)}
            </Typography> 
          </ItemContent>
      </ItemContainer>
    </Fade>      
    )}
    </>
  )
}

export default ItemCard