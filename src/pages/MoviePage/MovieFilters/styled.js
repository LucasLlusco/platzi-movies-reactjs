import styled from "@emotion/styled"
import { AccordionSummary, ToggleButton } from "@mui/material"

export const StyledAccordionSummary = styled(AccordionSummary)`
  &.Mui-expanded { 
    border-bottom: 1px solid #eee;
    min-height: 48px;
    margin: 0;
  }
`

export const StyledToggleButton = styled(ToggleButton)`
  position: relative;
  padding: 0px;
  border: none; 
  border-radius: 5px;
  &.MuiToggleButtonGroup-grouped:not(:first-of-type) {
    border-left: 0px;
    margin-left: 0px;
  }
  &.Mui-selected { 
    border-left: 0px;
    margin-left: 0px;
    & div { 
      display: flex;
    } 
  }
`

export const ProviderImgActive = styled("div") ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  height: "100%",
  width: "100%",
  backgroundColor: "#01b4e4e6",
  borderRadius: "5px"
})

export const ProviderImg = styled("img") ({
  width: "100%",
  borderRadius: "5px"
})