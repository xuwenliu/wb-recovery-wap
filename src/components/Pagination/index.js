import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    height: '40px',
    marginTop: '10px',
    marginLeft: theme.spacing(20),
  },
}));

function PaginationWrap({ totalPages, page, onChange }) {
  const classes = useStyles();
  return (
    <Pagination
      className={classes.root}
      showFirstButton
      showLastButton
      variant="outlined"
      color="secondary"
      count={totalPages}
      page={page}
      onChange={onChange}
    />
  );
}

export default PaginationWrap;
