import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import developConfig from '../../../config/defaultSettings';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  copyright: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    textAlign: 'center',
  },
}));

function Copyright() {
  const classes = useStyles();
  const { company = {} } = developConfig;

  return company.copyright ? (
    <div className={classes.copyright} align="center">
      <Typography variant="body2" color="textSecondary">
        {company.copyright}
      </Typography>
    </div>
  ) : null;
}

function SignIn(props) {
  const classes = useStyles();
  const { onOk, form } = props;
  const { getFieldDecorator } = form;
  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
      } else {
        // setErrorflag(true)
      }
    });
  };
  const [open, setOpen] = React.useState(false);
  const [activie, setActivie] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setActivie(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [{ required: true, message: 'username' }],
          })(
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="帐号"
              autoFocus
              required
            />
          )}
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: 'password' }],
          })(
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="密码"
              type="password"
              required
            />
          )}
          <Button
            // type="submit"
            onClick={handleCreate}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登录
          </Button>
        </form>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">请用微信扫码功能进行扫描</DialogTitle>
          <DialogContent>
            {activie ? (
              <div style={{ textAlign: 'center' }} id="wechat">
                {/* <Spin /> */}
              </div>
            ) : (
              ''
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Copyright />
    </Container>
  );
}
class Login extends PureComponent {
  onSubmitLogin = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userLogin/login',
      payload: { ...value, loginType: 1 },
    });
  };

  render() {
    const { form } = this.props;
    return (
      <>
        <SignIn form={form} onOk={this.onSubmitLogin} />
      </>
    );
  }
}
const wrap = createForm()(Login);
export default connect(({ userLogin }) => ({
  userLogin,
}))(wrap);
