import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import BaseIconButton from './BaseIconButton';

const useStyles = () => ({
  root: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
  },
});

const BaseIconButtonGroup = ({sx, value, onChange, size, items}) => {
  const styles = useStyles();
  const theme = useTheme();

  const backgroundColor = sx.backgroundColor || theme.palette.background.light;

  return (
    <Box
      sx={{
        ...styles.root,
        ...sx,
        backgroundColor,
        height: size.toString() + 'px',
      }}>
      {items.map((item) => {
        return (
          <BaseIconButton
            key={item.value}
            icon={item.icon}
            tooltip={item.tooltip}
            size={size}
            sx={{
              backgroundColor,
            }}
            onClick={() => {
              onChange(item.value);
            }}
            color={value === item.value ? theme.palette.primary.main : null}
          />
        );
      })}
    </Box>
  );
};

BaseIconButtonGroup.defaultProps = {
  sx: {},
  value: '',
  onChange: () => {},
  backgroundColor: null,
  size: 32,
  items: [],
};

BaseIconButtonGroup.propTypes = {
  sx: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
  backgroundColor: PropTypes.string,
  size: PropTypes.number,
  items: PropTypes.array.isRequired,
};

export default BaseIconButtonGroup;
