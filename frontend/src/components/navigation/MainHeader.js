import React from 'react';
import { Container, Grid } from '@mui/material';

import './MainHeader.css';
import theme from '../../Styles';

const styles = {
  root: {
    backgroundColor: theme.palette.background.secondary,
  }
}

const MainHeader = (props) => {
  return (
    <Grid sx={styles.root}>
      <Container>
        <header className='main-header'>{props.children}</header>
      </Container>
    </Grid>
  );
};

export default MainHeader;
