import React from 'react';
import PropTypes from 'prop-types';
import {Box, FormControlLabel, Switch, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';

const useStyles = () => ({
  root: (theme) => ({
    width: '50px',
    paddingY: '8px',
    paddingX: '0px',
    '& .Mui-checked': {transform: 'translateX(28px) !important'},
    '& .MuiSwitch-switchBase': {
      padding: 0,
      marginY: 1,
    },
    '& .MuiSwitch-track': {
      width: '100%',
      height: '100%',
      borderRadius: '20px',
      opacity: '1 !important',
      backgroundColor: theme.palette.primary.main,
      '&:after, &:before': {
        color: theme.palette.common.black,
        fontSize: '11px',
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:after': {
        left: '5px',
      },
      '&:before': {
        right: '5px',
      },
    },
    '& .MuiSwitch-thumb': {
      color: theme.palette.common.white,
      width: '22px',
      height: '22px',
      margin: '0px',
      boxShadow: 'none',
    },
  }),
});

const BaseSwitch = ({
  checked,
  onChange,
  disabled,
  label,
  checkedLabel,
  uncheckedLabel,
  labelPlacement,
  ...props
}) => {
  const styles = useStyles();
  const theme = useTheme();

  const customStyles = styles.root(theme);

  customStyles['& .MuiSwitch-track']['&:after'].content = `"${checkedLabel}"`;
  customStyles['& .MuiSwitch-track'][
    '&:before'
  ].content = `"${uncheckedLabel}"`;

  return (
    <>
      {label && (
        <FormControlLabel
          disabled={disabled}
          control={
            <Box
              // Depending on label placement add spacing between label and switch
              sx={{
                ...(labelPlacement === 'start' && {marginLeft: '8px'}),
                ...(labelPlacement === 'end' && {marginRight: '8px'}),
              }}>
              <Switch
                checked={checked}
                onChange={(_, value) => onChange(value)}
                sx={customStyles}
                {...props}
              />
            </Box>
          }
          label={<Typography variant="caption">{label}</Typography>}
          labelPlacement={labelPlacement}
        />
      )}
      {!label && (
        <Switch
          checked={checked}
          onChange={(_, value) => onChange(value)}
          sx={customStyles}
          disabled={disabled}
          {...props}
        />
      )}
    </>
  );
};

BaseSwitch.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  checkedLabel: PropTypes.string,
  uncheckedLabel: PropTypes.string,
  labelPlacement: PropTypes.string,
};

BaseSwitch.defaultProps = {
  labelPlacement: 'end',
  disabled: false,
};

export default BaseSwitch;
