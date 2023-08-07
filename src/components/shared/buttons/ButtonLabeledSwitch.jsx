import React, {memo} from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const useStyles = () => ({
  label: {
    margin: 0,
  },
});

const ButtonLabeledSwitch = ({
  label,
  labelPlacement,
  checked,
  onChange,
  'data-testid': dataTestId,
  ...props
}) => {
  const styles = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        data-testid={
          'btn-label-switch-container' + (dataTestId ? `-${dataTestId}` : '')
        }
        classes={{
          root: styles.label,
        }}
        control={
          <Switch
            data-testid={
              'btn-label-switch' + (dataTestId ? `-${dataTestId}` : '')
            }
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label={label}
        labelPlacement={labelPlacement}
        {...props}
      />
    </FormGroup>
  );
};

ButtonLabeledSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
};

export default memo(ButtonLabeledSwitch);
