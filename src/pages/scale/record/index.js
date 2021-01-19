import React, { useEffect, Fragment } from 'react';
import router from '@/utils/router';
import Header from '@/components/AppHeader';
import { connect } from 'dva';
import { formatDateFromTime } from '@/utils/format';

import { Result, Icon, Card, WingBlank, WhiteSpace, Button } from 'antd-mobile';

function ScaleRecord({ dispatch, scaleRecord: { records = { } } }) {
  const { content } = records;

  const view = ({ id, scale, scaleName }) => {
    router.push({
      pathname: '/scale/compose/report',
      query: { compose: scale, id, name: scaleName },
    });
  };

  const fetch = (params = {}) => {
    dispatch({
      type: 'scaleRecord/fetch',
      payload: { ...params },
    });
  };

  useEffect(() => {
    fetch();
    return () => {
      dispatch({
        type: 'scaleRecord/clear',
        payload: {},
      });
    };
  }, []);

  return (
    <Fragment>
      <Header>测评报告</Header>
      <div style={{ padding: '30px' }} />
      {content && content.length === 0 && <Result message={`尚无报告资料`} />}
      {content && content.map(record => (
        <WingBlank size="lg" key={record.number}>
          <Card key={record.number}>
            <Card.Header
              title={<div>编号：{record.number}</div>}
              extra={
                <Button
                  type="primary"
                  inline
                  size="small"
                  onClick={() => {
                    view(record);
                  }}
                >
                  检视
                </Button>
              }
            />
            <Card.Body>
              <div>{record.scaleName}</div>
              <WhiteSpace />
              <div>{record.userName}</div>
            </Card.Body>
            <Card.Footer extra={formatDateFromTime(record.reportDate)} />
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      ))}
    </Fragment>
  );
}

export default connect(({ scaleRecord, loading }) => ({
  loading: loading.effects['scaleRecord/fetch'],
  scaleRecord,
}))(ScaleRecord);
