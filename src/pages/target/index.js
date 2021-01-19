import React, { useState, useEffect } from 'react';
import { Carousel, Flex, NavBar, Icon, Modal } from 'antd-mobile';
import styles from './index.less';

import mubiao from '@/assets/img/mubiao.png';
import chakanbubiao from '@/assets/img/chakanbubiao.png';
import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';
import jinxingzhong from '@/assets/img/jinxingzhong.png';
import yijinwanc from '@/assets/img/yijinwanc.png';

import router from 'umi/router';
import NoData from '@/components/NoData';

import { getTargetToday, getTargetHistory, getLongTimeTarget } from '@/pages/home/service';

export default function Target() {
  const patientId = localStorage.getItem('patientId');
  const [targetTodayList, setTargetTodayList] = useState([]);
  const [longTimeTarget, setLongTimeTarget] = useState();

  const [targetHistoryList, setTargetHistoryList] = useState([]);

  const queryTargetToday = async () => {
    const res = await getTargetToday({
      mpPatientId: patientId,
    });
    if (res) {
      setTargetTodayList(res);
    }
    const sub = await getLongTimeTarget({
      mpPatientId: patientId,
    });
    if (sub) {
      setLongTimeTarget(sub);
    }
  };

  const queryTargetHistory = async () => {
    const res = await getTargetHistory({
      mpPatientId: patientId,
    });
    if (res) {
      setTargetHistoryList(res);
    }
  };

  const handleMore = message => {
    Modal.alert(null, message);
  };

  useEffect(() => {
    queryTargetToday();
    queryTargetHistory();
  }, []);
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
        查看目标
      </NavBar>

      <div className={styles.outside}>
        <div className={styles.card}>
          {/* <div className={styles.title}>
            <div>今日目标</div>
          </div> */}
          {targetTodayList.length === 0 && <NoData />}

          {targetTodayList.map((item, index) => (
            <div className={styles.cardItem} key={item.content}>
              {index === 0 && (
                <Flex>
                  <Flex.Item onClick={() => handleMore(longTimeTarget)}>
                    <div className={styles.long}>
                      <div className={styles.top}>
                        <img src={chakanbubiao} />
                        长期目标:
                      </div>
                      <div className={styles.bottom}>{longTimeTarget || '暂无数据'}</div>
                    </div>
                  </Flex.Item>
                  <Flex.Item onClick={() => handleMore(item.target)}>
                    <div className={`${styles.long} ${styles.little}`}>
                      <div className={styles.top}>
                        <img src={chakanbubiao} />
                        短期目标:
                      </div>
                      <div className={styles.bottom}>{item.target || '暂无数据'}</div>
                    </div>
                  </Flex.Item>
                </Flex>
              )}

              <div className={styles.target}>
                <div>
                  <img src={mubiao} />
                  <span>当前目标：</span>
                </div>
                <div className="text-dots">
                  内容：
                  <p dangerouslySetInnerHTML={{ __html: item?.content }}></p>
                </div>
                <div>时长：{item?.duration}</div>
                <p className={styles.line}>
                  <a
                    onClick={() => {
                      router.replace('/home/video');
                    }}
                  >
                    点击查看今日培训指导视频
                  </a>
                  <span
                    onClick={() => {
                      router.push({
                        pathname: '/home/punchCard',
                      });
                    }}
                  >
                    打卡
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>历史目标</div>
          </div>
          {targetHistoryList.length === 0 && <NoData />}

          {targetHistoryList.map(item => (
            <div key={item.content} className={styles.train}>
              <div className={styles.trainTop}>
                <div className={styles.status}>
                  <img src={jinxingzhong} />
                  <p>进行中</p>
                </div>
                <img className={styles.targetBg} src="http://placehold.it/600x300" />
                <div className={styles.trainAction}>
                  <span>指导视频</span>
                  <span>训练详情</span>
                </div>
              </div>
              <div className={styles.trainBottom}>
                <div className={styles.trainTarget} onClick={() => handleMore(longTimeTarget)}>
                  <span>长期目标</span>
                  <span className="text-dots">{longTimeTarget || '暂无数据'}</span>
                </div>
                <div className={styles.trainTarget} onClick={() => handleMore(item.target)}>
                  <span>短期目标</span>
                  <span className="text-dots">{item.target || '暂无数据'}</span>
                </div>
              </div>
            </div>
          ))}

          {/* <div className={styles.train}>
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
          </div> */}
        </div>
      </div>
    </>
  );
}
