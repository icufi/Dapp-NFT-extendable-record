import React from 'react';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import './MainHeader.css';
import theme from '../../Styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.secondary,
  }
});

const MainHeader = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Container>
        <header className='main-header'>{props.children}</header>
      </Container>
    </Grid>
  );
};

export default MainHeader;
