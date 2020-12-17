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

export default function Target() {
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
            <div>查看目标</div>
          </div>
          <Flex>
            <Flex.Item>
              <div className={styles.long}>
                <div className={styles.top}>
                  <img src={chakanbubiao} />
                  长期目标:
                </div>
                <div className={styles.bottom}>学会走路</div>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={`${styles.long} ${styles.little}`}>
                <div className={styles.top}>
                  <img src={chakanbubiao} />
                  短期目标:
                </div>
                <div className={styles.bottom}>手扶着推车走路</div>
              </div>
            </Flex.Item>
          </Flex>

          <div className={styles.target}>
            <div>
              <img src={mubiao} />
              <span>今日目标：</span>
            </div>
            <div className="text-dots">内容：家长扶着孩童行走，孩童能够行走五米</div>
            <div>时长：3小时</div>
            <p>
              <a
                onClick={() => {
                  router.replace('/home/video');
                }}
              >
                点击查看今日培训指导视频
              </a>
              <span>打卡</span>
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>历史目标</div>
          </div>
          <div className={styles.train}>
            <div className={styles.trainTop}>
              <div className={styles.status}>
                <img src={jinxingzhong} />
                <p>进行中</p>
              </div>
              <img className={styles.targetBg} src="http://img.nevergiveupt.top/5.png" />
              <div className={styles.trainAction}>
                <span>指导视频</span>
                <span>训练详情</span>
              </div>
            </div>
            <div className={styles.trainBottom}>
              <div className={styles.trainTarget}>
                <span>长期目标</span>
                <span className="text-dots">学会走路</span>
              </div>
              <div className={styles.trainTarget}>
                <span>短期目标</span>
                <span className="text-dots">手扶着推车走路</span>
              </div>
            </div>
          </div>

          <div className={styles.train}>
            <div className={styles.trainTop}>
              <div className={styles.status}>
                <img src={yijinwanc} />
                <p>已完成</p>
              </div>
              <img className={styles.targetBg} src="http://img.nevergiveupt.top/6.png" />
              <div className={styles.trainAction}>
                <span>指导视频</span>
                <span>训练详情</span>
              </div>
            </div>
            <div className={styles.trainBottom}>
              <div className={styles.trainTarget}>
                <span>长期目标</span>
                <span className="text-dots">学会走路</span>
              </div>
              <div className={styles.trainTarget}>
                <span>短期目标</span>
                <span className="text-dots">手扶着推车走路</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
