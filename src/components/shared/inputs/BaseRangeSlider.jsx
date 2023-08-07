import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';

const useStyle = () => ({
  slider: {
    '& .MuiSlider-thumb': {
      backgroundColor: 'grey.50',
      border: '2px solid white',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.2,
      padding: 0,
    },
  },
});

const BaseRangeSlider = ({value, handleChange, min, max, sx}) => {
  const styles = useStyle();

  return (
    <Slider
      sx={{
        ...styles.slider,
        ...sx,
      }}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      min={min}
      max={max}
    />
  );
};

export default BaseRangeSlider;

BaseRangeSlider.propTypes = {
  sx: PropTypes.object,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

BaseRangeSlider.defaultProps = {
  sx: {},
  min: 1,
  max: 5,
};
