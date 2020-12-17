import React, { useState } from 'react';
import { Carousel, Flex, NavBar } from 'antd-mobile';
import styles from './index.less';

import mubiao from '@/assets/img/mubiao.png';
import chakanbubiao from '@/assets/img/chakanbubiao.png';
import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';
import jinxingzhong from '@/assets/img/jinxingzhong.png';
import yijinwanc from '@/assets/img/yijinwanc.png';

import router from 'umi/router';

export default function Video() {
  return (
    <>
      <NavBar
        className="nav-bar"
        mode="light"
        leftContent={
          <img
            onClick={() => {
              router.replace('/');
            }}
            className="home-icon"
            src={home}
          />
        }
      >
        儿童康复系统
      </NavBar>

      <div className={styles.outside}>
        <div className={styles.card}>
          <div className={styles.title}>
            <div>今日培训</div>
          </div>
          <div className={styles.train}>
            <img src="http://img.nevergiveupt.top/2.png" />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>热门课程</div>
            <span>
              更多 <img src={more} />{' '}
            </span>
          </div>
          <div className={styles.train}>
            <img src="http://img.nevergiveupt.top/6.png" />
          </div>
        </div>
      </div>
    </>
  );
}
