import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const useStyles = () => ({
  root: (theme) => ({
    padding: '0px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.light,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
});

const BaseIconButton = ({
  tooltip,
  tooltipPlacement,
  dataTestId,
  color,
  icon: Icon,
  size,
  onClick,
  sx,
  children,
}) => {
  const styles = useStyles();

  const RenderIcon = (props) => {
    return Icon ? <Icon {...props} /> : null;
  };

  const buttonSize = size.toString() + 'px';

  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <IconButton
        onClick={onClick}
        sx={(theme) => ({
          ...styles.root(theme),
          width: buttonSize,
          height: buttonSize,
          ...(typeof sx === 'function' ? sx(theme) : sx),
        })}
        data-testid={dataTestId}>
        {children || (
          <RenderIcon
            width={(size * 0.7).toFixed(0).toString() + 'px'}
            height={(size * 0.7).toFixed(0).toString() + 'px'}
            color={color}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

BaseIconButton.defaultProps = {
  onClick: () => {},
  tooltip: '',
  tooltipPlacement: 'bottom',
  dataTestId: '',
  size: 32,
  icon: null,
  color: null,
};

BaseIconButton.propTypes = {
  sx: PropTypes.any,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  dataTestId: PropTypes.string,
  size: PropTypes.number,
  icon: PropTypes.elementType,
  color: PropTypes.string,
  children: PropTypes.node,
};

export default BaseIconButton;
