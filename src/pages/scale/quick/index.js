import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import router from '@/utils/router';
import { useDebounceFn } from '@umijs/hooks';
import { createForm } from 'rc-form';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@/components/Alert';
import Header from '@/components/AppHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Button from '@/components/Common/Button';

import Demographics from '@/pages/scale/components/Demographics';
import { lineControl, formControl } from '@/utils/publicStyles';
import SubScale from '../components/SubScale';
import CurrentUser from '@/components/Scale/CurrentUser';

import { Button as MB, List, Radio, Flex, WhiteSpace } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

const useStyles = makeStyles({
  formControl,
  lineControl,
});

function SelectObject({ objects, onSubmit, subScaleNames }) {
  const [object, setObject] = useState(objects[0]);
  return (
    <List renderHeader={() => '请选择'}>
      {objects.map(i => (
        <RadioItem
          key={i.number}
          checked={object && object.number === i.number}
          onChange={() => {
            setObject(i);
          }}
        >
          {i.name}
        </RadioItem>
      ))}
      <List.Item>
        <MB
          style={{ marginTop: '10px' }}
          type="primary"
          size="small"
          inline
          onClick={() => {
            onSubmit(object);
          }}
        >
          确定
        </MB>
      </List.Item>
    </List>
  );
}

function SelectScale({ scales, onSubmit }) {
  const [scale, setScale] = useState(scales[0]);
  return (
    <List renderHeader={() => '请选择'}>
      {scales.map(i => (
        <RadioItem
          key={i.id}
          checked={scale && scale.id === i.id}
          onChange={() => {
            setScale(i);
          }}
        >
          {i.scaleName}
        </RadioItem>
      ))}
      <List.Item>
        <MB
          style={{ marginTop: '10px' }}
          type="primary"
          size="small"
          inline
          onClick={() => {
            onSubmit(scale);
          }}
        >
          确定
        </MB>
      </List.Item>
    </List>
  );
}

function TesteeInfo({
  scale,
  object = {},
  form,
  subScaleNames,
  onSubmit,
  submiting,
  demographicsOnChange,
}) {
  const classes = useStyles();
  const { getFieldDecorator } = form;
  const subScaleInfo = { items: [...subScaleNames] };

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const testeeInfo = [];
        const { subScales } = values;

        Object.keys(values).forEach(key => {
          if (key !== 'subScales') {
            const v = {};
            v[key] = values[key];
            testeeInfo.push(v);
          }
        });

        onSubmit({
          values: {
            compose: scale.id,
            values: { userNumber: object.number, subleScaleName: subScales, testeeInfo },
          },
          subScales,
        });
      }
    });
  };

  return (
    <form noValidate autoComplete="off">
      {getFieldDecorator('name', {
        initialValue: object.name,
        rules: [{ required: true, message: '姓名' }],
      })(<TextField className={classes.formControl} label="姓名" variant="outlined" />)}

      <Demographics
        object={object}
        form={form}
        limits={scale.limits}
        onChange={demographicsOnChange}
      />
      {getFieldDecorator('subScales', {
        initialValue: scale.choiceType === 'SINGLE' ? [] : subScaleInfo.items,
        rules: [{ required: true, message: '子量表不可为空' }],
      })(<SubScale choiceType={scale.choiceType} data={subScaleInfo.items} />)}

      {subScaleInfo.alert ? (
        <Alert style={{ margin: '10px' }} severity="info">
          {subScaleInfo.alert}
        </Alert>
      ) : null}

      <div style={{ margin: 20, marginTop: 40 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} loading={submiting}>
          开始答题
        </Button>
      </div>
    </form>
  );
}

function Page({
  dispatch,
  form,
  object,
  scales = { content: [] },
  scale,
  subScaleNames = [],
  loading,
  submiting,
}) {
  
  const fetch = () => {
    dispatch({
      type: 'scaleQuick/fetch',
      payload: {},
    });
    dispatch({
      type: 'scaleQuick/fetchObject',
      payload: {},
    });
  };

  const fetchScale = compose => {
    dispatch({
      type: 'scaleQuick/fetchScale',
      payload: { scaleId: compose },
    });
  };

  const submit = ({ values, subScales }) => {
    dispatch({
      type: 'scaleQuick/createAnswer',
      payload: values,
      callback: ({ id }) => {
        checkNext({ subScales, id });
      },
    });
  };

  const checkNext = ({ subScales, id }) => {
    /**
     * 人口學頁面為中間頁面.不增加到路由紀錄
     */

    if (subScales.length > 1) {
      // 多個子量表的答題
      router.push({
        pathname: '/scale/compose/answer',
        query: { compose: scale.id, id },
      });
    } else {
      // 直接打題
      router.push({
        pathname: '/scale/compose/answer/single',
        query: { compose: scale.id, id, subScale: subScales[0] },
      });
    }
  };

  const demographicsOnChange = values => {
    // 過濾空白
    const demographics = {};
    Object.keys(values).forEach(key => {
      if (values[key] !== '') {
        demographics[key] = values[key];
      }
    });

    /** 帶出子量表 */
    dispatch({
      type: 'scaleQuick/fetchSubScaleNames',
      payload: { id: scale.id, demographics },
    });
  };

  const renderUI = () => {
    
    if (scales && !scale) {
      return (
        <SelectScale
          scales={scales.content}
          onSubmit={select => {
            fetchScale(select.id);
          }}
        />
      );
    }

    return (
      <TesteeInfo
        form={form}
        scale={scale}
        object={object}
        subScaleNames={subScaleNames}
        demographicsOnChange={demographicsOnChange}
        submiting={submiting}
        onSubmit={submit}
      />
    );
  };

  useEffect(() => {
    fetch();
    return () => {
      dispatch({
        type: 'scaleQuick/clear',
        payload: {},
      });
    };
  }, []);

  return (
    <>
      <Header>
        <h2 style={{ textAlign: 'center' }}>检核自评</h2>
      </Header>
      <CurrentUser style={{ margin: '20px' }} loading={loading} object={object}>
        {renderUI()}
      </CurrentUser>
    </>
  );
}

const warp = createForm({})(Page);

export default connect(({ scaleQuick, loading }) => ({
  loading: loading.effects['scaleQuick/fetchObject'],
  loadingObject: loading.effects['scaleQuick/fetchObjectDetail'],
  submiting: loading.effects['scaleQuick/createAnswer'],
  scales: scaleQuick.scales,
  scale: scaleQuick.scale,
  object: scaleQuick.object,
  subScaleNames: scaleQuick.subScaleNames,
}))(warp);
