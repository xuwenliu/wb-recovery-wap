import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from 'umi/router';
import setting from '../../../config/defaultSettings';
import home from '@/assets/img/home.png';

import { NavBar, Icon } from 'antd-mobile';

const useStyles = makeStyles({
  backstyle: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
  header: {
    color: '#000000',
    width: '100%',
    height: '58px',
    lineHeight: '58px',
    backgroundColor: setting.theme.palette.primary.main,
    textAlign: 'center',
    zIndex: 9999,
  },
  font: {
    fontSize: '18px',
    fontWeight: 430,
    textAlign: 'center',
  },
});

const Header = ({ contents, returnUrl, onClick, onLoadType, backIcon }) => {
  const classes = useStyles();
  const goBack = url => {
    if (!url) {
      router.goBack();
    } else {
      router.push(url);
    }
  };

  return (
    <div className={classes.header} style={{ position: onLoadType ? 'absolute' : 'fixed', top: 0 }}>
      {onLoadType || !backIcon ? (
        ''
      ) : (
        <IconButton
          aria-label="delete"
          className={classes.backstyle}
          onClick={() => {
            if (onClick) {
              onClick();
            } else {
              goBack(returnUrl);
            }
          }}
        >
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      )}
      <div className={classes.font}>{contents}</div>
    </div>
  );
};

class Page extends PureComponent {
  render() {
    const { children, returnUrl, onClick, onLoadType = false, backIcon = true } = this.props;
    return (
      <NavBar
        className="nav-bar"
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          if (onClick) {
            onClick();
          } else {
            if (returnUrl) {
              router.push(returnUrl);
            } else {
              router.goBack();
            }
          }
        }}
        rightContent={
          <img
            onClick={() => {
              router.replace('/');
            }}
            className="home-icon"
            src={home}
          />
        }
      >
        {children}
      </NavBar>

      /**
         * <Header
        contents={children}
        returnUrl={returnUrl}
        onClick={onClick}
        onLoadType={onLoadType}
        backIcon={backIcon}
      />
         */
    );
  }
}
export default Page;
