import * as React from 'react';

import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import { IWord } from '../data/Words';
import { styled } from '@mui/material/styles';

interface IGridCard {
  word: IWord;
  isSelected: boolean;
  onSelected: (word: IWord) => void;
}

const StyledToggleButton = styled(ToggleButton)(() => ({
  '&.MuiToggleButton-root': {
    backgroundColor: "#e9edf1", 
    border: "none" 
  },
  '&.Mui-selected': {
    border: "none",
    color: "white",
    backgroundColor: "#a0b3d3"
  },
  '&.Mui-selected:hover': {
    border: "none",
    color: "white",
    backgroundColor: "#a0b3d3"
  },
}));

export default function GridCard(props: IGridCard) {
    const { word, isSelected, onSelected } = props;

    return (
      <StyledToggleButton
        value={word}
        selected={isSelected}
        onChange={(event, value) => {
          onSelected(value);
        }}
        sx={{ width: 70, height: 70}}
      >
          <Typography align="center" component="div" fontSize={11} fontWeight="bold">
            {word.word}
          </Typography>
      </StyledToggleButton>
  );
}