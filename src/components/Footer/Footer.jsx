import React from 'react'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'


const FooterContainer = styled("footer")`
  background-color: #5C218A;
  text-align: center;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body1" color="#EEEAF2">
        Hecho con amor por <Link href="https://github.com/LucasLlusco" color={"inherit"}>@Lucas Llusco</Link>
      </Typography>
    </FooterContainer>
  )
}

export default Footer