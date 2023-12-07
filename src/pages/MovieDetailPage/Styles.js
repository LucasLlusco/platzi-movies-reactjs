import styled from "@emotion/styled"
import { Stack } from "@mui/material"

export const MovieInfo = styled(Stack) ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
})

export const MovieImg = styled("div")(({theme}) => ({
  width: "fit-content",
  margin: "0 auto",
  "& img": { 
    width: "100%",
    height: "330px",
    borderRadius: "8px",
    [theme.breakpoints.up("md")] : {
      height: "initial"
    }
  }
}));

export const MovieVideosList = styled("div")`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: 8px;
`

export const MovieImagesList = styled("div")`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: 8px;
`

export const MovieImageContainer = styled("div")`
  & img {
    height: 300px;
  }
`