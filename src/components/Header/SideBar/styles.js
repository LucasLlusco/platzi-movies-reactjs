import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const DrawerHeader  = styled("div") ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: "8px",
})

export const StyledLink = styled(Link) ({
  color: "#EEEAF2",
  textDecoration: "none",
  width: "100%",
  fontWeight: "500"
})