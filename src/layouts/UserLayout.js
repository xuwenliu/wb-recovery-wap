import React from 'react';
import Link from 'umi/link';
import selftheme from '@/theme';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Typography from '@material-ui/core/Typography';
import styles from './UserLayout.less';
import developConfig from '../../config/defaultSettings';

// import logo from '../assets/logomini.png';

const theme = createMuiTheme(selftheme);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return '测试项目';
  // }
  render() {
    const { children } = this.props;
    const { company = {}, logo = '' } = developConfig;
    document.title = company.name;

    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div>
        {/* <DocumentTitle title={company.name}></DocumentTitle> */}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              {logo !== '' ? (
                <div className={styles.logo}>
                  {/* <img height="100%" src={require(`../assets/logos/${logo}.png`)} alt="" /> */}
                </div>
              ) : (
                <Link to="/">
                  <Typography variant="h5" gutterBottom>
                    {company.name}
                  </Typography>
                </Link>
              )}
            </div>
          </div>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}

export default UserLayout;
