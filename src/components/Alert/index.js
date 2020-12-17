import React from 'react';
import Alert from '@material-ui/lab/Alert';

function AlertWrap({ children, type, ...others }) {
  return (
    <Alert severity={type} {...others}>
      {children}
    </Alert>
  );
}

export default AlertWrap;
