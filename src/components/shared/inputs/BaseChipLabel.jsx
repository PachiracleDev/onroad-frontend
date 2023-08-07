import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Chip from '@mui/material/Chip';
import {useStyles} from '@/components/common/inputs/BaseChipLabel.styles';

const BaseChipLabel = ({label, ...props}) => {
  const styles = useStyles();

  return <Chip sx={styles.baseChipLabel} label={label} {...props} />;
};

export default BaseChipLabel;

BaseChipLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

BaseChipLabel.defaultProps = {
  label: '',
};
