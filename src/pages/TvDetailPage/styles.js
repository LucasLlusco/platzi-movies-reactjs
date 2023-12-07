import styled from "@emotion/styled"
import { Stack } from "@mui/material"

export const TvInfo = styled(Stack) ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
})

export const TvImg = styled("div")(({theme}) => ({
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

export const TvVideosList = styled("div")`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: 8px;
`

export const TvImagesList = styled("div")`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: 8px;
`

export const TvImageContainer = styled("div")`
  & img {
    height: 300px;
  }
`