import React from 'react'
import styled from '@emotion/styled'

const GridList = styled("article")(({theme}) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "5px",
  [theme.breakpoints.up("sm")] : {
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },
  "& div a": { 
    height: "240px",
    [theme.breakpoints.up("sm")] : { 
      height: "275px"
    },
    [theme.breakpoints.up("md")] : { 
      height: "313px"
    }
  },
  "& div a span": { //select skeleton span
    width: "100%",
    height: "240px",
    [theme.breakpoints.up("sm")] : { 
      height: "275px"
    },
    [theme.breakpoints.up("md")] : { 
      height: "313px"
    }
  }
}));

const ItemGridList = ({children, render, items, error }) => {
  const renderFunc = children || render

  return (
    <GridList>
      {error && <p>{error}</p>}
      {items?.map(renderFunc)}
    </GridList>
  )
}

export default ItemGridList
