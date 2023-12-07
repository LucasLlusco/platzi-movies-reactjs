import React from 'react'
import styled from '@emotion/styled'


const List = styled("article")`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;

  & div a { 
    height: 225px;
    width: 150px;
  }
  & div a span { //select skeleton span
    height: 225px;
    width: 150px;
  }
`

const ItemList = ({children, items, error, render}) => {
  const renderFunc = children || render
  
  return (
    <List>
      {error && <p>{error}</p>}
      {items?.map(renderFunc)}
    </List>
  )
}

export default ItemList