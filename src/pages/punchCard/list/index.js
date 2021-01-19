import React, { useState, useEffect } from 'react';
import { List, NavBar, Icon, Button } from 'antd-mobile';
import styles from './index.less';

import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';
import moment from 'moment';
import router from 'umi/router';

import NoData from '@/components/NoData';

import { getSignList } from '../service';

const size = 20;
const punchCardList = props => {
  const patientId = localStorage.getItem('patientId');

  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);

  const querySignList = async () => {
    const res = await getSignList({
      body: patientId,
      page,
      size,
    });
    if (res) {
      let data = list.concat(res.data);
      setList(data);
      setHasMore((page + 1) * size < res.total);
    }
  };

  useEffect(() => {
    querySignList();
  }, [page]);

  const onEndReached = event => {
    if (!hasMore) {
      return;
    }
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
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
        打卡记录
      </NavBar>

      <div className={styles.outside}>
        <div className={styles.card}>
          {list.length === 0 && <NoData />}
          {list.length !== 0 && (
            <List>
              {list.map(item => (
                <List.Item key={item.id} multipleLine>
                  {moment(item.time).format('YYYY-MM-DD HH:mm')}{' '}
                  <List.Item.Brief>{item.content}</List.Item.Brief>
                </List.Item>
              ))}
            </List>
          )}
          {hasMore && (
            <Button type="primary" onClick={onEndReached} style={{ marginTop: 20 }}>
              加载更多
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default punchCardList;
