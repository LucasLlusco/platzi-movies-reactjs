import styled from '@emotion/styled'
import { Fade, Skeleton, Typography } from '@mui/material'
import React from 'react'

const PersonContainer = styled("div")`
  position: relative;
  display: flex;
  flex-Direction: column;
`
const PersonWrapper = styled("div")`
  width: 150px;
  height: 225px;
`

const PersonImg = styled("img")`
  border-radius: 8px;
  width: 100%;
  height: 100%;
`

const PersonContent = styled("div")`
  padding: 5px;
`


const PersonCard = ({person, loading}) => {
  return (
    <>
    {loading === true && (
      <PersonContainer>
        <Skeleton variant='rectangular' animation="wave" width={"150px"} height={"225px"}/>
        <PersonContent>
          <Skeleton animation="wave" width={"90%"} />
          <Skeleton animation="wave" width={"90%"} />   
        </PersonContent>
      </PersonContainer>
    )}
    {loading === false && (
      <Fade in={true}>
        <PersonContainer>
          <PersonWrapper>
            <PersonImg 
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}  
              alt={person.name}
              loading='lazy'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src="/default-person-img.svg";
              }}
            />            
          </PersonWrapper>
          <PersonContent>
            <Typography variant="body2" color="initial" sx={{fontWeight: "bold"}}>
              {person.name}
            </Typography>
            <Typography variant="caption"  color="initial">
              {person.character}
            </Typography> 
          </PersonContent>         
        </PersonContainer> 
      </Fade>          
    )}
    </>
  )
}

export default PersonCard