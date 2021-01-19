/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { createForm } from 'rc-form';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { sendSms, bindMobile } from '@/services/api';
import { getToken, removeToken } from '@/utils/authority';
import router from 'umi/router';
import { Toast } from 'antd-mobile';

const displayText = '发送验证码';
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  verificationCode: {
    width: '100%',
    height: '56px',
    marginTop: '15px',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Page(props) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const classes = useStyles();
  const [display, setDisplay] = useState(displayText);
  const [disableButton, setDisableButton] = useState(false);
  const token = getToken();

  const disableSendSms = () => {
    let count = 120;
    // eslint-disable-next-line no-use-before-define
    const interv = setInterval(interval, 1000);

    function interval() {
      // eslint-disable-next-line no-plusplus
      if (count-- === 0) {
        clearInterval(interv);
        setDisplay(displayText);
        setDisableButton(false);
      } else {
        setDisplay(`${count} 秒`);
      }
    }
  };

  const onSms = () => {
    form.validateFields(['mobile'], async error => {
      if (!error) {
        const mobile = form
          .getFieldValue('mobile')
          .trim()
          .replace(/\s/g, '');

        disableSendSms();
        setDisableButton(true);
        const res = await sendSms({ mobile, openId: token.openId });
        if (res) {
          Toast.success('验证码发送成功');
        }
      }
    });
  };

  // const regCaptch = e => {
  //   const { value } = e.target;
  //   if (value.length > 6) {
  //     e.target.value = value.slice(0, 6);
  //   }
  // };

  const onSubmit = () => {
    form.validateFields(error => {
      if (!error) {
        const values = form.getFieldsValue();
        bindMobile({ ...values, openId: token.openId }).then(res => {
          if (res) {
            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                ...token,
                isNeedBind: false,
                mobile: values.mobile,
              })
            );
            router.push('/home/index');
          }
        });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form}>
          {getFieldDecorator('mobile', {
            initialValue: '',
            rules: [{ required: true, message: 'mobile' }],
          })(
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="手机号"
              autoFocus
              required
            />
          )}
          <Grid container>
            <Grid item xs={8}>
              {getFieldDecorator('verificationCode', {
                initialValue: '',
                rules: [{ required: true, message: 'verificationCode' }],
              })(
                <TextField variant="outlined" margin="normal" fullWidth label="验证码" required />
              )}
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={onSms}
                variant="contained"
                color="primary"
                disabled={disableButton}
                className={classes.verificationCode}
              >
                {display}
              </Button>
            </Grid>
          </Grid>

          <Button
            // type="submit"
            onClick={onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登录
          </Button>
        </form>
      </div>
    </Container>
  );
}
const wrap = createForm({
  onFieldsChange(props, changedFields) {
    const { fieldsChange } = props;

    // eslint-disable-next-line guard-for-in
    for (const key in changedFields) {
      const field = changedFields[key];

      if (field.dirty === false && field.error === undefined) {
        const f = {};
        f[key] = field.value !== undefined ? field.value.trim().replace(/\s/g, '') : '';
        fieldsChange(f);
      }
    }
  },
})(Page);
export default wrap;
