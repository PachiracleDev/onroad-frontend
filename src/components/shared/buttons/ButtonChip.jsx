import React, {memo} from 'react';
import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import {Typography} from '@mui/material';

const useStyles = () => ({
  button: {
    marginTop: 1,
    marginRight: 1,
    border: '1px solid transparent',
    height: '24px',
    fontSize: '14px',
  },
  outlined: (theme) => ({
    border: '1px solid ' + theme.palette.primary.main,
    '& .MuiChip-label': {
      color: theme.palette.primary.main,
    },
  }),
  action: (theme) => ({
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.light + '!important',
    },
  }),
  chipProgress: {
    position: 'absolute',
    right: '50%',
  },
});

const ButtonChip = ({
  selected,
  isAction,
  loading,
  disabled,
  label,
  size,
  ...props
}) => {
  const styles = useStyles();

  return (
    <Chip
      sx={[
        styles.button,
        selected ? {} : styles.outlined,
        isAction && !selected ? styles.action : {},
      ]}
      color={selected ? 'primary' : 'default'}
      variant={selected ? 'default' : 'outlined'}
      icon={
        loading ? <CircularProgress sx={styles.chipProgress} size={16} /> : null
      }
      disabled={loading || disabled}
      label={<Typography variant="caption">{label}</Typography>}
      size={size || 'medium'}
      {...props}
    />
  );
};

ButtonChip.propTypes = {
  selected: PropTypes.bool,
  isAction: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.string,
};

export default memo(ButtonChip);
