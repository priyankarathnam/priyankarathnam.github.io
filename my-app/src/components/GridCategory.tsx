import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface IGridCategory {
    category: string;
}

const StyledToggleButton = styled(ToggleButton)(() => ({
    '&.MuiToggleButton-root': {
        border: "none",
        color: "white",
        backgroundColor: "#a0b3d3"
    },
    '&.Mui-disabled': {
        border: "none",
        color: "white",
        backgroundColor: "#a0b3d3"
    }
  }));

export default function GridCategory(props: IGridCategory) {
  const { category } = props;
  return (
    <StyledToggleButton
    value={category}
    sx={{ width: 318, height: 75, backgroundColor: "#a0b3d3", border: "none" }}
    disabled
  >
      <Typography align="center" component="div" fontSize={11} sx={{color: "white"}} fontWeight="bold">
        {category}
      </Typography>
  </StyledToggleButton>
  );
}