import React, { useState, useEffect } from 'react';
import { NavBar, ListView, Card, Icon, Button } from 'antd-mobile';
import styles from './index.less';

import home from '@/assets/img/home.png';
import { getVisitingRecord } from './service';
import moment from 'moment';
import router from 'umi/router';

const size = 20;
let data = [];

export default function visitingRecord() {
  const patientId = localStorage.getItem('patientId');
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [dataSource, setDataSource] = useState(() => {
    const data = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return data;
  });

  const queryVisitingRecord = async () => {
    const res = await getVisitingRecord({
      body: {
        mpPatientId: patientId,
      },
      page,
      size,
    });
    if (res) {
      if (page === 0) {
        data = [];
      }
      data = data.concat(res.data);
      setDataSource(dataSource.cloneWithRows(data));
      setHasMore((page + 1) * size < res.total);
    }
  };

  useEffect(() => {
    queryVisitingRecord();
  }, [page]);

  const onEndReached = event => {
    if (!hasMore) {
      return;
    }
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  let index = data.length - 1;
  const row = (rowData, sectionID, rowID) => {
    console.log('data', data);
    if (index < 0) {
      index = data.length - 1;
    }
    const obj = data[index--];
    return (
      <Card key={rowID} className={styles.card}>
        <div className={styles.item}>
          <span>姓名：{obj.patientName}</span>
          <span>就诊编号：{obj.visitingCode}</span>
        </div>
        <div className={styles.item}>
          <span>就诊时间：{moment(obj.createTime).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div className={styles.item}>
          <span>就诊机构：{obj.organizeName}</span>
        </div>
        <div className={styles.item}>
          <span>就诊内容：{obj.problemInfo}</span>
        </div>
        <div className={styles.item}>
          <span>治疗处方：{obj.prescriptionInfo}</span>
        </div>
        <div className={styles.item}>
          <span>医师初步判断：{obj.judgmentInfo}</span>
        </div>
      </Card>
    );
  };

  return (
    <>
      <NavBar
        className="nav-bar"
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => router.goBack()}
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
        就诊记录
      </NavBar>

      <div className={styles.outside}>
        <ListView
          dataSource={dataSource}
          renderFooter={() => (
            <div>
              {hasMore ? (
                <Button type="primary" onClick={onEndReached}>
                  加载更多
                </Button>
              ) : null
              // <Button type="primary" onClick={() => setPage(0)}>
              //   刷新
              // </Button>
              }
            </div>
          )}
          renderRow={row}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
        />
      </div>
    </>
  );
}
