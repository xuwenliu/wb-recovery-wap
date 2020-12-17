import React, { useState, useEffect } from 'react';
import { Carousel, Flex, NavBar, Modal, List, Toast, Icon } from 'antd-mobile';
import { Fab } from '@material-ui/core';

import styles from './index.less';
import ziliao from '@/assets/img/ziliao.png';
import zipping from '@/assets/img/zipping.png';
import paike from '@/assets/img/paike.png';
import daka from '@/assets/img/daka.png';
import jilv from '@/assets/img/jilv.png';
import mubiao_view from '@/assets/img/mubiao_view.png';
import mubiao from '@/assets/img/mubiao.png';
import peixun from '@/assets/img/peixun.png';
import manyidu from '@/assets/img/manyidu.png';
import chakanbubiao from '@/assets/img/chakanbubiao.png';
import gongneng from '@/assets/img/gongneng.png';
import more from '@/assets/img/more.png';
import home from '@/assets/img/home.png';
import scan from '@/assets/img/scan.png';

import { getParentAllPatient } from './service';
import wxHelper from '@/utils/weixin';

import router from 'umi/router';

export default function Home({ location }) {
  const [data, setData] = useState(['2', '3', '4']);

  const [visible, setVisible] = useState(false);
  const [patientList, setPatientList] = useState([]);

  const queryParentAllPatient = async () => {
    let res = await getParentAllPatient();
    if (res) {
      setPatientList(res);
      if (!localStorage.getItem('patientId')) {
        localStorage.setItem('patientId', res[0].id); // 默认设置第一个患者
      }
    }
  };
  useEffect(() => {
    queryParentAllPatient();
  }, []);

  const handleScan = () => {
    wxHelper.call('scanQRCode').then(res => {
      console.log(res);
    });
  };

  return (
    <>
      <NavBar
        className="nav-bar"
        mode="light"
        // leftContent={<img className="home-icon" src={home} />}
        rightContent={[<img key="img" className="scan-icon" src={scan} onClick={handleScan} />]}
      >
        儿童康复系统
      </NavBar>
      {patientList.length > 1 && (
        <Fab
          onClick={() => {
            setVisible(true);
          }}
          className="fab-btn"
          color="primary"
        >
          切换
        </Fab>
      )}

      <Modal
        popup
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        animationType="slide-up"
      >
        <List
          renderHeader={() => <div style={{ color: '#000', fontSize: 16 }}>切换患者</div>}
          className="popup-list"
        >
          {patientList?.map(item => (
            <List.Item
              key={item.id}
              onClick={() => {
                localStorage.setItem('patientId', item.id);
                setVisible(false);
                Toast.success('患者切换成功');
              }}
              extra={
                localStorage.getItem('patientId') === item.id && (
                  <Icon type="check-circle" color="#83AC36" />
                )
              }
            >
              {item.name}
            </List.Item>
          ))}
        </List>
      </Modal>

      <div className={styles.outside}>
        <Carousel
          cellSpacing={20}
          autoplay={true}
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {data.map(val => (
            <a key={val} href="http://www.alipay.com">
              <img src={`http://img.nevergiveupt.top/${val}.png`} />
            </a>
          ))}
        </Carousel>

        <Flex justify="start" className={styles.fast}>
          <Flex.Item
            onClick={() => {
              router.push('/info/index');
            }}
            className={styles.item}
          >
            <img src={ziliao} />
            <p>基本资料</p>
          </Flex.Item>
          <Flex.Item className={styles.item}>
            <img src={zipping} />
            <p>检核自评</p>
          </Flex.Item>
          <Flex.Item className={styles.item}>
            <img src={jilv} />
            <p>就诊记录</p>
          </Flex.Item>
          <Flex.Item className={styles.item}>
            <img src={mubiao_view} />
            <p>查看目标</p>
          </Flex.Item>
          <Flex.Item
            onClick={() => {
              router.push('/home/courseScheduling');
            }}
            className={styles.item}
          >
            <img src={paike} />
            <p>查看排课</p>
          </Flex.Item>
        </Flex>
        <Flex justify="start" className={styles.fast}>
          <Flex.Item className={styles.item}>
            <img src={daka} />
            <p>训练打卡</p>
          </Flex.Item>
          <Flex.Item className={styles.item}>
            <img src={peixun} />
            <p>干预培训</p>
          </Flex.Item>
          <Flex.Item className={styles.item}>
            <img src={manyidu} />
            <p>满意度调查</p>
          </Flex.Item>
          <Flex.Item className={styles.item}>
            <img src={gongneng} />
            <p>更多功能</p>
          </Flex.Item>
          <Flex.Item className={styles.item}></Flex.Item>
        </Flex>
        <div className={styles.card}>
          <div className={styles.title}>
            <div>查看目标</div>
            <span
              onClick={() => {
                router.push({
                  pathname: '/home/target',
                });
              }}
            >
              更多 <img src={more} />{' '}
            </span>
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
              点击查看今日培训指导视频
              <span>打卡</span>
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>干预培训</div>
            <span>
              更多 <img src={more} />{' '}
            </span>
          </div>

          <div className={styles.train}>
            <img src="http://img.nevergiveupt.top/5.png" />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.title}>
            <div>检核自评</div>
            <span>
              更多 <img src={more} />{' '}
            </span>
          </div>

          <div className={styles.train}>
            <img src="http://img.nevergiveupt.top/5.png" />
          </div>
        </div>
      </div>
    </>
  );
}
