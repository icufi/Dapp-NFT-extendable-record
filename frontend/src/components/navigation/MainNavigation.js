import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../../shared/components/UIElements/Backdrop';
import { AuthContext } from '../../shared/context/auth-context';

import logo3 from '../../assets/images/logo3.svg';
import './MainNavigation.css';

const styles = {
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
};

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        {!auth.currentAccount && (
          <button
            className='main-navigation__menu-btn'
            onClick={openDrawerHandler}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <h1 className='main-navigation__title'>
          <Link to='/'>
            <Box
              sx={styles.logo}
              component='img'
              src={logo3}
              alt='Visible Logo Title'
            />
          </Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
